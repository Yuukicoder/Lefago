export const authorizeRoles = (...roles) =>  {
    return (req, res, next)  =>{
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: "Unauthorize"
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Forbidden"
            })
        }
        next();
    }
}