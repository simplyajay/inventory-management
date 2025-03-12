import express from "express";

import {
  createSupplier,
  findSupplier,
  getAllSuppliers,
  updateSupplier,
  deleteSupplier,
} from "../controller/supplier.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const supplierRouter = express.Router();

supplierRouter.post("/api/suppliers/add", verifyToken, createSupplier);
supplierRouter.get("/api/suppliers/:id", verifyToken, findSupplier);
supplierRouter.get("/api/suppliers", verifyToken, getAllSuppliers);
supplierRouter.put("/api/suppliers/update/:id", verifyToken, updateSupplier);
supplierRouter.delete("/api/suppliers/delete/:id", verifyToken, deleteSupplier);

export default supplierRouter;
