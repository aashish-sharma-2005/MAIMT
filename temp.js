const mongoose = require("mongoose");
const User = require("./models/user");


async function a() {
    await mongoose.connect("mongodb://localhost/FaceBook");
    console.log("connect")
    const users = await User.find();

    // for (let user of users) {
    //     user.email = user.email.toLowerCase();
    //     await user.save();
    // }
    console.log(users)
}

a();