import * as Yup from "yup";

export const BusinessEntitySchema = Yup.object({
  name: Yup.string().nullable().required("Company name is required"),
  trn: Yup.string().nullable().required("TRN is required"),
  description: Yup.string().nullable(),
  note: Yup.string().nullable(),
  website: Yup.string().nullable(),
  address: Yup.object().shape({
    street1: Yup.string().nullable(),
    street2: Yup.string().nullable(),
    city: Yup.string().nullable().required("This Field is required"),
    state: Yup.string().nullable().required("This Field is required"),
    country: Yup.string().notOneOf(["default"], "Select a valid country"),
    zip: Yup.string().required("Zip Code is required"),
  }),
  contact: Yup.object().shape({
    title: Yup.string().nullable(),
    firstname: Yup.string().nullable(),
    middlename: Yup.string().nullable(),
    lastname: Yup.string().nullable(),
    phone: Yup.string().nullable(),
    email: Yup.string().nullable().required("Email address is required"),
  }),
  creditlimit: Yup.number("Should be a valid number").default(0),
  status: Yup.string().oneOf(["active", "inactive"], "Invalid Status"),
});
