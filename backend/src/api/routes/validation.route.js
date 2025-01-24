import express from "express";
import {
  validateIdentifierOnRegister,
  authenticateLogin,
  logOut,
} from "../controller/validation.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const validationRouter = express.Router();

validationRouter.post("/api/validate-registration", (req, res) => {
  const { target } = req.body;
  validateIdentifierOnRegister(target, res);
});

validationRouter.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;
  authenticateLogin(identifier, password, res);
});

validationRouter.post("/api/logout", verifyToken, logOut);

export default validationRouter;
