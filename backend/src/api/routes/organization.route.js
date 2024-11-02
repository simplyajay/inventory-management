import express from "express";
import {
  createOrganization,
  findOrganization,
  getAllOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controller/organization.controller.js";

const organizationRouter = express.Router();

organizationRouter.post("/api/organizations", createOrganization);
organizationRouter.get("/api/organizations/:id", findOrganization);
organizationRouter.get("/api/organizations", getAllOrganization);
organizationRouter.put("/api/organization/:id", updateOrganization);
organizationRouter.delete("/api/organizations/:id", deleteOrganization);

export default organizationRouter;
