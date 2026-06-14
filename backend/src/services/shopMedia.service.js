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

export const getMediaShop = async (shopId, query) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(shopId)){
    throw createHttpError(400, "Invalid Shop Id")
  }
  const shop = await Shop.findById(shopId).lean();
  if(!shop){
    throw createHttpError(404, "Do not have any shop")
  }
  const {type, page = 1, limit = 10} = query;
  const filter = {shop_id: shopId};
  if(type){
    filter.type = type;
  }
  const NumberPage = Number(page);
  const NumberLimit = Number(limit);
  const skip = (NumberPage-1)*NumberLimit;
  const data = await ShopMedia.find(filter)
                              .populate("shop_id", "name contact")
                              .populate("uploaded_by", "fullname")
                              .sort({createdAt: -1})
                              .skip(skip)
                              .limit(NumberLimit)
                              .lean();
  if(!data || data.length === 0){
    throw createHttpError(404, "Do not have any shop media")
  }
  const formattedData = data.map(media => ({
    _id: media._id,
    type: media.type,
    url: media.url,
    shop: media.shop_id.name,
    contact: media.shop_id.contact,
    uploaded_by: media.uploaded_by.fullname

  }))
  const total = await ShopMedia.countDocuments(filter);
  return {
    formattedData, 
    pagination:{
      total,
      page: NumberPage,
      limit: NumberLimit,
      totalPage: Math.ceil(total/NumberLimit)
    }
  }
  
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


export const uploadShopMedia = async (shopId, file, userId, req) => {
  // logic here
  if(!file){
    throw createHttpError(400, "Invalid file")
  }
  const mediaType = file.mimetype.startsWith("video/")?"video":"image";
  const mediaUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  const result = await addMediaShop(
    shopId,
    {
      type: mediaType,
      url: mediaUrl
    },
    userId
  )
  return result;
};