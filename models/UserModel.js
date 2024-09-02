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

// Pre-save middleware to hash the password before saving the user
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// module.exports = mongoose.model('User', UserSchema);
const User = mongoose.model('User', UserSchema);

module.exports = User;
