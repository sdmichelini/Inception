'use strict'

const db = require('./db').db
const logger = require('./utils').logger

function getIdeas(req, res, next) {
    if(!req.query.title) {
        db.any('SELECT * from IDEAS ORDER BY created DESC')
        .then((dbIdeas) => {
            const ideas = dbIdeas.map((idea) => {
                return { 
                    "title": idea.title, 
                    "description": idea.description,
                    "created": idea.created,
                    "id": idea.id
                }
            })
            res.json({
                "ideas": ideas,
                "count": ideas.length,
                "total": ideas.length
            })
        })
        .catch((err) => {
            return next(err)
        })
    } else {
        let title = req.query.title.replace(/(<([^>]+)>)/ig, '')
        if(title.length < 3) {
            res.status(400).json({ "errors": ["Title search must be at least three characters"]})
            return
        } 
        db.any('SELECT * from IDEAS WHERE lower(title) LIKE $1', '%'+String(title)+'%')
        .then((dbIdeas) => {
            const ideas = dbIdeas.map((idea) => {
                return { 
                    "title": idea.title, 
                    "description": idea.description,
                    "created": idea.created,
                    "id": idea.id
                }
            })
            res.json({
                "ideas": ideas,
                "count": ideas.length,
                "total": ideas.length
            })
        })
        .catch((err) => {
            return next(err)
        })

    }
    
}

function getIdea(req, res, next) {
    if(!req.params.id) {
        res.status(400).json({ "errors": ["ID Not Valid."]})
    }
    let ideaResult = undefined
    db.task(t => {
        return t.one('SELECT * from IDEAS WHERE id=$1', parseInt(req.params.id))
            .then(idea => {
                ideaResult = idea
                return t.any('SELECT ideas.title AS title, ideas.id AS id FROM ideas INNER JOIN linked_ideas ON (linked_ideas.idea2 = ideas.id) WHERE (linked_ideas.idea1 = $1) '+
                    'UNION ALL '+
                    'SELECT ideas.title AS title, ideas.id AS id FROM ideas INNER JOIN linked_ideas ON (linked_ideas.idea1 = ideas.id) WHERE (linked_ideas.idea2 = $1)',
                    parseInt(req.params.id))
            })
    })
    .then(linkedIdeas => {
        if(!ideaResult) {
            res.status(500).json({errors:["Could not fetch from DB."]})
        } else {
            linkedIdeas = linkedIdeas.map(linkedIdea => {
                return {"id": linkedIdea.id, "title": linkedIdea.title}
            })
            res.json({
                "idea": { 
                        "title": ideaResult.title, 
                        "description": ideaResult.description,
                        "created": ideaResult.created,
                        "id": ideaResult.id,
                        "linkedIdeas":linkedIdeas
                    }
            })
        }
    })
    .catch((err) => {
        if(err.code !== undefined) {
            if((err.code == '23503') || (err.code == 0)) {
                res.status(404).json({
                    errors: ["Idea provided does not exist."]
                })
            } else {
                logger.error("Unhandled Postgres Error Code: "+err.code)
                return next(err)
            }
        } else {
            return next(err)
        }
    })
}

function addIdea(req, res, next) {
    let errors = []
    if(!req.body.title) {
        errors.push("Title Not Provided")
    }
    if(!req.body.description) {
        errors.push("Description of Idea Not Provided")
    }
    if(errors.length > 0) {
        res.status(400).json({ "errors": errors})
        return
    } 
    const newIdea = { title: req.body.title, description: req.body.description }
    db.none(
        "INSERT INTO ideas(title, description) VALUES (${title}, ${description})",
        newIdea)
        .then(() => {
            res.json({"message":"Added One Idea."})
        })
        .catch((err) => {
            return next(err)
        })
}

function editIdea(req, res, next) {
    let errors = []
    if(!req.params.id) {
        errors.push("No ID Provided as Parameter.")
    }
    if(!req.body.linkedIdeas) {
        errors.push("No Linked Ideas.")
    } else if(req.body.linkedIdeas.length < 1) {
        errors.push("Not Enough Linked Ideas.")
    }
    if(errors.length > 0) {
        res.status(400).json({ "errors": errors})
        return
    } 
    let id1 = parseInt(req.params.id)
    let id2 = parseInt(req.body.linkedIdeas[0])
    if(id1 == id2) {
        res.status(400).json({ "errors": ["Can't Link the Same Idea to Itself."]})
        return
    }
    // Always insert the lowest ID first, that way whenever two IDs are linked 
    // they always appear in the same order in database
    let ids = {
        id1: Math.min(id1, id2),
        id2: Math.max(id1,id2)
    }

    db.none(
        "INSERT INTO linked_ideas VALUES(${id1}, ${id2})", ids
    )
    .then(() => {
        res.json({"message":"Linked Two Ideas."})
    })
    .catch((err) => {
        if(err.code) {
            // Which code? 
            if(err.code == '23503') {
                res.status(404).json({
                    errors: ["One or more of the ideas provided do not exist."]
                })
            } else if(err.code == '23505') {
                res.status(400).json({
                    errors: ["The two ideas provided are already linked."]
                })
            } else {
                logger.error("Unhandled Postgres Error Code: "+err.code)
                return next(err)
            }
        } else {
            logger.error("PG Code: "+err.code)
            return next(err)
        }
    })

}

function deleteIdea(req, res, next) {
    if(!req.params.id) {
        res.status(400).json({ "errors": ["No ID Provided as Parameter."]})
        return
    }
    db.result("DELETE FROM ideas where ID = $1", parseInt(req.params.id))
        .then((result) => {
            res.json({"message":`Deleted ${result.rowCount} ideas.`})
        })
        .catch((err) => {
            return next(err)
        })
}

module.exports = {
    getIdeas: getIdeas,
    getIdea: getIdea,
    addIdea: addIdea,
    editIdea: editIdea,
    deleteIdea: deleteIdea
}