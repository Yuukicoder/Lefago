import express from 'express';
import { addMediaShop, addShop, deleteMediaShop, deleteShop, getMediaShop, getShop, getShopByDestinationId, getShopBySlug, updateShop, uploadShopMedia } from '../controllers/shops.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validate.middleware.js';
import { addShopSchema, updateShopSchema } from '../../validators/shop-validator.js';
import { addMediaShopSchema } from '../../validators/shopMedia-validator.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.get('/', getShop);
router.post('/:id',authMiddleware, authorizeRoles("shop"), validate(addShopSchema), addShop);
router.get('/:id', getShopByDestinationId);
router.get('/slug/:slug', getShopBySlug);
router.put('/:id',authMiddleware, authorizeRoles("shop"), validate(updateShopSchema), updateShop);
router.delete('/:id', authMiddleware, authorizeRoles("shop"), deleteShop);

// Media
router.post('/:id/media', authMiddleware, authorizeRoles("shop"), validate(addMediaShopSchema), addMediaShop);
router.get('/media/:id', getMediaShop);
router.delete('/media/:mediaId', authMiddleware, authorizeRoles("shop"),deleteMediaShop);

// Multer
router.post("/:id/media/upload", authMiddleware,authorizeRoles("shop"), upload.single("media"), uploadShopMedia);
export default router;