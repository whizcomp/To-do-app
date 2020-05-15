const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function () {
    mongoose.connect('mongodb://localhost/todolist', {
            useNewUrlParser: true
        })
        .then(() => winston.info('connected to mongo database'))


}