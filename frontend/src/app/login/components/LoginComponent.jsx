"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { validateLogin } from "@/services/api/user/validation";
import { getFetchOptions } from "@/services/options";
import { ClipLoader } from "react-spinners";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});

const fieldClass =
  "px-2 py-3 text-sm rounded-lg min-w-full focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-300";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, clearErrors, setError } = useForm({
    mode: "onBlur", //validate on blur
    resolver: yupResolver(validationSchema), // use Yup schema for validation
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const router = useRouter();
  const { errors } = formState;
  const onSubmit = async (values) => {
    setLoading(true);
    const fetchOptions = getFetchOptions(
      "POST",
      {
        identifier: values.username,
        password: values.password,
      },
      true
    );
    const data = await validateLogin(fetchOptions);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (data) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("password", {
        type: "manual",
        message: "Username or password is incorrect",
      });
      setLoading(false);
    }
  };

  return (
    <form
      name="login-form"
      className="h-full flex flex-col items-center gap-5 p-10 bg-[#adc9eb] md:bg-transparent w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col p-1 justify-center text-center text-5xl">
        <h1>Login</h1>
      </div>
      <div className="w-full flex flex-1 flex-col gap-5 justify-center py-5">
        <div className="flex flex-col gap-1">
          <input
            {...register("username")}
            id="username"
            placeholder="Username or email"
            autoComplete="off"
            onFocus={() => clearErrors("username")}
            className={`${fieldClass}  ${errors.username && "ring-2 ring-red-100"}`}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            onFocus={() => clearErrors("password")}
            className={`${fieldClass}  ${errors.password && "ring-2 ring-red-100"}`}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex justify-end">
          <button
            className="text-sm text-gray-600 hover:text-gray-800 "
            type="button"
            onClick={() => {
              console.log("test");
            }}
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <div className=" flex flex-col gap-4 justify-center w-full ">
        <button
          type="submit"
          disabled={loading ? true : false}
          className="min-w-[5rem] border border-gray-300 rounded-lg p-2 bg-[#fcfbff] hover:bg-[#f2eefe] transition-colors duration-200"
        >
          {loading ? (
            <div className="flex gap-3 items-center justify-center">
              <ClipLoader color="#007d96" size={15} loading={loading} />
              <span>Logging In</span>
            </div>
          ) : (
            <span>Log In</span>
          )}
        </button>
        <div className="flex md:flex-row flex-col gap-2">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?
            <b className="hover:cursor-pointer text-gray-600 hover:text-gray-800">
              <Link href={"/register"}>Register</Link>
            </b>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
