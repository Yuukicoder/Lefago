import Shop from '../models/shops.model.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Destination from '../models/destinations.model.js';
import slugify from 'slugify';
import User from '../models/users.model.js';
export const getShop = async (query) => {
  // logic here
  const {keyword, type,destination_id, page = 1, limit = 10} = query;
  const filter = {};
  if(keyword){
    filter.$or = [
      {name: {$regex: keyword, $options: "i"}},
      {address: {$regex: keyword, $options: "i"}},
      {description: {$regex: keyword, $options: "i"}}, 
      {"contact.phone": {$regex: keyword, $options: "i"}},
      {"contact.email": {$regex: keyword, $options: "i"}},
      {"contact.facebook": {$regex: keyword, $options: "i"}},
      {"contact.website": {$regex: keyword, $options: "i" }}
    ]}
  if(type){
    filter.type = type
  }
  if(destination_id){
    if(!mongoose.Types.ObjectId.isValid(destination_id)){
      throw createHttpError(400, "invalid destination_id")
    }
    filter.destination_id = destination_id;
  }
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber-1)*limitNumber;
  const data = await Shop.find(filter)
                          .populate("destination_id", "name slug")
                          .populate("user_id", "fullname")
                          .sort({createdAt: -1})
                          .skip(skip)
                          .limit(limitNumber)
                          .lean()
  if(!data || data.length === 0) {
    throw createHttpError(400, "Do not have any shop")
  }
  const total = await Shop.countDocuments(filter);
  const formattedData = data.map(shop =>({
    _id: shop._id,
    name: shop.name,
    slug: shop.slug, 
    type: shop.type,
    address: shop.address,
    description: shop.description,
    thumbnail: shop.thumbnail,
    destination: shop.destination_id.name,
    owner: shop.user_id.fullname,
    contact: shop.contact,
  }))
  return {
    data: formattedData, 
    pagination : {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPage: Math.ceil(total/limitNumber)
    }
  }
};


export const addShop = async (destinationId, data, userId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(destinationId)){
    throw createHttpError(400, "Invalid destinationId")
  }
  const destination = await Destination.findById(destinationId).lean();
  if(!destination){
    throw createHttpError(400, "Do not have any destination!")
  }
  const slug = slugify(`${data.name}-${data.address || destination.name}`, {
    strict: true,
    lower: true,
    locale: "vi",
  })
  const existed = await Shop.findOne({name: data.name, destination_id: destinationId, address: data.address}).lean();
  console.log(existed);
  if(existed){
    throw createHttpError(409, "Shop already exist in this destination!")
  }
  const result = await Shop.create({
      destination_id: destinationId,
      user_id: userId,
    name: data.name,
    slug: slug,
    type: data.type,
    address: data.address,
    description: data.description,
    thumbnail: data.thumbnail,
    contact: data.contact
  })
  return result;
};
 

export const getShopByDestinationId = async (desId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(desId)){
    throw createHttpError(400, "Invalid DestinationId")
  }
  const result = await Shop.find({destination_id: desId}).populate("destination_id", "name slug").populate("user_id", "fullname email").sort({createdAt: -1}).lean();
  if(!result || result.length === 0) {
    throw createHttpError(400, "Do not have any shop in this destination!")
  }
  const formattedResult  = result.map(shop => ({
    name: shop.name,
    slug: shop.slug, 
    type: shop.type,
    address: shop.address,
    description: shop.description,
    thumbnail: shop.thumbnail,
    destination:shop.destination_id.name,
    owner: shop.user_id.fullname,
    contact: shop.contact
  }))
  return formattedResult;
};

export const getShopBySlug = async (slug) => {
  // logic here
  const result = await Shop.findOne({slug}).populate("destination_id", "name").populate("user_id", "fullname").lean();
  if(!result){
    throw createHttpError(400, "Do not have any shop!")
  }
  return result;
};

export const updateShop = async (shopId,userId, data) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(shopId)){
    throw createHttpError(400, "Invalid ShopId");
  }
  const existed = await Shop.findById(shopId).lean();
  if(!existed) {
    throw createHttpError(404, "Do not have any shop")
  }

  if(userId !== existed.user_id.toString()){
    throw createHttpError(403, "You cannot access!")
  }
  if(data.name !== existed.name){
    const slug = slugify(`${data.name}-${data.address ||  existed.destination_id}`, {
      strict: true,
      lower: true,
      locale: "vi",
    })
    const slugExisted = await Shop.findOne({slug, _id: {$ne: shopId},}).lean();
    if(slugExisted) {
      throw createHttpError(409, "Shop slug already exists");
    }
    data.slug = slug;
  }
  const result = await Shop.findByIdAndUpdate(shopId, data, 
    {
      new: true,
      runValidators: true,
    }
  ).populate("user_id", "fullname ")
  return result;
};

export const deleteShop = async (shopId, userId) => {
  // logic here
  if(!mongoose.Types.ObjectId.isValid(shopId)){
    throw createHttpError(400, "Invalid shopId")
  }
  const existed = await Shop.findById(shopId).lean();
  if(!existed){
    throw createHttpError(404, "Do not have any shop")
  }
  console.log(userId, existed.user_id.toString());
  if(userId !== existed.user_id.toString()){
    throw createHttpError(403, "You cannot access!")
  }
  const result = await Shop.findByIdAndDelete(shopId).lean();
  return result;
};

