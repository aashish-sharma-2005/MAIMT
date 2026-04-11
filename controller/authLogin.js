const UserData = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const secret = "dorami"

function getLogin(req,res){
    try{
        res.render("login");
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err Try Again"})
    }
}
async function postLogin(req,res){
    try{
        const data = req.body;
        data.email= data.email.toLowerCase()
        const {email,password} = data;
        const user = await UserData.findOne({email:email})
        if(user){
            const result = await bcrypt.compare(password,user.password)
            if(result){
                const payload = {
                    id:user._id,
                    username:user.name,
                    useremail:user.email,
                    role:user.role,
                    friends:user.friends
                }
                const token = jwt.sign(payload,secret);
                 if (!token) {
                    return res.json({status:false,msg:"Token missing"});
                }
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:false,
                    maxAge:1000*60*20
                })
                res.json({status:true,location:"/user"});
            }
            else res.json({status:false,msg:"incorrect id password"})
        }else{
            res.json({status:false,msg:"User not Exist"})
        }
        
    }catch(err){
        console.log(err)
        res.json({status:false,msg:"server Err Try Again"})
    }
}

module.exports = {getLogin,postLogin}