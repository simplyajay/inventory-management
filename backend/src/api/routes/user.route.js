import express from "express";
import { createUser, getAllUsers } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/api/register", createUser);
userRouter.get("/api/users", getAllUsers);

export default userRouter;
