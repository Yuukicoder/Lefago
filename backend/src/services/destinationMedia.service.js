import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import Destination from '../models/destinations.model.js';
import DestinationMedia from '../models/destinationMedias.model.js';
import User from '../models/users.model.js';
export const addImageDestination = async (desId, data, userId) => {
  // logic here
  console.log(desId);
  if(!mongoose.Types.ObjectId.isValid(desId)){
    throw createHttpError(400, "Invalid destination Id")
  }
  const destination =await Destination.findById(desId).lean();
  if(!destination) {
    throw createHttpError(404, "Do not have any destination!")
  }
  const existedUrl = await DestinationMedia.findOne({url: data.url}).lean();
  if(existedUrl){
    throw createHttpError(409, "URL is already existed")
  }
  const result = await DestinationMedia.create({
    destination_id: desId,
    type: data.type || "image",
    url: data.url,
    uploaded_by: userId
  });
  await result.populate("uploaded_by", "fullname email");
  return result;
};



export const getDestinationMedia = async (desId) => {
  // logic here 
  const result = await DestinationMedia.find({destination_id:desId}).sort({createdAt: -1}).lean();
  if(!result || result.length===0) {
    throw createHttpError(400, "Do not have any Destination Media!")
  }
  return result;
};

export const deleteMedia = async (mediaId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(mediaId)){
    throw createHttpError(400, "Invalid mediaId")
  }
  const result = await DestinationMedia.findByIdAndDelete(mediaId).lean();
  if(!result){
    throw createHttpError(400, "Do not have any Destination Media!")
  }
  return result;
};