import express from 'express';
import { getDestination, addDestination, getDestinationById, getDestinationBySlug, updateDestinationById, deleteDestinationById, addImageDestination, getDestinationMedia, deleteMedia} from '../controllers/destinations.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';
import {authorizeRoles} from '../middlewares/authorizeRoles.js';
import { validate } from '../middlewares/validate.middleware.js';
import { addDestinationSchema, updateDestinationSchema } from '../../validators/destination-validator.js';
import {addImageDestinationSchema} from '../../validators/destinationMedia-validator.js';
const router = express.Router();

router.get('/', getDestination);
router.post('/', authMiddleware, authorizeRoles("admin"),validate(addDestinationSchema), addDestination);
router.get('/:id', getDestinationById);
router.get('/slug/:slug', getDestinationBySlug);
router.put('/:id',authMiddleware, authorizeRoles("admin"), validate(updateDestinationSchema), updateDestinationById);
router.delete('/:id', deleteDestinationById);


// Media
router.post('/:id/media', authMiddleware, authorizeRoles("admin"), validate(addImageDestinationSchema), addImageDestination);
router.get('/:id/media',  getDestinationMedia);
router.delete('/media/:mediaId', deleteMedia);
export default router;