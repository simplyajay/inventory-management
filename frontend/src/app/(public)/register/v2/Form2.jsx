"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import { initialValues } from "../../../../utils/schema/register.validationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateOnRegister } from "@/api/user/validation";
import { getFetchOptions } from "@/api/options";
import { createOrganization, createUser } from "@/api/user/registration";
import { formInputs } from "@/utils/registrationForm.util";
import FormComponents from "@/components/forms/basic-form/FormComponents";
import { ButtonCancelGrayLight, ButtonConfirmBlueLight } from "@/components/button/CustomButtons";
import Link from "next/link";
import { getInitialValues, getValidationSchema } from "@/utils/schema/reg.validationSchema";
import { steps } from "@/utils/registrationForm.util";
import AccountType from "../components/registration-steps/AccountType";

const Form = () => {
  const [step, setStep] = useState(steps[0]);
  const [type, setType] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [currentFormValues, setCurrentFormValues] = useState({});
  const validationSchema = getValidationSchema(step);
  const router = useRouter();

  const [selected, setSelected] = useState("individual");

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
    defaultValues: type ? getInitialValues : {},
    shouldFocusError: false,
  });

  const { organization, details, username, password } = formInputs;

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
    e.preventDefault();
    const currentStep = steps.indexOf(step);
    const nextStep = currentStep + 1;

    if (nextStep < steps.length) {
      setStep(steps[nextStep]);
    }

    await validateStep();
  };

  const handlePrev = () => {
    const currentStep = steps.indexOf(step);
    const prevStep = currentStep - 1;

    if (prevStep >= 0) {
      setStep(steps[prevStep]);
    }
  };

  const validateStep = async () => {
    if (step === steps[0]) {
      setType(selected);

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
      className="h-full w-full flex flex-col items-center gap-6 p-2  border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex p-1 justify-center text-center">
        <p className="text-responsive-lg">{step.title}</p>
      </div>
      {step === steps[0] ? (
        <AccountType setSelected={setSelected} selected={selected} />
      ) : (
        <div className="flex-1 w-full">
          {type === "organization" ? (
            <FormComponents
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              components={organization.fields}
            />
          ) : (
            <FormComponents
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              components={details.fields}
            />
          )}
        </div>
      )}
      <div className="flex w-full justify-between items-center gap-2">
        {step !== steps[0] && (
          <ButtonCancelGrayLight type="button" className="flex-1" onClick={handlePrev}>
            Previous
          </ButtonCancelGrayLight>
        )}
        <ButtonConfirmBlueLight className="flex-1" onClick={handleNext}>
          Next
        </ButtonConfirmBlueLight>
      </div>
      <div className="flex w-full justify-center items-center">
        <p className="text-responsive-xs text-gray-500">
          Already have an account?{" "}
          <b className="hover:cursor-pointer text-gray-600 hover:text-gray-800">
            <Link href={"/login"}>Log in</Link>
          </b>
        </p>
      </div>
    </form>
  );
};

export default Form;
