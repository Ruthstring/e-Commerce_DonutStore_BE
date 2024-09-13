const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true },

    email: { 
        type: String, 
        required: true, 
        unique: true },

    password: { 
        type: String, 
        required: true },

    // Cart stores items before they are ordered
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },  // Refers to MenuItem
            title: String,
            price: Number,
            quantity: { type: Number, default: 1 }
        }
    ],

    // Orders store products that have been purchased
    orders: [
        {
            products: [
                {
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },  // Refers to MenuItem
                    title: String,
                    price: Number,
                    quantity: { type: Number, default: 1 }
                }
            ],
            totalAmount: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
    // You could add address or other user-specific data here
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
