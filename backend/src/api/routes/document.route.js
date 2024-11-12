import express from "express";

import {
  createDocument,
  getAllDocuments,
  findDocument,
  updateDocument,
  deleteDocument,
} from "../controller/document.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const documentRouter = express.Router();

documentRouter.post("/api/documents", verifyToken, createDocument);
documentRouter.get("/api/documents/:id", verifyToken, findDocument);
documentRouter.get("/api/documents", verifyToken, getAllDocuments);
documentRouter.put("/api/documents/:id", verifyToken, updateDocument);
documentRouter.delete("/api/documents/:id", verifyToken, deleteDocument);

export default documentRouter;
