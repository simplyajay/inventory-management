import * as Yup from "yup";

const initialValues = {
  sku: "",
  name: "",
  barcode: "",
  description: "",
  price: 0,
  unitOfMeasurement: "PC",
  quantity: 0,
};

export const getInitialValues = (sku, value) => {
  if (sku) {
    initialValues[sku] = value;
  }

  return initialValues;
};

export const validationSchema = Yup.object({
  sku: Yup.string(),
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
