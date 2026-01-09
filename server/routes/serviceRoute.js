import express from "express"
import { addService } from "../controllers/serviceController.js";
import upload from "../middleware/multer.js";


const serviceRouter = express.Router();

serviceRouter.post('/add',upload.single("image"), addService)

export default serviceRouter;