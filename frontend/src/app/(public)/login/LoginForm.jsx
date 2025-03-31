"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLogin } from "@/api/user/validation";
import { getFetchOptions } from "@/api/options";
import { ClipLoader } from "react-spinners";
import { ButtonConfirmBlueLight } from "@/components/button/CustomButtons";
import { loginSchema } from "@/utils/schema/register.validationSchema";
import { EyeIcon, EyeOffIcon } from "@/components/icons/Icons";

const values = { username: "", password: "" };
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState, clearErrors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
    defaultValues: values,
    shouldFocusError: false,
  });
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
    } else {
      setInvalidCredentials(true);
      setLoading(false);
      return;
    }
  };

  const handleFocus = (target) => {
    clearErrors(target);
    setInvalidCredentials(false);
  };

  return (
    <form
      className="h-full w-full flex flex-col items-center gap-5 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-responsive-lg text-gray-600">Login</div>
      <div className="w-full flex-1 flex flex-col justify-center gap-1 py-5">
        <div className="w-full flex-1 flex flex-col justify-center gap-5">
          <div className="flex flex-col gap-1">
            <input
              {...register("username")}
              id="username"
              type="text"
              placeholder="Username or Email"
              autoComplete="off"
              onFocus={() => handleFocus("username")}
              className={`input- text-responsive-xs ${errors.username && "ring-2 ring-red-100"}`}
            />
            {errors.username && (
              <p className="text-responsive-xs text-red-400">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                onFocus={() => handleFocus("password")}
                className={`input- !pr-14 text-responsive-xs ${
                  errors.password && "ring-2 ring-red-100"
                }`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center p-2 border-l"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <EyeIcon width="1.5em" height="1.5em" />
                ) : (
                  <EyeOffIcon width="1.5em" height="1.5em" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-responsive-xs text-red-400">{errors.password.message}</p>
            )}
          </div>
        </div>
        {invalidCredentials && (
          <div className="w-full flex justify-start items-center text-responsive-xs text-red-400">
            Invalid username or password
          </div>
        )}
      </div>
      <div className="w-full flex justify-between flex-wrap">
        <span className="flex gap-1 text-responsive-xs">
          <input type="checkbox" />
          <p>Remember me</p>
        </span>
        <Link
          className="text-responsive-xs hover:cursor-pointer text-gray-600 hover:text-gray-800"
          href={"/"}
        >
          Forgot Password?
        </Link>
      </div>
      <div className=" flex flex-col gap-4 justify-center w-full ">
        <ButtonConfirmBlueLight type="submit" className="text-responsive-sm">
          {loading ? (
            <ClipLoader
              color="#007d96"
              size={20}
              className="border border-red-400"
              loading={loading}
            />
          ) : (
            "Login"
          )}
        </ButtonConfirmBlueLight>
      </div>
      <div className="w-full flex justify-center items-center gap-1 flex-wrap">
        <p className="text-responsive-xs text-gray-600">Don&apos;t have an account?</p>
        <Link
          className="text-responsive-xs hover:cursor-pointer font-semibold text-gray-600 hover:text-gray-800"
          href={"/register"}
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
