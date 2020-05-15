const express = require('express');
require('express-async-errors')
const router = express.Router();
const {
    validateTask,
    Task
} = require('../models/task');
const {
    Category
} = require('../models/category')
// const asyncMiddleware = require('../middleware/async')

router.get('/',  async (req, res) => {
    const tasks =    Task.find().sort('date')
    res.send(tasks);

})
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('task doesn\'t exist');
    res.send(task);
})
router.post('/', async (req, res) => {
    const {
        error
    } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findById(req.body.categoryId);
    if (!category) res.status(404).send('invalid category');
    const task = new Task({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        }
    })
    await task.save();
    res.send(task);
})
router.put('/:id', async (req, res) => {
    const {
        error
    } = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title
    }, {
        new: true
    });
    if (!task) return res, status(404).send('task doesn\t exist')
    res.send(task);
})
router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id)
    if (!task) return res, status(404).send('task doesn\t exist')
    res.send(task)
})
module.exports = router;