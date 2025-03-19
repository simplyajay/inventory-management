"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInputs from "./FormInputs";
import FormButtons from "../form-components/FormButtons";

const BasicForm = ({
  values,
  onSubmit,
  cancelProps,
  submitProps,
  inputs,
  validationSchema,
  confirmOnly,
  labels,
}) => {
  const { register, handleSubmit, formState, clearErrors, reset, setError } = useForm({
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
        name="basic-form"
        onSubmit={handleSubmit((values) => {
          onSubmit({ values, setError, clearErrors, reset });
        })}
        className="h-full flex flex-col"
      >
        <FormInputs
          inputs={inputs}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          labels={labels}
        />
        <FormButtons
          onCancelProps={cancelProps}
          onSubmitProps={submitProps}
          confirmOnly={confirmOnly}
        />
      </form>
    </div>
  );
};

export default BasicForm;
