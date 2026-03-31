const express = require("express")
const router = express.Router()

const {getHome,postHome} = require("../controller/home")
const {getProfile,getCurrectProfile} = require("../controller/profile");
const {getFriends,sendRequest,acceptRequest,rejectRequest} = require("../controller/friends")
const {getNotifications} = require("../controller/notifications")

router.get('/',getHome);
router.post('/',postHome);

router.get('/profile',getCurrectProfile)
router.get('/profile/:id',getProfile)
router.get('/friends',getFriends)
router.patch('/friends/:id',sendRequest)
router.patch('/friends/accept/:id',acceptRequest)
router.patch('/friends/reject/:id',rejectRequest)
router.get('/notifications',getNotifications)

router.get('/logout',(req,res)=>{res.clearCookie("token");res.redirect('/')})

module.exports = router;