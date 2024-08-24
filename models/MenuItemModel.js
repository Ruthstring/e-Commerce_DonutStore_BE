const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories:{
        type:[String], //array of strings to hold multiple categories
        required:true
    },
    allergens:{
        type:[String],
        required:true
    },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);