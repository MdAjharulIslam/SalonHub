import express from "express";
import { adminLogin, getAllUser } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();


adminRouter.post('/login', adminLogin)
adminRouter.get('/alluser', adminAuth, getAllUser)

export default adminRouter;