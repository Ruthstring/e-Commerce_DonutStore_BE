const express=require("express");
require('dotenv').config();
const mongoose=require("mongoose");
const dbConnection=require("./DB/dbConnection.js")
const cors=require("cors");

const menuRoutes = require('./routes/menuRoutes');

const app=express();
const port=process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json()); //parse json bodies

// Connect to MongoDB
dbConnection();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//Routes
app.use('/api/menu', menuRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});