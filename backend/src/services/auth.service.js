import User from "../models/index.js";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwt.js"

export const Register = async ({email, password, role}) =>{
    const existed = await User.findOne({email});
    if(existed) throw new Error("Email already existed!");
    const hash_password = await bcrypt.hash(password,10);
    const newUser = await User.create({
        email: email,
        password: hash_password,
        role: role || "user",
    })

    return newUser; 
}
export const Login = async({email, password}) =>{
    const user = await User.findOne({email});
    if(!user) throw new Error("Invalid user");
    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Password is not matched");
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
    if(!token) throw new Error("No refresh token");
    //  check refreshToken client có trùng vs refreshToken của server ko?
    const payload = verifyToken(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.userId);
    if(!user || user.refreshToken !== token)
        throw new Error("Invalid refresh token");
    // nếu tồn lại refreshToken thì trả AccessToken mới cho client
    const newAccessToken = generateAccessToken(user);
    return {accessToken : newAccessToken};
}

export const Logout = async(userId) =>{
    await User.findByIdAndUpdate(userId,{refreshToken: null});
}