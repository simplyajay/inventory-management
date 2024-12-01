import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/api/register", createUser);
userRouter.get("/api/users", verifyToken, getAllUsers);
userRouter.get("/api/user", verifyToken, getUser);

export default userRouter;
