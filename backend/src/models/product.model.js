import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    _orgId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sku: { type: Number, required: true, default: 1 },
    name: { type: String, required: true },
    barcode: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    unitOfMeasurement: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
