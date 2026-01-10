import express from "express";
import { adminLogin, getAllUser } from "../controllers/adminController.js";

const adminRouter = express.Router();


adminRouter.post('/login', adminLogin)
adminRouter.get('/alluser',getAllUser)

export default adminRouter;