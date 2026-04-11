const express = require("express")
const router = express.Router()
const {getLogin,postLogin} = require("../controller/authLogin");
const {getSignup,postSignup,postVerifyEmail} = require("../controller/authSignup");
const {forgorPassword,sendotp,verifyotp,resetpassword} = require("../controller/forgotEmail")

router.get('/',(req,res)=>res.redirect('/auth/login'))
router.get('/login',getLogin);
router.post('/login',postLogin);
router.get('/signup',getSignup);
router.post('/signup',postSignup);
router.post('/verifyEmail',postVerifyEmail);
router.get('/forgot',forgorPassword);
router.post('/sendotp',sendotp)
router.post('/verifyotp',verifyotp)
router.post('/resetpassword',resetpassword)

module.exports = router;