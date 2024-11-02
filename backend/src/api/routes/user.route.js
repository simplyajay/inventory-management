import express from "express";
import {
  createUser,
  findUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/api/users", createUser);
userRouter.get("/api/users/:id", findUser);
userRouter.get("/api/users", getAllUsers);
userRouter.put("/api/user/:id", updateUser);
userRouter.delete("/api/users/:id", deleteUser);

export default userRouter;
