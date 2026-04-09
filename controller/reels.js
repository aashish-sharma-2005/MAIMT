const Post = require("../models/posts")

async function getReels(req,res){
    try {
        const posts = await Post.find({privacy:"public"}).populate("user","name profilePic").sort({createdAt:-1})
        res.render('home',{page:"reels",username:req.user.username,data:posts});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getReels}