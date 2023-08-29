const mongoose = require("mongoose")
require("dotenv").config()

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db is connected successfully")
    }catch(err){
        console.log("database err", err)
    }
} 

module.exports = dbConnect