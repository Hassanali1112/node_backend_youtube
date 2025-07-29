import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (localFilePath) =>{
  try {
    if(!localFilePath) return null
    const response = cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type : "auto"
      })
      console.log(response)
      fs.unlinkSync(localFilePath)
      

  } catch (error) {
    console.log(error)
    fs.unlinkSync(localFilePath)
    
  }

}