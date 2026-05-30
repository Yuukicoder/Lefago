import * as Shop from '../services/shop.service.js';
export const getShop = async (req, res, next) => {
  try {
    // logic here
    const result = await Shop.getShop(req.query);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const addShop = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Shop.addShop(id, req.body, req.user.id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const getShopByDestinationId = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Shop.getShopByDestinationId(id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const updateShop = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Shop.updateShop(id,req.user.id, req.body);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

export const deleteShop = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await Shop.deleteShop(id, req.user.id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};