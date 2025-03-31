"use client";
import React from "react";
//import Form from "../components/Form";
import Form from "../v2/Form2";

const RegistrationPage2 = ({ params }) => {
  const { step } = params;

  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <div className=" w-[350px] max-w-[400px]">
        <Form />
      </div>
    </div>
  );
};

export default RegistrationPage2;
