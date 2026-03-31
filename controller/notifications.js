const UserData = require("../models/user")

async function getNotifications(req,res){
    try {
        const data = await UserData.findOne({email:req.user.useremail})
        const users = await UserData.find({_id:{$in:data.requestRecieve}},{ name: 1, profilePic: 1 });
        res.render('home',{page:"notifications",username:req.user.username,users:users})
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}

module.exports = {getNotifications}