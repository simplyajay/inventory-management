import express from "express";

import {
  createDocument,
  getAllDocuments,
  findDocument,
  updateDocument,
  deleteDocument,
} from "../controller/document.controller.js";

const documentRouter = express.Router();

documentRouter.post("/api/documents", createDocument);
documentRouter.get("/api/documents/:id", findDocument);
documentRouter.get("/api/documents", getAllDocuments);
documentRouter.put("/api/documents/:id", updateDocument);
documentRouter.delete("/api/documents/:id", deleteDocument);

export default documentRouter;
