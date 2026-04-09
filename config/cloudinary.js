const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const {v2 : cloudinary} = require("cloudinary")

cloudinary.config({
    cloud_name:"dcihq8god",
    api_key:   "948694916429476",
    api_secret:"1xAKM9e-Df8T6gnujbfyLj-niYw"
})
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"facebook",
        resource_type: "auto",
        format:async(req,file)=>file.mimetype.split("/")[1],
        public_id:(req,file)=> Date.now() + file.originalname
    }
})
const upload = multer({storage:storage,limits:{fileSize:30*1024*1024}})
module.exports=upload;