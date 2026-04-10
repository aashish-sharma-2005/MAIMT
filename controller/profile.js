const UserData = require("../models/user")
const Post = require("../models/posts")
const upload = require("../config/cloudinary")

async function getProfile(req, res) {
    try {
        if (req.user.id === req.params.id) return res.redirect('/user/profile')
        const posts = await Post.find({ user: req.params.id }).populate("user", "name profilePic").sort({ createdAt: -1 });
        const user = await UserData.findOne({ _id: req.params.id })
        const friends = await Promise.all(user.friends.map(i => UserData.findById(i)))
        const currentUser = await UserData.findOne({ email: req.user.useremail })
        res.render('home', {
            page: 'profile',
            profileUser: user,      // jiski profile dekh rahe ho
            currentUser: currentUser,
            username: req.user.username,
            friends: friends,
            posts:posts
        })
    } catch (error) {
        console.log(error)
        res.json({ status: false })
    }
}
async function getCurrectProfile(req, res) {
    try {
        const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
        const user = await UserData.findOne({ email: req.user.useremail })
        const friends = await Promise.all(user.friends.map(i => UserData.findById(i)))
        res.render('home', { page: 'currentprofile', username: req.user.username, user: user, currentuser: user, friends: friends, posts:posts})
    } catch (error) {
        console.log(error)
        res.json({ status: false })
    }
}
async function uploadpic(req, res) {
    try {
        if (req.file) {
            const result = await UserData.updateOne({ _id: req.user.id }, { $set: { profilePic: req.file.path } })
            if (result) return res.json({ status: true })
            else return res.json({ status: false })
        }
    } catch (error) {
        console.log(error)

    }
}
async function uploadcover(req, res) {
    try {
        if (req.file) {
            const result = await UserData.updateOne({ _id: req.user.id }, { $set: { coverPhoto: req.file.path } })
            if (result) return res.json({ status: true })
            else return res.json({ status: false })
        }
    } catch (error) {
        console.log(error)

    }
}
module.exports = { getProfile, getCurrectProfile, uploadpic, uploadcover }