import express from "express"
import { getUserById, login, register } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/:id', getUserById)
export default userRouter;