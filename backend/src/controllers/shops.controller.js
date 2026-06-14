import * as Shop from '../services/shop.service.js';
import * as ShopMedia from '../services/shopMedia.service.js';
// API: GET-get shops [search, filter, pagination]
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
// API: GET-get shops by slug
export const getShopBySlug = async (req, res, next) => {
  try {
    // logic here
    const {slug} = req.params;
    const result = await Shop.getShopBySlug(slug);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// API: POST-create shop
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
// API: GET-get shop by destination id
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
// API: PUT-update shop
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
// API: DELETE-delete shop
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
// API: POST-create media[image, video] for shop
export const addMediaShop = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await ShopMedia.addMediaShop(id, req.body, req.user.id);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// API: GET-get media by shop Id [Filter, Pagination]
export const getMediaShop = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await ShopMedia.getMediaShop(id, req.query);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// API: DELETE-delete media
export const deleteMediaShop = async (req, res, next) => {
  try {
    // logic here
    const {mediaId} = req.params;
    const result = await ShopMedia.deleteMediaShop(mediaId, req.user.id)
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};
// API: POST-upload media by multer
export const uploadShopMedia = async (req, res, next) => {
  try {
    // logic here
    const {id} = req.params;
    const result = await ShopMedia.uploadShopMedia(id, req.file, req.user.id, req);
    res.status(200).json({
      message: 'Success',
      data: result
    });
  } catch (error) {
    next(error);
  }
};