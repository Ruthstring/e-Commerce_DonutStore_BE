const express = require('express');
const { addToCart, getCart, checkout,removeFromCart, updateQuantity } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add to cart
router.post('/add', authMiddleware, addToCart);

// Get cart
router.get('/', authMiddleware, getCart); //??? do i need to change this route?

// Checkout
router.post('/checkout', authMiddleware, checkout);

//remove item
router.delete("/remove",authMiddleware,removeFromCart)

// Update cart item quantity
router.put('/update-quantity', authMiddleware, updateQuantity);

module.exports = router;