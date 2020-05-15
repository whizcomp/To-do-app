const express = require('express');
const {
    categoryValidate,
    Category
} = require('../models/category')
const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await Category.find({}).sort('name');
    res.send(categories);
})
router.post('/', async (req, res) => {
    const {
        error
    } = categoryValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category({
        name: req.body.name
    })
    await category.save();
    res.send(category);

})
router.put('/:id', async (req, res) => {
    const {
        error
    } = categoryValidate(req.body);
    const category = await Category.findOneAndUpdate(req.params.id, {
        name: req.body.name
    }, {
        new: true
    });
    if (!category) return res.status(404).send('category not found');
    res.send(category);
})
router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).send('category not found');
    res.send(category);
})
module.exports = router;