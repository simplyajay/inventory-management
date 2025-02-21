import React from "react";

export const ProductFormLayout = ({ children, title, pageInfoVisible }) => {
  return (
    <div
      className={`lg:h-full lg:w-[35%] h-[40%] w-full flex flex-col shadow-md transition-all duration-300 overflow-hidden ${
        pageInfoVisible ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-start p-3 bg-white border-b border-gray-200">
        <h1 className="text-xl font-sans">{title}</h1>
      </div>
      <div className="h-full flex-1 overflow-hidden bg-white">{children}</div>
    </div>
  );
};
