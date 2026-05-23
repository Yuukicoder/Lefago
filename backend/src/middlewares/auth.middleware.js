import {verifyToken} from '../utils/jwt.js'
import createError from 'http-errors'
export const authMiddleware = async (req, res, next) => {
  try {
    // logic here
    const authHeader = req.headers.authorization || "";
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
      return res.status(401).json({
        success: false,
        message: "Unauthorize"
      })
    }
    const token = authHeader.split(" ")[1];
    const decode = verifyToken(token, process.env.JWT_ACCESS_SECRET);
    console.log("authMiddleware_decode:",decode);
    req.user = decode;
    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
};  