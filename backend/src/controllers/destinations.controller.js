import * as Destination from '../services/destination.service.js';


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