const express=require("express");
require('dotenv').config();
const mongoose=require("mongoose");
const dbConnection=require("./DB/dbConnection.js")
const cors=require("cors");

const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes=require("./routes/cartRoutes.js")
const recommendationRoutes=require("./routes/recommendationRoutes.js")

const app=express();
const port=process.env.PORT || 5000;

//MIDDLEWARE
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',  // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
    allowedHeaders: ['Authorization', 'Content-Type'],  // Allowed headers
    credentials: true  // If you are using cookies or credentials
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

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // This logs the full error stack to the terminal
    res.status(500).json({ error: err.message }); // This sends a 500 response to the frontend with the error message
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});