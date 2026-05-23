import express from "express";
import authRouter from "./auth.route.js";
import desRouter from "./destination.route.js"
import createError from "http-errors";
const router = express.Router();

router.use('/auth', authRouter);
router.use('/destinations', desRouter);

// Handle 404 (if not matched any router)
router.use((req, res, next) =>{
    next(createError.NotFound());
});
export default router;
