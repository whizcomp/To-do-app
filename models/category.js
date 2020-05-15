const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true
    }
})
const Category = mongoose.model('category', categorySchema);

function categoryValidate(category) {
    const schema = {
        name: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(category, schema)
}
module.exports.Category = Category;
module.exports.categoryValidate = categoryValidate;