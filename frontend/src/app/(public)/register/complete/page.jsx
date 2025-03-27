"use client";
import React from "react";
import Link from "next/link";

const RegistrationComplete = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="text-3xl flex flex-col gap-10 items-center justify-center">
        <p className="text-center">Your account has been created!</p>
        <div className="text-sm">
          Redirect to{" "}
          <Link className="hover:cursor-pointer font-bold" href={"/login"}>
            login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete;
