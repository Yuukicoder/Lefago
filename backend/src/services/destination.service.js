import Destination from '../models/destinations.model.js';
import createHttpError from 'http-errors';
import slugify from 'slugify';
import User from '../models/users.model.js';
import { vi } from 'zod/v4/locales';


export const addDestination = async (data, userId) => {
  // logic here
  const name = data.name;
  const existed = await Destination.findOne({name}).lean();
  if(existed) 
    {
      throw createHttpError(409, "Destination is already existed!");
    }
  const slug = slugify(data.name, {
    lower: true,
    strict: true,
    locale: "vi",
  });
  const slugExisted = await Destination.findOne({slug}).lean();
  if(slugExisted)
   {
      throw createHttpError(409, "Slug destination is already existed!");
   }
  const result = await Destination.create({
    ...data,
    slug,
    createdBy: userId,
  })
  await result.populate("createdBy", "fullname email");
  return result;
};

export const getDestinationById = async (desId) => {
  // logic here
  const result = await Destination.findById(desId).lean();
  if(!result) {
    throw createHttpError(400, "Do not have any destination!");
  }
  return result;
};

export const getDestinationBySlug = async (slug) => {
  // logic here
  const result = await Destination.findOne({slug}).lean();
  if(!result) {
    throw createHttpError(400, "Do not have any destination!");
  }
  return result;

};

export const updateDestinationById = async (id, data) => {
  // logic here
  const existed = await Destination.findById(id).lean();
  if(!existed) {
    throw createHttpError(400, "Do not have any destination!");
  }
  if(data.name !== existed.name){
    const slug = slugify(data.name, {
      lower: true,
      strict: true,
      locale: "vi"
    })
    data.slug = slug;
  }

  const result = await Destination.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })

  return result;

};

export const deleteDestinationById = async (id) => {
  // logic here
  const result = await Destination.findByIdAndDelete(id).lean();
  if(!result) {
    throw createHttpError(400, "Do not have any destination!");
  }
  return result;
};


 export const getDestination = async (query) => {
   // logic here
   const {keyword, region, page = 1, limit = 10} = query;
  //  Filter+Search
  const filter = {};
  if(keyword) {
    filter.$or=[
      {name: {$regex: keyword, $options: 'i'}},
      {description: {$regex: keyword, $options: 'i'}},
      {region: {$regex: keyword, $options: 'i'}},
    ]
  }
  if(region){
    filter.region =  {$regex: region, $options: "i"}
  }
  // Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber-1)*limitNumber;
  const data = await Destination.find(filter)
                                .sort({createdAt: -1})
                                .skip(skip)
                                .limit(limitNumber)
                                .lean();
  if(!data || data.length === 0) {
    throw createHttpError(404, "Do not have any destination!")
  }
  const total = await Destination.countDocuments(filter);
  return {
    data,
    pagination : {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPage: Math.ceil(total/limitNumber)
    }
  }
 };