import mongoose, { Schema } from "mongoose";

const SupplierSchema = mongoose.Schema(
  {
    _orgId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, default: "" },
    image: { type: String, required: false },
    documents: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;
