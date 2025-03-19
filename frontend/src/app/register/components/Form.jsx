"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { StepOne, StepTwo, StepThree, StepFour } from "./Steps";
import Navigation from "./Navigation";
import {
  getValidationSchema,
  initialValues,
} from "../../../utils/schema/register.validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateOnRegister } from "@/services/api/user/validation";
import { getFetchOptions } from "@/services/options";
import { createOrganization, createUser } from "@/services/api/user/registration";

const Form = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const validationSchema = getValidationSchema(step);
  const router = useRouter();

  // userForm Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    mode: "onBlur", //validate on blur
    resolver: yupResolver(validationSchema), // use Yup schema for validation
    defaultValues: initialValues,
    shouldFocusError: false,
  });

  const validate = async (type, target) => {
    if (target) {
      const fetchOptions = getFetchOptions("POST", { target });
      const isValid = await validateOnRegister(fetchOptions);

      if (!isValid) {
        setError(type, {
          type: "manual",
          message: `This ${type} is already taken.`,
        });
        return false;
      } else {
        clearErrors(type);
      }
      return true;
    }
    return false;
  };

  const handleNext = async (e) => {
    if (step < 4) {
      e.preventDefault();
      const values = getValues();
      setLoading(true);

      const res = await trigger();
      if (!res) {
        setLoading(false);
      }

      if (step === 2) {
        const isValid = await validate("email", values.email);
        if (!isValid && values.email) {
          setLoading(false);
          return;
        }
      } else if (step === 3) {
        const valid = await validate("username", values.username);
        if (!valid && values.username) {
          setLoading(false);
          return;
        }
      }

      if (res) {
        setStep((prev) => prev + 1);
      }
      setLoading(false);
    }
  };
  const handlePrevious = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  const onSubmit = async (values) => {
    setLoading(true);
    const { organization, confirmPassword, ...filteredValues } = values;
    let userData;
    if (values.accountType === "Individual") {
      userData = filteredValues;
    } else {
      const data = await createOrganization({ name: organization, image: "" });
      userData = { ...filteredValues, _orgId: data._orgId };
    }

    const data = await createUser(userData);
    if (data) {
      router.push("/register/complete");
    }
    setLoading(false);
  };

  return (
    <form
      name="registration-form"
      className="h-full flex flex-col items-center gap-2 p-10 w-full border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex p-1 justify-center text-center text-4xl">
        <h1>Create Account</h1>
      </div>

      {step === 1 ? (
        <StepOne register={register} errors={errors} clearErrors={clearErrors} />
      ) : step === 2 ? (
        <StepTwo
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          watch={watch}
          setValue={setValue}
        />
      ) : step === 3 ? (
        <StepThree register={register} errors={errors} clearErrors={clearErrors} />
      ) : (
        <StepFour getValues={getValues} />
      )}

      <Navigation
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        step={step}
        loading={loading}
      />
    </form>
  );
};

export default Form;
