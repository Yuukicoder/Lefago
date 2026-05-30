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
        res.status(200).json(
            {
                success: true,
                message: "Login successfully!",
                data: user
            }
        );
    } catch (error) {
        next(error);
    }
}
// RefreshToken
export const RefreshToken = async(req, res, next) =>{
    const {refreshToken} = req.body;
    try {
        const newAccessToken = await authService.RefreshToken(refreshToken);
        res.status(200).json(newAccessToken);
    } catch (error) {
        next(error);
    }
}
// Logout
export const Logout = async(req, res, next) =>{
    try {
        await authService.Logout(req.user._id);
        res.status(201).json({
            success: true,
            data: "Logged out!"
        });
    } catch (error) {
        next(error);
    }
}