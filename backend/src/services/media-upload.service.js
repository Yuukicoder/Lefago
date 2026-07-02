import createHttpError from 'http-errors';
import { uploadToCloudinary } from '../utils/cloudinary_upload.js';
export const UploadCloudinaryMedia = async (file, folder) => {
  // logic here
  if(!file){
    throw createHttpError(400, "Media is required")
  }
  const uploaded = await uploadToCloudinary(file, folder);
  return {
    type: uploaded.resource_type,
    url: uploaded.secure_url,
    public_id: uploaded.public_id
  }
};