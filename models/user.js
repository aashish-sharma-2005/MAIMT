const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        role:{type:"String",default:"user"},
        // otp:{type:"String"},
        profilePic:{type:String,default:""},
        coverPhoto:{type:String,default:""},
        friends:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
        // verify:{type:Boolean,default:"false"},
        requestSend:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
        requestRecieve:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
    },
    {timestamps:true}
)
const user = new mongoose.model("user",userSchema);
module.exports = user;