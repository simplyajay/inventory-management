import * as Yup from "yup";

export const BusinessEntitySchema = Yup.object({
  name: Yup.string().required("Company name is required"),
  trn: Yup.string().required("TRN is required"),
  description: Yup.string(),
  note: Yup.string(),
  website: Yup.string(),
  street1: Yup.string(),
  street2: Yup.string(),
  city: Yup.string().required("This field is required"),
  state: Yup.string().required("This field is required"),
  country: Yup.string().required("This field is required"),
  zipcode: Yup.string().required("Zip Code is required"),
  contactTitle: Yup.string(),
  firstname: Yup.string(),
  middlename: Yup.string(),
  lastname: Yup.string(),
  phone: Yup.string(),
  email: Yup.string(),
  creditLimit: Yup.number("Should be a valid number").default(0),
  status: Yup.string().oneOf(["Active", "Inactive"], "Invalid Status"),
});
