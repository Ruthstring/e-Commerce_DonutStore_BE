const express=require("express");
require('dotenv').config();
const mongoose=require("mongoose");
const dbConnection=require("./DB/dbConnection.js")
const cors=require("cors");

const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes=require("./routes/cartRoutes.js")
const recommendationRoutes=require("./routes/recommendationRoutes.js")
const featuredRoutes=require("./routes/featuredRoutes.js")

const app=express();
const port=process.env.PORT || 5000;

//MIDDLEWARE
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',  // Allows frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
    allowedHeaders: ['Authorization', 'Content-Type'],  
    credentials: true 
  }));

app.use(express.json()); //parse json bodies

// Connect to MongoDB
dbConnection();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//Routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use("/api/featured", featuredRoutes)

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // This logs the full error stack to the terminal
    res.status(500).json({ error: err.message }); // This sends a 500 response to the frontend with the error message
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});