import express from "express";
import jwt from "jsonwebtoken"

const adminAuth = async(req, res, next)=>{
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.json({
                success: false,
                message: "no auth found in header"
            })
        }

        const token = authHeader.split(" ")[1];

        const decode =  jwt.verify(token, process.env.JWT_SECRET);

        if(decode.email !== process.env.ADMIN_EMAIL){
            return res.json({
                success:false,
                message:"Admin access only"
            })
        }
        req.email = decode.email;
        next();
    } catch (error) {
        return res.json({
            success:false,
            message:"internal server error in admin auth"
        })
    }
}
export default adminAuth;