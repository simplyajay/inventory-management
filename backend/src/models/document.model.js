import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema(
  {
    _orgId: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    product: { type: String, required: true },
    supplier: { type: String, required: true },
    quantity: { type: Number, required: true },
    netCost: { type: Number, required: true },
    vatType: { type: String, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Documents = mongoose.model("Document", DocumentSchema);
export default Documents;
