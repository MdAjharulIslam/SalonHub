import express from "express"
import { getUserById, login, register } from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/:id',userAuth, getUserById)
export default userRouter;