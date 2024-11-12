import express from "express";
import {
  createOrganization,
  findOrganization,
  getAllOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controller/organization.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const organizationRouter = express.Router();

organizationRouter.post("/api/organizations", verifyToken, createOrganization);
organizationRouter.get("/api/organizations/:id", verifyToken, findOrganization);
organizationRouter.get("/api/organizations", verifyToken, getAllOrganization);
organizationRouter.put(
  "/api/organization/:id",
  verifyToken,
  updateOrganization
);
organizationRouter.delete(
  "/api/organizations/:id",
  verifyToken,
  deleteOrganization
);

export default organizationRouter;
