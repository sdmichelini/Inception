'use strict'

const options = {}

const pgp = require('pg-promise')(options)

const connectionString = process.env.CONNECTION_STRING || 'postgres://localhost:5432/idea_tracker'

const db = pgp(connectionString)

module.exports = {
    db: db
}