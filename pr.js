const {reading,writing,addNewData} = require("./crudUsers.js")
const express = require("express");
const app = express();

app.use(express.json());
app.get('/users/:id',(req,res)=>{
    const data = reading();
    const id = parseInt(req.params.id);
    const ob = data.find((i)=>{
        if(id===i.id) return i;
    })
    if(ob)
        res.send(JSON.stringify(ob));
    else
        res.send(`No User found for id ${id} `);
})
app.get('/user',(req,res)=>{
    const data = reading();
    if(data)
        res.send(JSON.stringify(data));
    else
        res.send(`No User found for id ${id}`);
})

app.post('/user',(req,res)=>{
    const data = reading();
    const ob = {id:data.length?data.length + 1:1,name:req.body.name}
    const status = writing(ob);
    if(status) res.send(`user Name ${ob.name} added succesfully`);
    else res.send(`user Name ${ob.name} not added succesfully`);
})

app.delete("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const data = reading()
    const newData = data.filter((i)=>{
        if(id!==i.id) return i;
    });
    const status = addNewData(newData);
    if(status) res.send(`user Deleted`);
    else res.send(`user not Deleted`);
})

app.patch('/user/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const data = reading();
    const ob = data.find((i)=>{
        if(id===i.id) return i;
    })
    let msg = '';
    if(ob){
        const index = data.indexOf(ob);
        ob.name = name;
        msg = `User With id ${id} name changed to ${name}`
        data[1]=ob;
        addNewData(data);
    }
    else msg = `User With id ${id} not Found`;
    res.send(msg);
})

app.put('/user/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const data = reading();
    const ob = data.find((i)=>{
        if(id===i.id) return i;
    })
    console.log(ob);
    const index = data.indexOf(ob);
    data[index] = {id,...req.body};
    addNewData(data);
    res.send();
})

app.listen(3000,()=>{console.log("server started")})