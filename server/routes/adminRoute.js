import express from "express";
import { adminLogin, getAllDashboard, } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();


adminRouter.post('/login', adminLogin)
adminRouter.get('/dashboard',adminAuth,  getAllDashboard)

export default adminRouter;