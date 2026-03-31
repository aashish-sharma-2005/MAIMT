const mongoose = require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect("mongodb://localhost/FaceBook");
        console.log("Database Connected");
    }catch(err){
        console.log(err)
        console.log("not Connected Databse")
    }
}
module.exports = connectDB;