const User = require('../models/UserModel');
const MenuItem = require('../models/MenuItemModel');

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract categories from the user's cart items
    const categories = [];
    user.cart.forEach(item => {
      item.productId.categories.forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });

    // Query the database for other items in the same categories
    const recommendedItems = await MenuItem.find({
      categories: { $in: categories },
      _id: { $nin: user.cart.map(item => item.productId._id) },  // Exclude items already in the cart
    }).limit(3); // Limit to 3 recommendations

    res.json(recommendedItems);
  } catch (err) {
    console.error('Error fetching recommendations:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getRecommendations };