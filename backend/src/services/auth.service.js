import User from "../models/index.js";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwt.js"
import createHttpError from "http-errors";

export const Register = async ({fullname, email, password, role}) =>{
    const existed = await User.findOne({email});
    if(existed) 
        {
            throw createHttpError(400,"Email already existed!");
        }
    const hash_password = await bcrypt.hash(password,10);
    const newUser = await User.create({
        fullname: fullname,
        email: email,
        password: hash_password,
        role: role || "user",
    })

    return newUser; 
}
export const Login = async({email, password}) =>{
    const user = await User.findOne({email});
    if(!user) throw createHttpError(401,"Invalid user");
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw createHttpError(401,"Password is not matched");
    // lưu token vào db
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log("Token" + refreshToken);
    user.refreshToken = refreshToken;
    await user.save();
    return {user, accessToken, refreshToken};
} 
// cấp lại accessToken mới khi hết hạn
export const RefreshToken = async (token)=>{
    if(!token) throw createHttpError(401,"No refresh token");
    //  check refreshToken client có trùng vs refreshToken của server ko?
    const payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
    console.log(process.env.JWT_REFRESH_SECRET);
    console.log("payload", payload);
    if(!payload) throw createHttpError(401,"Invalid refresh token");
    const user = await User.findById(payload.id);
    console.error("User:",user._id);
    if(!user || user.refreshToken !== token)
        throw new Error("Invalid refresh token");
    // nếu tồn lại refreshToken thì trả AccessToken mới cho client
    const newAccessToken = generateAccessToken(user);
    return {accessToken : newAccessToken};
}

export const Logout = async(userId) =>{
    await User.findByIdAndUpdate(userId,{refreshToken: null});
}