import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import redis from "../config/redis.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized, token is missing"
            })
        }
        
        const isTokenValid = await redis.get(token)

        if(isTokenValid){
            return res.status(405).json({
                message: "Token is blacklisted, please login again"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decodedToken._id).select("-password")
        
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })

    }
}