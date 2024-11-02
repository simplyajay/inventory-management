import express from "express";
import {
  validateOnRegister,
  validateOnLogin,
} from "../controller/validation.controller.js";

const validationRouter = express.Router();

validationRouter.post("/api/validate/reg/email", (req, res) => {
  const { email } = req.body;
  validateOnRegister("email", email, res);
});

validationRouter.post("/api/validate/reg/username", (req, res) => {
  const { username } = req.body;
  validateOnRegister("username", username, res);
});

validationRouter.post("/api/validate/login/username", (req, res) => {
  const { username, password } = req.body;
  validateOnLogin("username", username, password, res);
});

validationRouter.post("/api/validate/login/email", (req, res) => {
  const { email, password } = req.body;
  validateOnLogin("email", email, password, res);
});

export default validationRouter;
