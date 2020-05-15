const mongoose = require('mongoose');
const Joi = require('joi');
const categorySchema = require('./category')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    category: {
        type: categorySchema
    }

})
const Task = mongoose.model('task', taskSchema);

function validateTask(task) {
    const schema = {
        title: Joi.string().min(3).max(255).required(),
        isComplete: Joi.boolean(),
        categoryId: Joi.string().required()
    }
    return Joi.validate(task, schema)
}
module.exports.Task = Task;
module.exports.validateTask = validateTask;