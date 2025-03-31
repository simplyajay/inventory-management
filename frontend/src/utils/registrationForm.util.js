import React from "react";
import { ButtonConfirmBlueLight } from "@/components/button/CustomButtons";

export const steps = [
  { key: "type", title: "Account Type" },
  { key: "organization", title: "Organization Details" },
  { key: "details", title: "Account Details" },
  { key: "username", title: "Account Details " },
  { key: "password", title: "Security" },
];
export const formInputs = {
  organization: {
    fields: [
      { name: "companyname", placeholder: "Company Name" },
      { name: "companyemail", placeholder: "Company Email" },
      { name: "companyphone", placeholder: "Company Phone (Optional)" },
    ],
  },
  details: {
    fields: [
      { name: "firstname", placeholder: "First Name" },
      { name: "middlename", placeholder: "Middle Name (Optional)" },
      { name: "lastname", placeholder: "Last Name" },
    ],
  },
  username: {
    fields: [
      { name: "username", placeholder: "Username" },
      { name: "email", placeholder: "Email" },
      { name: "phone", placeholder: "Phone (Optional)" },
    ],
  },
  password: {
    fields: [
      { name: "password", placeholder: "Password" },
      { name: "confirmpassword", placeholder: "Confirm Password" },
    ],
  },
};

export const RenderCustomRadio = ({ onClick }) => {
  return (
    <div className="flex flex-col gap-2 p-2 border border-red-500">
      <ButtonConfirmBlueLight onClick={() => onClick("individual")}>
        Individual
      </ButtonConfirmBlueLight>
      <ButtonConfirmBlueLight onClick={() => onClick("organization")}>
        Organization
      </ButtonConfirmBlueLight>
    </div>
  );
};
