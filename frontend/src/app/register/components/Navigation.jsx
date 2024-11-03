import React from "react";
import Link from "next/link";
import { PreviousIcon, NextIcon } from "@/components/Icons/Icons";

const Navigation = ({ handleNext, handlePrevious, step, loading }) => {
  return (
    <div className=" flex flex-col gap-5 justify-center w-full">
      <div className="flex flex-row-reverse gap-2">
        <button
          type="submit"
          disabled={loading}
          onClick={handleNext}
          className={`border border-[#bcb5cd] rounded-lg gap-1 px-3 py-2 bg-[#fcfbff] hover:bg-[#f2eefe] transition-colors duration-200 flex items-center justify-between`}
        >
          {step === 4 ? "Create Account" : "Next"}
          <span className={`${step < 4 ? "inline-block" : "hidden"}`}>
            <NextIcon width={12} height={12} />
          </span>
        </button>
        <button
          type="button"
          onClick={handlePrevious}
          className={`${
            step === 1 ? "hidden" : "flex"
          } rounded-lg px-3 py-2 gap-1 hover:bg-[#fcfafe] transition-colors duration-200 items-center justify-between select-none text-gray-500`}
        >
          <span className="text-gray-100">
            <PreviousIcon width={12} height={12} className="fill-gray-500" />
          </span>
          Back
        </button>
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
