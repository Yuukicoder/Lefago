import mongoose from 'mongoose';
import ShopMedia from '../models/shopMedias.model.js';
import Shop from '../models/shops.model.js';
import createHttpError from 'http-errors';
import User from '../models/users.model.js';

export const addMediaShop = async (shopId, data, userId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(shopId)){
    throw createHttpError(400, "Invalid shop Id")
  }
  const shop = await Shop.findById(shopId).lean();
  if(!shop){
    throw createHttpError(404, "Do not have any shop")
  }
  console.log("UserId", shop.user_id.toString());
  console.log(userId);
  if(shop.user_id.toString()!==userId){
    throw createHttpError(403, "You cannot access")
  }
  const user = await User.findById(userId).lean();
  const existedURL = await ShopMedia.findOne({url: data.url}).lean();
  if(existedURL){
    throw createHttpError(409, "URL is already existed")
  }
  const result = await ShopMedia.create({
    shop_id: shopId,
    type: data.type, 
    url: data.url,
    uploaded_by: userId,
  })
  await result.populate("uploaded_by", "fullname email")
  return result;
};

export const getMediaShop = async (shopId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(shopId)){
    throw createHttpError(400, "Invalid Shop Id")
  }
  const shop = await Shop.findById(shopId).lean();
  if(!shop){
    throw createHttpError(404, "Do not have any shop")
  }
  const result = await ShopMedia.find({shop_id: shopId}).populate("uploaded_by", "fullname email").lean();
  if(!result || result.length === 0){
    throw createHttpError(404, "Do not have any shop media")
  }
  return result;
};

export const deleteMediaShop = async (mediaId, userId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(mediaId)){
    throw createHttpError(400, "Invalid media id")
  }
  const media = await ShopMedia.findById(mediaId).lean();
  if(!media){
    throw createHttpError(404, "Do not have any shop media")
  }
  const shop = await Shop.findById(media.shop_id).lean();
  if(!shop){
    throw createHttpError(404, "Do not have any shop")
  }
  if(shop.user_id.toString()!==userId){
    throw createHttpError(403, "You cannot access")
  }
  const result = await ShopMedia.findByIdAndDelete(mediaId).lean();
  return result;
};