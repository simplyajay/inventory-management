import React from "react";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-full max-w-[450px] flex flex-col items-center justify-center p-2 gap-12">
        <div className="flex flex-col justify-center items-center gap-4 border border-red-500">
          <h1 className="text-2xl">APP NAME</h1>
          <h1 className="text-lg">Join Us and Simplify Your Inventory Process</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
          <div className="w-16 h-16 bg-gray-200"></div>
        </div>
        <div className="p-3 border border-red-500">
          <Link href="/register/account">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
