const mongoose = require("mongoose");
const UserData = require("../models/user");

async function getFriends(req,res){
    try {
        const user = await UserData.findOne({email:req.user.useremail})
        const data = await UserData.find({email:{$ne:req.user.useremail}})
        const data2 = data.filter(i=>!i.friends.includes(i._id))
        res.render('home',{page:"friends",
                            username:req.user.username,
                            data:data2,
                            friends:user.friends,
                            requestSend:user.requestSend,
                            requestReceived:user.requestRecieve
                        })
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}
async function sendRequest(req,res){
    try {
        const id = req.params.id;
        const result = await UserData.updateOne({email:req.user.useremail},{ $addToSet: {requestSend: new mongoose.Types.ObjectId(id)}})
        const result2 = await UserData.updateOne({ _id: new mongoose.Types.ObjectId(id) },{ $addToSet: {requestRecieve:new mongoose.Types.ObjectId(req.user.id)}})
        if(result && result2) return res.json({status:true})
        else res.json({status:false})
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}
async function acceptRequest(req,res){
    try {
        const id = req.params.id;
        const result = await UserData.updateOne({email:req.user.useremail},{ $addToSet: {friends: new mongoose.Types.ObjectId(id)},$pull: { requestRecieve: new mongoose.Types.ObjectId(id)}})
        const result2 = await UserData.updateOne({ _id: new mongoose.Types.ObjectId(id) },{ $addToSet: {friends:new mongoose.Types.ObjectId(req.user.id)},$pull: { requestSend: new mongoose.Types.ObjectId(req.user.id)}})
        if(result && result2) return res.json({status:true})
        else res.json({status:false})
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}
async function rejectRequest(req,res) {
    try {
        const id = req.params.id;
        const result = await UserData.updateOne({email:req.user.useremail},{ $pull: { requestRecieve: new mongoose.Types.ObjectId(id)}})
        const result2 = await UserData.updateOne({ _id: new mongoose.Types.ObjectId(id) },{$pull: { requestSend: new mongoose.Types.ObjectId(req.user.id)}})
        if(result && result2) return res.json({status:true})
        else res.json({status:false})
    } catch (error) {
        console.log(error)
        res.json({status:false})
    }
}

module.exports = {getFriends,sendRequest,acceptRequest,rejectRequest}