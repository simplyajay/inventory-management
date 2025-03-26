"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormComponents from "./FormComponents";
import FormButtons from "../form-components/FormButtons";

const BasicForm = ({
  values,
  onSubmit,
  cancelProps,
  submitProps,
  components,
  validationSchema,
  labels,
  loading,
}) => {
  const { register, handleSubmit, formState, clearErrors, reset, setError } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
    defaultValues: values,
    shouldFocusError: false,
  });
  const { errors } = formState;

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  return (
    <div className="h-full">
      <form
        name="basic-form"
        onSubmit={handleSubmit((values) => {
          onSubmit({ values, setError, clearErrors, reset });
        })}
        className="h-full flex flex-col"
      >
        <FormComponents
          components={components}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          labels={labels}
          loading={loading}
        />
        <FormButtons onCancelProps={cancelProps} onSubmitProps={submitProps} />
      </form>
    </div>
  );
};

export default BasicForm;
