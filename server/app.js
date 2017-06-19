'use strict'

const express = require('express')
const cors = require('cors')

const ideas = require('./ideas')

const logger = require('./utils').logger

const jsonParser = require('body-parser').json()

const app = express()
app.use(cors())

app.get('/api/v1/ideas', ideas.getIdeas)
app.get('/api/v1/ideas/:id', ideas.getIdea)
app.post('/api/v1/ideas', jsonParser, ideas.addIdea)
app.patch('/api/v1/ideas/:id', jsonParser, ideas.editIdea)
app.delete('/api/v1/ideas/:id', ideas.deleteIdea)

// REST API Error Handler. Only Internal Server Errors Should Fall Through
app.use((err, req, res, next) => {
    logger.error(err)
    let error = 'Internal Server Error.'
    if(process.env.ENVIRONMENT == 'dev') {
        error = err.message
    }
    res.status(500).json({
        'errors': [error]
    })
})

module.exports = app

