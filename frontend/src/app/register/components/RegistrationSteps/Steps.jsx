import React from "react";
import { useWatch } from "react-hook-form";

const fieldClass =
  "px-2 py-3 text-sm rounded-lg min-w-full focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-300";

export const StepOne = ({ register, errors, clearErrors }) => {
  return (
    <div className="w-full flex flex-1 flex-col gap-5 justify-center py-5">
      <div className="flex flex-col gap-1">
        <input
          {...register("firstname")}
          id="firstname"
          placeholder="First name"
          autoComplete="given-name"
          onFocus={() => clearErrors("firstname")}
          className={`${fieldClass}  ${
            errors.firstname && "ring-2 ring-red-100"
          }`}
        />
        {errors.firstname && (
          <p className="text-red-500">{errors.firstname.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("middlename")}
          id="middlename"
          placeholder="Middle name (Optional)"
          autoComplete="additional-name"
          onFocus={() => clearErrors("middlename")}
          className={`${fieldClass}  ${
            errors.middlename && "ring-2 ring-red-100"
          }`}
        />
        {errors.middlename && (
          <p className="text-red-500">{errors.middlename.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("lastname")}
          id="lastname"
          placeholder="Last name"
          autoComplete="family-name"
          onFocus={() => clearErrors("lastname")}
          className={`${fieldClass}  ${
            errors.lastname && "ring-2 ring-red-100"
          }`}
        />
        {errors.lastname && (
          <p className="text-red-500">{errors.lastname.message}</p>
        )}
      </div>
    </div>
  );
};

export const StepTwo = ({ register, errors, clearErrors, watch, setValue }) => {
  const accountType = watch("accountType");
  return (
    <div className="w-full flex flex-1 flex-col gap-5 justify-center py-5">
      <div className="flex flex-col gap-1">
        <input
          {...register("email")}
          id="email"
          placeholder="Email"
          autoComplete="email"
          onFocus={() => clearErrors("email")}
          className={`${fieldClass}  ${errors.email && "ring-2 ring-red-100"}`}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("contact")}
          id="contact"
          placeholder="Contact Number (Optional)"
          onFocus={() => clearErrors("contact")}
          className={`${fieldClass}  ${
            errors.contact && "ring-2 ring-red-100"
          }`}
        />
        {errors.contact && (
          <p className="text-red-500">{errors.contact.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2">
          <input
            {...register("accountType")}
            type="radio"
            id="individualRadio"
            value="Individual"
            onClick={() => {
              clearErrors("organization");
              setValue("organization", "");
            }}
          />
          Individual
        </label>
        <label className="flex items-center gap-2">
          <input
            {...register("accountType")}
            type="radio"
            id="organizationRadio"
            value="Organization"
          />
          Organization
        </label>
      </div>
      <div
        className={`${
          accountType === "Organization" ? "flex" : "hidden"
        } flex-col gap-1`}
      >
        <input
          {...register("organization")}
          id="organization"
          placeholder="Organization Name"
          autoComplete="off"
          onFocus={() => clearErrors("organization")}
          className={`${fieldClass}  ${
            errors.organization && "ring-2 ring-red-100"
          }`}
        />
        {errors.organization && (
          <p className="text-red-500">{errors.organization.message}</p>
        )}
      </div>
    </div>
  );
};

export const StepThree = ({ register, errors, clearErrors }) => {
  return (
    <div className="w-full flex flex-1 flex-col gap-5 justify-center py-5">
      <div className="flex flex-col gap-1">
        <input
          {...register("username")}
          id="username"
          placeholder="Username"
          autoComplete="off"
          onFocus={() => clearErrors("username")}
          className={`${fieldClass}  ${
            errors.username && "ring-2 ring-red-100"
          }`}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          onFocus={() => clearErrors("password")}
          className={`${fieldClass}  ${
            errors.password && "ring-2 ring-red-100"
          }`}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          autoComplete="off"
          onFocus={() => clearErrors("confirmPassword")}
          className={`${fieldClass}  ${
            errors.confirmPassword && "ring-2 ring-red-100"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>
    </div>
  );
};

export const StepFour = ({ getValues }) => {
  const values = getValues();
  const name =
    values.firstname + " " + values.middlename + " " + values.lastname;
  const username = values.username;
  const email = values.email;
  const accountType = values.accountType;
  const organization = values.organization;
  return (
    <div className="w-full flex flex-1 flex-col gap-5 justify-center py-5">
      {" "}
      <div className="w-full flex flex-col gap-5 overflow-hidden">
        <div className="w-full flex">
          <div className="w-[40%]">Name:</div>
          <div className="flex-1 break-words">{name}</div>
        </div>
        <div className="w-full flex">
          <div className="w-[40%] ">Username:</div>
          <div className="flex-1 break-words">{username}</div>
        </div>
        <div className="w-full flex overflow-hidden">
          <div className="w-[40%]">Email:</div>
          <div className="flex-1 overflow-hidden text-ellipsis break-words">
            {email}
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-[40%]">Type:</div>
          <div className="flex-1 break-words">{accountType}</div>
        </div>
        <div
          className={`${
            accountType === "Individual" ? "hidden" : "block"
          } w-full flex`}
        >
          <div className="w-[40%]">Organization:</div>
          <div className="flex-1 break-words">{organization}</div>
        </div>
      </div>
    </div>
  );
};
