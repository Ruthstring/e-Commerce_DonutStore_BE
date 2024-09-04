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

    // Future additions:
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    orders: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            date: { type: Date, default: Date.now },
            totalAmount: { type: Number }
        }
    ]
    // You could add address or other user-specific data here
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
