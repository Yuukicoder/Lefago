import express from 'express';
import { addShop, deleteShop, getShop, getShopByDestinationId, updateShop } from '../controllers/shops.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validate.middleware.js';
import { addShopSchema, updateShopSchema } from '../../validators/shop-validator.js';

const router = express.Router();

router.get('/', getShop);
router.post('/:id',authMiddleware, authorizeRoles("shop"), validate(addShopSchema), addShop);
router.get('/:id', getShopByDestinationId);
router.put('/:id',authMiddleware, authorizeRoles("shop"), validate(updateShopSchema), updateShop);
router.delete('/:id', authMiddleware, authorizeRoles("shop"), deleteShop);
export default router;