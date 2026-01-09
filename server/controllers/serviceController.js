import express from "express";
import fs from "fs";
import getImageKit from "../config/imagekit.js";
import Service from "../models/Service.js";

export const addService = async (req, res) => {
  try {
    const { name, price, duration } = req.body;
    if (!name || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    
    const image = req.file;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    
    
    const imagekit = getImageKit();
    
    const imageBuffer = fs.readFileSync(image.path);

    const uploadImage = await imagekit.upload({
      file: imageBuffer,
      fileName: image.originalname,
      folder: "/salon",
    });

 
    const optimizedImageUrl = imagekit.url({
      path: uploadImage.filePath,
      transformation: [
        { width: "1280" }, 
        { quality: "auto" }, 
        { format: "webp" },
      ],
    });

    
    fs.unlinkSync(image.path);

    await Service.create({
      name,
      price,
      duration,
      image: optimizedImageUrl,
    });

    return res.status(201).json({
      success: true,
      name,
      price,
      duration,
      image: optimizedImageUrl,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};