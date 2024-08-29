const mongoose=require("mongoose");
const MenuItem=require("../models/MenuItemModel")
const menuItems = require('../menuItems.json'); // JSON file created from the CSV
const dbConnection = require('../DB/dbConnection');


// Function to upsert menu items into MongoDB
const upsertMenuItems = async () => {
    try {
        await dbConnection(); // Establish the database connection
        console.log("Connected to MongoDB");

        for (const item of menuItems) {
            await MenuItem.updateOne(
                { title: item.title }, // Match by title
                { $set: item }, // Update the document with new data
                { upsert: true } // Insert if the document does not exist
            );
        }

        console.log('Menu items upserted successfully');
    } catch (err) {
        console.error('Error upserting menu items:', err);
    } finally {
        mongoose.connection.close(); // Ensure the connection is closed after the operation
    }
};

// Execute the upsert function
upsertMenuItems();


// // Connect to MongoDB using the existing dbConnection function
// dbConnection()
//     .then(() => {
//         // Insert the menu items into the collection
//         return MenuItem.insertMany(menuItems);
//     })
//     .then(() => {
//         console.log('Menu items inserted successfully');
//     })
//     .catch((err) => {
//         console.error('Error inserting menu items:', err);
//     })
//     .finally(() => {
//         mongoose.connection.close(); // Ensure the connection is closed after the operation
//     });