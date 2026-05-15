import express from "express";
import {Register, Login, RefreshToken} from "../controllers/auth.controller.js"
import { registerSchema, loginSchema } from "../../validators/auth-validator.js";
import {validate} from '../middlewares/validate.middleware.js';
const router = express.Router();

router.post("/register",validate(registerSchema), Register);
router.post("/login",validate(loginSchema), Login);
router.post("/refreshToken", RefreshToken);

export default router;