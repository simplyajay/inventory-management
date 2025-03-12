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
    trn: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String, default: "" },
    displayImage: { type: String, required: false },
  },
  { timestamps: true }
);

const CustomerSchema = new Schema(
  {
    _orgId: { type: String, required: true },
    name: { type: String, required: true },
    trn: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    address: { type: String, default: "" },
    displayImage: { type: String, required: false },
  },
  { timestamps: true }
);

const DocumentSchema = new Schema(
  {
    _orgId: { type: Schema.Types.ObjectId, required: true },
    type: {
      type: String,
      enum: [
        "purchase_order",
        "sales_order",
        "invoice",
        "bill",
        "return_order",
        "credit_note",
        "quotation",
      ],
      required: true,
    },
    businessEntity: { type: Schema.Types.ObjectId, required: true }, //supplier or customer
    date: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        description: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        unitOfMeasurement: { type: String, required: true },
      },
    ],
    vatAmount: { type: Number, required: true },
    vatRate: { type: Number, required: true }, // vat rate
    vatType: { type: String, enum: ["inclusive", "exclusive"], required: true }, // inclusive, exclusive, or other vat types
    costBeforeVat: { type: Number, required: true },
    costAfterVat: { type: Number, required: true },
    note: { type: String },
    documentStatus: {
      type: String,
      enum: ["complete", "pending", "cancelled", "rejected", "accepted", "not_applicable"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "partially_paid", "overdue", "open", "not_applicable"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
export const Organization = mongoose.model("Organization", organizationSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Supplier = mongoose.model("Supplier", SupplierSchema);
export const Customer = mongoose.model("Customer", CustomerSchema);
export const Document = mongoose.model("Document", DocumentSchema);
