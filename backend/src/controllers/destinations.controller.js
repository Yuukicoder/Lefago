import * as Destination from '../services/destination.service.js';
import * as DestinationMedia from '../services/destinationMedia.service.js';

// - CRUD destination
export const addDestination = async (req, res, next) => {
  try {
    // logic here
    const result = await Destination.addDestination(req.body, req.user.id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getDestinationById = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Destination.getDestinationById(id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getDestinationBySlug = async (req, res, next) => {
  try {
    // logic here
    const { slug } = req.params;
    const result = await Destination.getDestinationBySlug(slug);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateDestinationById = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Destination.updateDestinationById(id, req.body);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
export const deleteDestinationById = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Destination.deleteDestinationById(id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// - Search / filter cơ bản
export const getDestination = async (req, res, next) => {
  try {
    // logic here [Filter + Search + Pagination]
    const result = await Destination.getDestination(req.query);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// - Add image cho destination
export const addImageDestination = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    console.log("desId", id);
    const result = await DestinationMedia.addImageDestination(id, req.body, req.user.id)
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// - Get media theo destination
export const getDestinationMedia = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result =await DestinationMedia.getDestinationMedia(id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// - Delete media
export const deleteMedia = async (req, res, next) => {
  try {
    // logic here
    const {mediaId} = req.params;
    const result = await DestinationMedia.deleteMedia(mediaId);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};