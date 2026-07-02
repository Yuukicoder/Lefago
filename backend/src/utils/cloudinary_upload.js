import cloudinary from '../config/cloudinary.config.js';
import streamifier from 'streamifier';
export const uploadToCloudinary = async (file, folder)=>{
    return new Promise((resolve, reject) =>{
        const stream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: "auto"
        },
        (error,result) =>{
            if(error){
                return reject(error)
            }
            return resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
        // Convert File Buffer to Readable Stream then push to cloudinary stream
    })
}