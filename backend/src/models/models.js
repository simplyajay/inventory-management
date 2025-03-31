import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    _orgId: { type: Schema.Types.ObjectId },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    image: { type: String },
    role: { type: String, enum: ["admin", "manager", "staff"], required: true },
  },
  { timestamps: true }
);

const organizationSchema = new Schema(
  {
    name: { type: String, required: true },
    trn: { type: String },
    address: {
      street1: { type: String },
      street2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    phone: { type: String },
    email: { type: String, required: true },
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

const BusinessEntitySchema = new Schema(
  {
    _orgId: { type: String, required: true },
    type: { type: String, enum: ["customer", "supplier"], required: true },
    name: { type: String, required: true },
    trn: { type: String },
    description: { type: String },
    note: { type: String },
    website: { type: String },
    address: {
      street1: { type: String },
      street2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
    },
    contact: {
      title: { type: String },
      firstname: { type: String },
      middlename: { type: String },
      lastname: { type: String },
      phone: { type: String },
      email: { type: String },
    },
    creditlimit: { type: Number },
    openbalance: { type: Number, default: 0 },
    totaloverdue: { type: Number, default: 0 },
    status: { type: String, enum: ["inactive", "active"], required: true },
    image: { type: String },
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
    _entityId: { type: Schema.Types.ObjectId, required: true }, //supplier or customer
    _documentId: { type: String, required: true },
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
    vatRate: { type: Number, required: true }, // vat rate in percent
    vatType: { type: String, enum: ["inclusive", "exclusive"], required: true }, // inclusive, exclusive, or other vat types
    costBeforeVat: { type: Number, required: true },
    costAfterVat: { type: Number, required: true },
    taxWithHeldAmount: { type: Number },
    withHoldingTaxRate: { type: Number }, // in percent
    withHoldingTaxAmount: { type: Number },
    note: { type: String },
    memorandum: { type: String },
    documentStatus: {
      type: String,
      enum: ["complete", "pending", "cancelled", "rejected", "accepted"],
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
export const BusinessEntity = mongoose.model("BusinessEntity", BusinessEntitySchema);
export const Document = mongoose.model("Document", DocumentSchema);
