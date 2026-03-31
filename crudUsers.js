const fs = require("fs");
function getData(){
    const d = JSON.parse(fs.readFileSync("./users.json","utf-8"));
    if(d)    return d;
    else return [];
}
function reading(){
    const data = getData();
    return data;
}

function writing(d){
    try{
        const data = getData();
        data.push(d);
        fs.writeFileSync("./users.json",JSON.stringify(data),"utf-8")
        return 1;
    }
    catch{
        return 0;
    }
}
function addNewData(d){
    try{
        fs.writeFileSync("./users.json",JSON.stringify(d),"utf-8");
        return 1;
    }
    catch{
        return 0;
    }
}
module.exports = {reading,writing,addNewData};