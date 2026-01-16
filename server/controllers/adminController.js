import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Service from "../models/Service.js";
import Booking from "../models/Booking.js";
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All field are required",
      });
    }
    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      success: true,
      message: "admin login successfully",
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "inernal server error in admin ",
    });
  }
};




export const getAllDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const serviceCount = await Service.countDocuments();
    const totalBooking = await Booking.countDocuments();
    const pendingBooking = await Booking.countDocuments({ status: "Pending" });
    const totalServices = await Service.findOne();

    return res.json({
      success: true,
      user: userCount,
      service: serviceCount,
      allBooking: totalBooking,
      pendingBooking,
      totalServices
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in admin",
    });
  }
};
