const UserData = require("../models/user")
const Post = require("../models/posts")

async function getCreateNewPost(req,res){
    try {
        const user = await UserData.findById({_id:req.user.id})
        res.render('home',{page:"createNewPost",username:req.user.username,user:user});
    } catch (error) {
        console.log(error)
    }
}
async function postCreateNewPost(req,res){
    try {
        const {content,type,privacy} = req.body;
        if(type==="image"){
            const ob = {user:req.user.id,content:content,image:req.files.image[0].path}
            const result = await Post.insertOne(ob);
            if(result) return res.redirect("/user")
        }else if(type==="video"){
            console.log("vdo")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getCreateNewPost,postCreateNewPost}