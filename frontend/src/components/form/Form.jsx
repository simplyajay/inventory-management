"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/schema/product.validationSchema";
import FormInputs from "@/components/form/FormInputs";
import FormButtons from "@/components/form/FormButtons";

const Form = ({ values, onSubmit, cancelProps, submitProps, inputs }) => {
  const { register, handleSubmit, formState, clearErrors, reset, setValue, setError } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: values,
    shouldFocusError: false,
  });
  const { errors } = formState;

  useEffect(() => {
    reset(values);
  }, [values]);

  return (
    <div className="h-full">
      <form
        name="add-product-form"
        onSubmit={handleSubmit((values) => {
          onSubmit({ values, setError, clearErrors, reset });
        })}
        className="h-full flex flex-col"
      >
        <FormInputs inputs={inputs} register={register} errors={errors} clearErrors={clearErrors} />
        <FormButtons onCancelProps={cancelProps} onSubmitProps={submitProps} />
      </form>
    </div>
  );
};

export default Form;
