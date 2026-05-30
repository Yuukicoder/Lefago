import express from "express";
import {Register, Login, RefreshToken, Logout} from "../controllers/auth.controller.js"
import { registerSchema, loginSchema } from "../../validators/auth-validator.js";
import {validate} from '../middlewares/validate.middleware.js';
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register",validate(registerSchema), Register);
router.post("/login",validate(loginSchema), Login);
router.post("/refreshToken", RefreshToken);
router.post("/logout", authMiddleware, Logout);
export default router;