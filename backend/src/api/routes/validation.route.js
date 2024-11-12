import express from "express";
import {
  validateOnRegister,
  authenticateLogin,
} from "../controller/validation.controller.js";

const validationRouter = express.Router();

validationRouter.post("/api/register", (req, res) => {
  const { target } = req.body;
  validateOnRegister(target, res);
});

validationRouter.post("/api/login", (req, res) => {
  const { identifier, password } = req.body;
  authenticateLogin(identifier, password, res);
});

export default validationRouter;
