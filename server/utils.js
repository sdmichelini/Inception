'use strict'

const logger = {
    info: (data) => {
        console.log('INFO: '+data)
    },
    error: (data) => {
        console.error('ERROR: '+data)
    }
}

module.exports = {
    logger: logger
}