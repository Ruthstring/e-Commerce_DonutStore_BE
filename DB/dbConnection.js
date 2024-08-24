const mongoose = require('mongoose');
require("dotenv").config()


const dbConnection=async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI,{dbName:"Donut01"});
    console.log("Connected to MongoDB");
    console.log(connection.connection.db.databaseName);
    
    }catch (error){
     throw error
    }
}


module.exports=dbConnection;