const express=require("expres");
const mongoose=require("mongoose");
const cors=require("cors");

const menuRoutes = require('./routes/menu');

const app=express();
const port=process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json()); //parse json bodies

//MOngo connection:
// const mongoURI = 'your_mongodb_connection_string_here'; // Replace with your MongoDB connection string
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));

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