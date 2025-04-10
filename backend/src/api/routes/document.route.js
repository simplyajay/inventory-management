import express from "express";

import {
  createDocument,
  getAllDocuments,
  findDocument,
  updateDocument,
  deleteDocument,
  getDocumentsByEntity,
} from "../controller/document.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const documentRouter = express.Router();

documentRouter.post("/api/documents/add", verifyToken, createDocument);
documentRouter.get("/api/documents/:id", verifyToken, findDocument);
documentRouter.get("/api/documents", verifyToken, getAllDocuments);
documentRouter.get("/api/documents/entity/:entityId", verifyToken, getDocumentsByEntity);
documentRouter.put("/api/documents/update/:id", verifyToken, updateDocument);
documentRouter.delete("/api/documents/delete/:id", verifyToken, deleteDocument);

export default documentRouter;
