import * as Yup from "yup";

export const initialValues = {
  name: "",
  barcode: "",
  description: "",
  price: 0,
  quantity: 0,
};

export const validationSchema = Yup.object({
  barcode: Yup.string().required("Barcode is required"),
  name: Yup.string().required("Product name is required"),
  description: Yup.string(),
  price: Yup.number("Price should be an integer").required("Price is required"),
  quantity: Yup.number("Quantity should be an integer").required(
    "Quantity is required"
  ),
});
