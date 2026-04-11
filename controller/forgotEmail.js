const User = require("../models/user")
const forgot = require("../forfotMailSend")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secret = "dorami"
function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000);
}
async function forgorPassword(req,res){
    try {
        res.render('forgotemail')
    } catch (error) {
        console.log(error)
        res.json({status:false,msg:"server err"})
    }
}
async function sendotp(req,res) {
    try {
        const data = (req.body)
        data.email = data.email.toLowerCase()
        const {email} = data;
        const result = await User.findOne({email:email})
        if(result) {
            const otp = generateOTP()
            const sent = await forgot(email,otp)
            if(sent){
                const payload = {email,otp} 
                const token = jwt.sign(payload,secret)
                res.cookie('forgotEmail',token,{
                    httpOnly:true,
                    secure:false,
                    maxAge: 1000 * 60 * 3
                })
                return res.json({status:true})
            }
            else return res.json({status:false,msg:"Otp not sent"})
        }
        
        else res.json({status:false,msg:"email not exist"})
    } catch (error) {
        console.log(error)
        res.json({status:false,msg:"server err"})
    }
}
async function verifyotp(req,res) {
    try {
        const {otp} = req.body;
        const token = req.cookies.forgotEmail;
        if(!token){
            res.json({status:false,msg:"Token Not Found"})
        }
        const data = jwt.verify(token,secret)
        if(otp === data.otp.toString()){
            const payload = {email:data.email}
            const token = jwt.sign(payload,secret)
            res.cookie('EmailVerify',token,{
                httpOnly:true,
                secure:false,
                maxAge:1000*60*2
            })
            return res.json({status:true})
        } 
        else return res.json({status:false,msg:"wrong otp"})
    } catch (error) {
        console.log(error)
        res.json({status:false,msg:"server err"})
    }
}
async function resetpassword(req,res){
    try {
        const password = await bcrypt.hash(req.body.password,10)
        const token = req.cookies.EmailVerify;
        if(!token) return res.json({status:false,msg:"Token Expire"})
        const data = jwt.verify(token,secret)
        const {email} = data;
        const result = await User.updateOne({email:email},{$set:{password:password}})
        if(result) return res.json({status:true})
        return res.json({status:false,msg:"Please Try Again"})
    } catch (error) {
        console.log(error)
        res.json({status:false,msg:"server err"})
    }
}
module.exports = {forgorPassword,sendotp,verifyotp,resetpassword}