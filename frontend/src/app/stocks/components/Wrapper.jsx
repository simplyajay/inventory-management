import React from "react";

export const ProductTableWrapper = ({ children, title, handleAddProduct }) => {
  return (
    <div
      className={`h-full w-full flex flex-col rounded-lg shadow-md bg-[white]`}
    >
      <div className="w-full flex rounded-tl-lg items-center p-3 border-b border-gray-300 shadow-sm bg-background">
        <h1 className="text-xl font-sans">{title}</h1>
        <div className="flex-1 flex justify-end ">
          <button
            type="button"
            onClick={handleAddProduct}
            className="border border-gray-500 rounded-lg py-1 px-2"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

export const ProductFormWrapper = ({ children, title, pageInfoVisible }) => {
  return (
    <div
      className={`h-full w-full md:w-[40%] flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
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
