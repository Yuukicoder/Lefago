import * as authService from "../services/auth.service.js";
// Register
export const Register = async (req, res, next) =>{
    const {fullname, email, password, role} = req.body;
    try {
        const user = await authService.Register({fullname, email, password, role});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}
// Login
export const Login = async (req, res, next) =>{
    const {email, password} = req.body;
    try {
        const user = await authService.Login({email, password});
        res.status(200).json("Login thành công");
    } catch (error) {
        next(error);
    }
}
// RefreshToken
export const RefreshToken = async(req, res) =>{
    const {refreshToken} = req.body;
    try {
        const newAccessToken = await authService.RefreshToken(refreshToken);
        res.status(201).json(newAccessToken);
    } catch (error) {
        next(error);
    }
}
// Logout
export const Logout = async(req, res) =>{
    try {
        await authService.Logout(req.user.userId);
        res.status(201).json("Logged out!");
    } catch (error) {
        next(error);
    }
}