import express from "express";
import jwt from "jsonwebtoken"
import User from "../models/User.js";
export const adminLogin = async(req, res)=>{
    try {
        const { email,  password} = req.body;
        if(!email || !password){
            return res.json({
                success:false,
                message:"All field are required"
            })
        }
        if(email !=process.env.ADMIN_EMAIL || password !=process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "7d"} )

        return res.json({
            success:true,
            message:"admin login successfully",
            token
        })

    } catch (error) {
        return res.json({
            success:false,
            message:"inernal server error in admin "
        })
    }
}

export const getAllUser = async (req, res)=>{
    try {
        const allUser = await User.find().select("-password")

        if(allUser.length === 0){
            return res.json({
                success:false,
                message:"no user found"
            })
        }


        return res.json({
            success:true,
            count:allUser.length,
            allUser
        })
    } catch (error) {
          return res.json({
            success:false,
            message:"inernal server error in admin "
        })
    }
}