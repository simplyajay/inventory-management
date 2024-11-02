import mongoose from "mongoose";

const SupplierSchema = mongoose.Schema(
  {
    _orgId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, default: "" },
    image: { type: String, required: false },
    documents: { type: String },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
