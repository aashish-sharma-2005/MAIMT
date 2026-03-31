const express = require("express");
const app = express();

app.use(express.json());
// app.get('/users',(req,res)=>{
//     // res.send(`hi user ${req.params.id}`);
//     res.send(`hi ${req.query.id} user ${req.query.name}`);
// })
app.get('/users',(req,res)=>{
    res.send(`hi ${req.body.name} your id is ${req.body.id}`);
})


app.listen(3000,()=>{console.log("server started")})