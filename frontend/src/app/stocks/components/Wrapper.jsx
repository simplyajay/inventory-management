import React from "react";

export const ProductFormLayout = ({ children, title, pageInfoVisible }) => {
  return (
    <div
      className={`lg:h-full lg:w-[25%] h-[40%] w-full flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
        pageInfoVisible ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-start rounded-tr-lg shadow-sm rounded-t-lg bg-background p-3">
        <h1 className="text-xl font-sans ">{title}</h1>
      </div>
      <div className="flex-1 overflow-hidden bg-[white]">{children}</div>
    </div>
  );
};
