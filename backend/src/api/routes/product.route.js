import express from "express";
import {
  createProduct,
  findProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const productRouter = express.Router();

productRouter.post("/api/products", verifyToken, createProduct);
productRouter.get("/api/stocks/:id", verifyToken, findProduct);
productRouter.get("/api/stocks", verifyToken, getAllProducts);
productRouter.put("/api/products/:id", verifyToken, updateProduct);
productRouter.delete("/api/products/:id", verifyToken, deleteProduct);

export default productRouter;
