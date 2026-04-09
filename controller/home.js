const Post = require("../models/posts")
const User = require("../models/user")

async function getHome(req,res){
    try{
        const posts = await Post.find({privacy:"friends",user:{$in:req.user.friends}}).populate("user","name profilePic").sort({createdAt:-1})
        // const data = posts.filter(i=>(i.privacy==="friends" && i.user.friends.includes(req.user.id)))
        // const data = posts.filter(i=>i.privacy==="public" || (i.privacy==="friends" && i.user.friends.includes(req.user.id)))
        // console.log(data)
        res.render('home',{page:"feed",username:req.user.username,data:posts});
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