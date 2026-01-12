import express from "express"
import { addBooking, cancelBooking, getAllBooking, getBookingByUser, manageBooking } from "../controllers/bookingController.js";
import userAuth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js"
const bookingRouter = express.Router();


bookingRouter.post('/:serviceId/add',userAuth, addBooking)
bookingRouter.get('/getAllBooking', adminAuth, getAllBooking)
bookingRouter.get('/myBooking', userAuth, getBookingByUser)
bookingRouter.post('/status/:bookingId', adminAuth, manageBooking)
bookingRouter.post('/:bookingId/cancel', userAuth, cancelBooking)

export default bookingRouter;