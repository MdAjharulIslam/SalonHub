import express from "express"
import { addService, deleteService, getAllService, getSingleService, toggleService } from "../controllers/serviceController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";


const serviceRouter = express.Router();

serviceRouter.post('/add',adminAuth,upload.single("image"), addService);
serviceRouter.get('/getAllService',  getAllService)
serviceRouter.get('/:id', getSingleService)
serviceRouter.post('/toggle/:id',adminAuth, toggleService)
serviceRouter.post('/delete/:id',adminAuth, deleteService)

export default serviceRouter;