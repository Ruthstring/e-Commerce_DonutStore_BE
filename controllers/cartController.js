const User = require('../models/UserModel');


const addToCart = async (req, res) => {
    const { productId, title, price, quantity } = req.body;  
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User:', user);

        // Check if productId exists in the request
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        
// Log the cart contents to debug
console.log('User cart:', user.cart);

// Check if the product is already in the cart
const productIndex = user.cart.findIndex(item => {
    console.log('Cart item:', item); // Log each cart item to debug
    return item.productId && item.productId.toString() === productId;
});

        if (productIndex > -1) {
            // If product exists, update the quantity
            user.cart[productIndex].quantity += quantity;
        } else {
            // Otherwise, add new product to cart
            user.cart.push({ productId, title, price, quantity });
        }

        console.log('Updated cart:', user.cart);

        await user.save();  // Save the updated user document

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        console.error('Error adding to cart:', err); // Log the error
        res.status(500).json({ message: 'Failed to add product to cart', error: err.message });
    }
};
// // Add product to cart
// const addToCart = async (req, res) => {
//     console.log('Received POST request at /api/cart/add'); 
//     const { productId, title, price, quantity } = req.body;  // Add title, price to the request body
//     const userId = req.user ? req.user._id : null;  // Make sure req.user exists

//     console.log('Received request to add to cart:', req.body); // Debug log
//     console.log('User ID:', userId); // Debug log

//     try {
//         const user = await User.findById(userId);
//         console.log('User:', user);
//         console.log('Product details:', { productId, title, price, quantity });

//         // Check if the product is already in the cart
//         const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

//         if (productIndex > -1) {
//             // If product exists, update the quantity
//             user.cart[productIndex].quantity += quantity;
//         } else {
//             // Otherwise, add new product to cart
//             user.cart.push({ productId, title, price, quantity });
//         }

//         await user.save(); // Save the updated user document
//         res.json({ message: 'Product added to cart', cart: user.cart });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// Get cart
const getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('cart.productId');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user.cart);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update quantity of cart item
const updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId);
  
      // Find the item in the cart and update its quantity
      const cartItem = user.cart.find(item => item.productId.toString() === productId);
      if (cartItem) {
        cartItem.quantity = quantity;
        await user.save();
        res.json(cartItem);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Checkout (turns cart into order)
const checkout = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        // Calculate total amount
        const totalAmount = user.cart.reduce((sum, item) => {
            return sum + item.productId.price * item.quantity;
        }, 0);

        // Create a new order
        const order = {
            orderId: new mongoose.Types.ObjectId(),
            totalAmount,
            date: new Date()
        };
        user.orders.push(order);

        // Clear the cart
        user.cart = [];

        await user.save();
        res.json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addToCart, getCart, checkout };