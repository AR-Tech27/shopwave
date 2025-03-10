import express from "express";
import { loginController, registerController } from "../controllers/userController.js";


const userRouter = express.Router();

//http://localhost:8080/api/v1/users/register

userRouter.post("/register",registerController);
userRouter.post("/login",loginController);


export default userRouter;