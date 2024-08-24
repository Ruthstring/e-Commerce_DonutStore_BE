const mongoose=require("mongoose");
const MenuItem=require("../models/MenuItemModel")
const menuItems = require('../menuItems.json'); // JSON file created from the CSV
const dbConnection = require('../DB/dbConnection');


// Connect to MongoDB using the existing dbConnection function
dbConnection()
    .then(() => {
        // Insert the menu items into the collection
        return MenuItem.insertMany(menuItems);
    })
    .then(() => {
        console.log('Menu items inserted successfully');
    })
    .catch((err) => {
        console.error('Error inserting menu items:', err);
    })
    .finally(() => {
        mongoose.connection.close(); // Ensure the connection is closed after the operation
    });