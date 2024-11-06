"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema, initialValues } from "./validationSchema";

const fieldClass =
  "p-2 text-sm rounded-lg focus:outline-none w-full focus:ring-2 focus:ring-blue-100 border border-gray-300";

const ProductForm = () => {
  const { register, handleSubmit, formState, clearErrors, setError } = useForm({
    mode: "onBlur", //validate on blur
    resolver: yupResolver(validationSchema), // use Yup schema for validation
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const { errors } = formState;

  const onSubmit = async (values) => {};

  return (
    <form name="add-product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full flex flex-col items-center justify-around py-2 px-5 gap-5">
        <input
          type="text"
          className={fieldClass}
          placeholder="Product barcode"
        />
        <input type="text" className={fieldClass} placeholder="Product name" />
        <textarea
          name=""
          id=""
          placeholder="Enter product descrption."
          className={fieldClass}
        ></textarea>
        <input
          type="text"
          className={fieldClass}
          placeholder="Product barcode"
        />
        <input type="text" className={fieldClass} placeholder="Product name" />
      </div>
    </form>
  );
};

export default ProductForm;
