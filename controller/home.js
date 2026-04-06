const Post = require("../models/posts")
const User = require("../models/user")

async function getHome(req,res){
    try{
        // const posts = await Post.find().populate("User","name profilePic").sort({createdAt:-1})
        // console.log(posts)
        res.render('home',{page:"feed",username:req.user.username});
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err"})
    }
}
function postHome(req,res){
    try{

    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err"})
    }
}
module.exports = {getHome,postHome}