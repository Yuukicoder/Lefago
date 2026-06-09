import * as Destination from '../services/destination.service.js';
import * as DestinationMedia from '../services/destinationMedia.service.js';

// API: POST-create destination
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
// API: GET-get destination by id
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
// API: GET-get destination by slug
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
// API: PUT-update destination by id
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
// API: DELETE-delete destination by id
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
// API: GET-get destination [Search, filter, pagination]
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

// API: POST-add media (image,video) for destination (destination media)
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
// API: GET-get media (image, video) by destination id
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
// API: DELETE-delete media
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