import express from "express";
import {
  createProduct,
  findProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  validateSku,
} from "../controller/product.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const productRouter = express.Router();

productRouter.post("/api/stocks/add", verifyToken, createProduct);
productRouter.get("/api/stocks/find/:id", verifyToken, findProduct);
productRouter.get("/api/stocks", verifyToken, getAllProducts);
productRouter.put("/api/stocks/update/:id", verifyToken, updateProduct);
productRouter.delete("/api/stocks/delete/:id", verifyToken, deleteProduct);

productRouter.post("/api/stocks/validate-sku", verifyToken, validateSku);

export default productRouter;
