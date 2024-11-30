import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  hasOrganization,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/api/register", createUser);
userRouter.get("/api/users", verifyToken, getAllUsers);
userRouter.get("/api/user", verifyToken, getUser);
userRouter.get("/api/organization-id", verifyToken, hasOrganization);

export default userRouter;
