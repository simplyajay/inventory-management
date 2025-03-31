import React from "react";
import Link from "next/link";
import { PreviousIcon, NextIcon } from "@/components/icons/Icons";
import { ButtonConfirmBlueLight, ButtonCancelGrayLight } from "@/components/button/CustomButtons";

const Navigation = ({ handleNext, handlePrevious, step, loading }) => {
  return (
    <div className=" flex flex-col gap-5 justify-center w-full">
      <div className="flex flex-row-reverse gap-2">
        <ButtonConfirmBlueLight type="submit" disabled={loading} onClick={handleNext}>
          {step === 4 ? "Create Account" : "Next"}
        </ButtonConfirmBlueLight>
        <ButtonCancelGrayLight
          type="button"
          onClick={handlePrevious}
          className={`${step === 1 ? "hidden" : "inline-block"}`}
        >
          Back
        </ButtonCancelGrayLight>
      </div>

      <div className="flex md:flex-row flex-col gap-2">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <b className="hover:cursor-pointer text-gray-600 hover:text-gray-800">
            <Link href={"/login"}>Log in</Link>
          </b>
        </p>
      </div>
    </div>
  );
};

export default Navigation;
