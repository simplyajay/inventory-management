import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    accountType: {
      type: String,
      enum: ["Individual", "Organization"],
      required: true,
    },
    _orgId: {
      type: Schema.Types.ObjectId,
      ref: "organizations", // refers to the collection named 'organizations'
      required: function () {
        return this.accountType === "Organization"; // only required if accountType is Organization
      },
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String },
  },
  { timestamps: true }
);

const organizationSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

const ProductSchema = new Schema(
  {
    _orgId: { type: Schema.Types.ObjectId, required: true },
    sku: { type: String, required: true },
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
const SupplierSchema = new Schema(
  {
    _orgId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, default: "" },
    image: { type: String, required: false },
    documents: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

const DocumentSchema = new Schema(
  {
    _orgId: { type: Schema.Types.ObjectId, required: true },
    documentId: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    productId: { type: String, required: true },
    supplierId: { type: String, required: true },
    netCost: { type: Number, required: true },
    vatType: { type: String, required: true },
    totalCost: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
export const Organization = mongoose.model("Organization", organizationSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Supplier = mongoose.model("Supplier", SupplierSchema);
export const Document = mongoose.model("Document", DocumentSchema);
