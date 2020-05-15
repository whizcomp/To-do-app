const tasks = require('../routes/tasks')
const express = require('express');
const categories = require('../routes/categories')
const completes = require('../routes/completes')
const error = require('../middleware/error')
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/tasks', tasks)
    app.use('/api/categories', categories)
    app.use('/api/completes', completes)
    app.use(error)
}