import jwt from "jsonwebtoken";
console.log("Access " + process.env.JWT_ACCESS_SECRET);
console.log("Refresh " + process.env.JWT_REFRESH_SECRET);
export const generateAccessToken = (user) =>{
    return jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,{
        expiresIn: "15m",
    })
}

export const generateRefreshToken = (user) =>{
    return jwt.sign({
        id: user.id,
    },
    process.env.JWT_REFRESH_SECRET,{
        expiresIn: "7d",
    })
}
export const verifyToken = (token, secret) =>{
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;        
    }
}

export const decodeToken = (token) =>{
    try {
        return jwt.decode(token);
    } catch (error) {
        return null;
    }
}