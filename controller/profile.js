const UserData = require("../models/user")

async function getProfile(req,res) {
    try {
        const user = await UserData.findOne({_id:req.params.id})
        const currentUser = await UserData.findOne({email:req.user.useremail})
        res.render('home',{
            page:'profile',
            profileUser: user,      // jiski profile dekh rahe ho
            currentUser: currentUser,
            username:req.user.username
        })
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}
async function getCurrectProfile(req,res) {
    try {
        const user = await UserData.findOne({email:req.user.useremail})
        res.render('home',{page:'currentprofile',username:req.user.username,user:user,currentuser:user})
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}
module.exports = {getProfile,getCurrectProfile}