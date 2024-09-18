const MenuItem=require("../models/MenuItemModel");

// Fetching 3 random or specific menu items from the database. 
const getFeaturedItems = async (req, res) => {
    try {
     
      const featuredItems = await MenuItem.find().limit(3); // Adjust this query as needed
      res.json(featuredItems);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured items' });
    }
  };
  
  module.exports = { getFeaturedItems };