import jwt from '../utils/jwt.js'
import createError from 'http-errors'
export const authMiddleware = async (req, res, next) => {
  try {
    // logic here
    const authHeader = req.header.authorization || "";
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
      return res.status(401).json({
        success: false,
        message: "Unauthorize"
      })
    }
    const decode = jwt.verify(req.token, process.env.JWT_REFRESH_SECRET);
    console.log("authMiddleware_decode:",decode);
    decode = req.user;
    next();
  } catch (error) {
    next(createError(401, "Invalid or expired token"));
  }
};  