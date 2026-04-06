const bcrypt = require("bcrypt");
const UserData = require("../models/user");
const testEmail = require("../mail")
const jwt = require("jsonwebtoken");
const userValidate = require("../validations/userValidation,js");
const secret = "dorami"

function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000);
}

function getSignup(req,res){
    try{
        res.render('signup')
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err Try Again"})
    }
}
async function postSignup(req,res){
    try{
        const userInfo = await userValidate.validate(req.body)
        // const userInfo = req.body;
        userInfo.password = await bcrypt.hash(userInfo.password,10);
        const data = await UserData.findOne({email:userInfo.email})
        if(data) return res.json({status:false,msg:"Email Exist"})
        const otp = generateOTP();
        // const ob = {...userInfo,otp:otp};
        const otpExpiry = Date.now() + 59 * 1000; // ⏳ 59 sec
        // const result = await UserData.insertOne(ob);
        const rs = await testEmail(userInfo.email,otp)
        if(rs){
            const payload = {...userInfo,otp:otp};
            const token = jwt.sign(payload,secret)
            res.cookie('user',token,{
                httpOnly:true,
                secure:false,
                maxAge: 1000 * 60 * 3
            })
            return res.json({status:true,msg:"verify email",location:"/auth/signup",});
        }
        else { 
            await UserData.deleteOne({email:result.email})
            return res.json({status:false,msg:"Wrong email,otp not send",location:"/auth/signup",});
        }
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err Try Again"})
    }
}
async function postVerifyEmail(req,res){
    try{
        const {email,otp} = req.body;
        const token = req.cookies.user;
        if (!token) {
            return res.json({status:false,msg:"Token missing"});
        }
        const user = jwt.verify(token,secret);
        //
        if(user.otp.toString()===otp){
            const ob = {name:user.name,email:user.email,password:user.password}
            const result = await UserData.insertOne(ob);
            if(result) return res.json({status:true,msg:"signup succes",location:"/auth/login"});
            else return res.json({status:true,msg:"signup failed",location:"/auth/signup"});
        }
        else{
            return res.json({status:false,msg:"otp missmatch"});
        }
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err Try Again"})
    }
}
// async function postVerifyEmail(req,res){
//     try{
//         const {email,otp} = req.body;
//         const user = await UserData.findOne({email});
//         // ⏰ OTP expired
//         if (user.otpExpiry < Date.now()) {
//             await UserData.deleteOne({ email }); // 🔥 auto delete
//             return res.json({ status: false, msg: "OTP expired, signup again" });
//         }
//         if(user.otp===otp){
//             user.otp=null;
//             user.save();
//             return res.json({status:true,msg:"signup succes",location:"/auth/login"});
//         }
//         else{
//             return res.json({status:false,msg:"otp missmatch"});
//         }
//     }catch(err){
//         console.log(err)
//         res.json({status:false,msg:"server Err Try Again"})
//     }
// }


module.exports = {getSignup,postSignup,postVerifyEmail}