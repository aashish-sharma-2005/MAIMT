const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express()
app.use(cors())

const connectDB = require("./config/connectDB");
connectDB();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('public'))
app.use(cookieParser());

// signup otp expiry data not delete problem
const midleware = require("./midlewares/verifyToken");

app.get('/',(req,res)=>{res.redirect('/auth')});
app.use('/auth',require("./route/auth"));
app.use('/user',midleware,require("./route/home"))


app.listen(3000,()=>{console.log("server start")})