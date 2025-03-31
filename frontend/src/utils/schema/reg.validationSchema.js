import * as Yup from "yup";

const individualValues = {
  firstname: "",
  middlename: "",
  lastname: "",
  username: "",
  email: "",
  contact: "",
  password: "",
  confirmPassword: "",
};

const organizationValues = {
  companyname: "",
  companyemail: "",
  companyphone: "",
};

export const getInitialValues = (type) => {
  return type === "organization"
    ? { ...organizationValues, ...individualValues }
    : { ...individualValues };
};

export const organizationSchema = Yup.object().shape({
  companyname: Yup.string().required("Company name is required"),
  email: Yup.string().required("Company email is required"),
  phone: Yup.string()
    .matches(/^\d*$/, "Enter a valid mobile number") // Regex to ensure only digits
    .test("is-min-length", "Mobile Number should be between 10 to 12 digits", (value) => {
      return value === "" || (value.length >= 10 && value.length <= 12);
    }),
});

export const detailSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  middlename: Yup.string().optional(),
  lastname: Yup.string().required(" Last name is required"),
});

export const usernameSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(4, "Username should be atleast 4 characters.")
    .matches(/^[a-zA-Z0-9]*$/, "Username should only contain letters and numbers")
    .matches(/[a-zA-Z]/, "Username cannot be all numbers"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().optional(),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const getValidationSchema = (step) => {
  switch (step) {
    case "organization":
      return organizationSchema;
    case "details":
      return detailSchema;
    case "username":
      return usernameSchema;
    default:
      return passwordSchema;
  }
};

export const loginSchema = Yup.object({
  username: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});
