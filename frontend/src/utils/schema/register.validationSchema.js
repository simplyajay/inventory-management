import * as Yup from "yup";

export const initialValues = {
  firstname: "",
  middlename: "",
  lastname: "",
  email: "",
  contact: "",
  username: "",
  password: "",
  confirmPassword: "",
  accountType: "Individual",
  organization: "",
};

export const validationSchemaStep1 = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(2, "First name should be atleast 2 characters"),
  middlename: Yup.string().test(
    "is-min-length",
    "Middle name should be at least 2 characters",
    (value) => {
      // If the value is empty, it should be valid (no error)
      // If the value is not empty, check the length
      return value === "" || value.length >= 2;
    }
  ),

  lastname: Yup.string()
    .required("Last name is required")
    .min(2, "Last name should be atleast 2 characters"),
});

export const validationSchemaStep2 = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email address"),
  contact: Yup.string()
    .matches(/^\d*$/, "Enter a valid mobile number") // Regex to ensure only digits
    .test("is-min-length", "Mobile Number should be between 10 to 12 digits", (value) => {
      return value === "" || (value.length >= 10 && value.length <= 12);
    }),
  accountType: Yup.string().required(),
  organization: Yup.string().when("accountType", {
    is: "Organization",
    then: () =>
      Yup.string()
        .required("Organization name is required")
        .min(2, "Organization name should be atleast 2 characters"),
    otherwise: () => Yup.string().notRequired(),
  }),
});

export const validationSchemaStep3 = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your username")
    .min(4, "Username should be atleast 4 characters.")
    .matches(/^[a-zA-Z0-9]*$/, "Username should only contain letters and numbers")
    .matches(/[a-zA-Z]/, "Username cannot be all numbers"),

  password: Yup.string()
    .required("Please enter your password")
    .min(8, "Password must be atleast 8 characters"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const getValidationSchema = (step) => {
  return step === 1
    ? validationSchemaStep1
    : step === 2
    ? validationSchemaStep2
    : validationSchemaStep3;
};

export const loginSchema = Yup.object({
  username: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});
