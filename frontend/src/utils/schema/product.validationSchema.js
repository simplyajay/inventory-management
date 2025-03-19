import * as Yup from "yup";

export const ProductSchema = Yup.object({
  sku: Yup.string().required("SKU is required"),
  barcode: Yup.string().required("Barcode is required"),
  name: Yup.string().required("Product name is required"),
  description: Yup.string(),
  unitOfMeasurement: Yup.string()
    .oneOf(["PCS", "PKT", "CTN", "OTR"], "Select a valid OUM")
    .required("OUM is required"),
  price: Yup.number("Price should be an integer")
    .required("Price is required")
    .min(0, "Price must not be a negative value")
    .typeError("Price must be a number"),
  quantity: Yup.number("Quantity should be an integer")
    .required("Quantity is required")
    .min(0, "Quantity must not be a negative value")
    .integer("Quantity must be a whole number")
    .typeError("Quantity must be a number"),
});
