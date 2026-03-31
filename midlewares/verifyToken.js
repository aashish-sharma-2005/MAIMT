const jwt = require("jsonwebtoken")

function verify(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.redirect("/auth/login");
    try {       
        const decode = jwt.verify(token,"dorami")
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}
module.exports = verify;