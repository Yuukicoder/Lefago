import * as authService from "../services/auth.service.js";
// Register
export const Register = async (req, res) =>{
    const {email, password, role} = req.body;
    try {
        const user = await authService.Register({email, password, role});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
// Login
export const Login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await authService.Login({email, password});
        res.status(201).json("Login thành công");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
// RefreshToken
export const RefreshToken = async(req, res) =>{
    const {refreshToken} = req.body;
    try {
        const newAccessToken = await authService.RefreshToken({refreshToken});
        res.status(201).json(newAccessToken);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
// Logout
export const Logout = async(req, res) =>{
    try {
        await authService.Logout(req.user.userId);
        res.status(201).json("Logged out!");
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}