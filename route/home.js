const express = require("express")
const router = express.Router()
const upload = require("../config/cloudinary")

const {getHome,postHome} = require("../controller/home")
const {getProfile,getCurrectProfile,uploadpic,uploadcover} = require("../controller/profile");
const {getFriends,sendRequest,acceptRequest,rejectRequest} = require("../controller/friends")
const {getNotifications} = require("../controller/notifications")
const {getCreateNewPost,postCreateNewPost} = require("../controller/posts")

router.get('/',getHome);
router.post('/',postHome);

router.get('/profile',getCurrectProfile)
router.get('/profile/:id',getProfile)
router.post('/profile/uploadpic',upload.single("profilepic"),uploadpic)
router.post('/profile/uploadcover',upload.single("coverpic"),uploadcover)
// router.get('/profile/photos',)
router.get('/friends',getFriends)
router.patch('/friends/:id',sendRequest)
router.patch('/friends/accept/:id',acceptRequest)
router.patch('/friends/reject/:id',rejectRequest)
router.get('/notifications',getNotifications)
router.get('/:id/createPost',getCreateNewPost);
router.post('/:id/createPost',upload.fields([{name:"image",maxCount:1},{name:"video",maxCount:1}]),postCreateNewPost);


router.get('/logout',(req,res)=>{res.clearCookie("token");res.redirect('/')})

module.exports = router;