const winston = require('winston')
require('winston-mongodb');

module.exports = function () {
    winston.add(winston.transports.File, {
        filename: 'logfile.log'
    })
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/todolist'
    })
    process.on('uncaughtException', (ex) => {
        console.log('caught an uncaught excerption ');
        winston.error(ex.message, ex)
    })

}