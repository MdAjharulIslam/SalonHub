import express from "express";
import fs from "fs";
import getImageKit from "../config/imagekit.js";
import Service from "../models/Service.js";
import mongoose from "mongoose";

export const addService = async (req, res) => {
  try {
    const { name, price, duration, category,description } = req.body;
    if (!name || !price || !duration || !description) {
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

    const newService = await Service.create({
      name,
      price,
      duration,
      category,
      description,

      image: optimizedImageUrl,
    });

    return res.status(201).json({
      success: true,
      name,
      price,
      duration,
      category,
      description,
      isAvailable: newService.isAvailable,
      image: optimizedImageUrl,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteService = await Service.findByIdAndDelete(id);
    if (!deleteService) {
      return res.status(404).json({
        success: false,
        message: "Service not find to delete",
      });
    }
    return res.status(200).json({
      success: true,
      message: "service deleted successfully",
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const toggleService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID",
      });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "service is not found",
      });
    }

    service.isAvailable = !service.isAvailable;
    
    // Save without validation since we're only updating one field
    await service.save({ validateModifiedOnly: true });

    return res.status(200).json({
      success: true,
      message: `Service ${
        service.isAvailable ? "Activated" : "Deactivated"
      } Successfully`,
      service,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllService = async (req, res) => {
  try {
    const allService = await Service.find();

    if (!allService || allService.length == 0) {
      return res.status(400).json({
        success: false,
        message: "NO Service Found",
      });
    }

    return res.status(200).json({
      success: true,
      count: allService.length,
      allService,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSingleService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Single id is required",
      });
    }

    const singleService = await Service.findById(id);
    if (!singleService) {
      return res.status(404).json({
        success: false,
        message: "Service Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      singleService,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
