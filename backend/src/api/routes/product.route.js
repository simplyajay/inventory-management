import express from "express";
import {
  createProduct,
  findProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";

const productRouter = express.Router();

productRouter.post("/api/products", createProduct);
productRouter.get("/api/products/:id", findProduct);
productRouter.get("/api/products", getAllProducts);
productRouter.put("/api/products/:id", updateProduct);
productRouter.delete("/api/products/:id", deleteProduct);

export default productRouter;
