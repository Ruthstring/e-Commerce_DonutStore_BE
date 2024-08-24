const MenuItem = require('../models/MenuItemModel');

const getMenu= async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {getMenu};