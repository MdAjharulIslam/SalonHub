import express from "express"
import { addService, deleteService, getAllService, getSingleService, toggleService } from "../controllers/serviceController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";


const serviceRouter = express.Router();

serviceRouter.post('/add',upload.single("image"), addService);
serviceRouter.get('/getAllService',  getAllService)
serviceRouter.get('/:id', getSingleService)
serviceRouter.post('/toggle/:id', toggleService)
serviceRouter.post('/delete/:id', deleteService)

export default serviceRouter;