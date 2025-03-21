import * as Yup from "yup";

export const ProductSchema = Yup.object({
  sku: Yup.string().nullable().required("SKU is required"),
  barcode: Yup.string().nullable().required("Barcode is required"),
  name: Yup.string().nullable().required("Product name is required"),
  description: Yup.string().nullable(),
  unitOfMeasurement: Yup.string()
    .oneOf(["PCS", "PKT", "CTN", "OTR"], "Select a valid OUM")
    .required("OUM is required"),
  price: Yup.number("Price must be a number")
    .required("Price is required")
    .min(0, "Price must not be a negative value")
    .typeError("Price must be a number"),
  quantity: Yup.number("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must not be a negative value")
    .integer("Quantity must be a whole number")
    .typeError("Quantity must be a number"),
});
