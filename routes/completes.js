const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
    Task
} = require('../models/task')

router.get('/', async (req, res) => {
    const completeTasks = await Task.find({
        isComplete: true
    })
    res.send(completeTasks)
})
router.put('/:id', async (req, res) => {
    const {
        error
    } = validateComplete(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findByIdAndUpdate(req.params.id, {
        isComplete: true
    }, {
        new: true
    })
    await task.save();
    res.send(task)
})

function validateComplete(req) {
    const schema = {
        isComplete: Joi.boolean().required()

    }
    return Joi.validate(req, schema);
}
module.exports = router