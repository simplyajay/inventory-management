import React from "react";

export const ProductTableWrapper = ({ children, title, handleAddProduct }) => {
  return (
    <div
      className={`h-full w-full flex flex-col rounded-lg shadow-md overflow-hidden bg-[white]`}
    >
      <div className="w-full flex rounded-tl-lg items-center p-1 border-b border-gray-300 shadow-sm bg-background">
        <div className="w-[50%] h-full flex flex-col justify-center p-3">
          <h1 className="text-xl font-sans">{title}</h1>
        </div>
        <div className="flex-1 flex justify-end p-3">
          <button
            type="button"
            onClick={handleAddProduct}
            className="border border-gray-500 rounded-lg py-1 px-2"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="overflow-y-auto">{children}</div>
    </div>
  );
};

export const ProductFormWrapper = ({ children, title, pageInfoVisible }) => {
  return (
    <div
      className={`h-full w-full md:w-[70%] flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
        pageInfoVisible ? "block" : "hidden"
      }`}
    >
      <div className="w-full flex justify-around rounded-tr-lg p-1 shadow-sm rounded-t-lg bg-background">
        <div className="w-full h-full p-3">
          <h1 className="text-xl font-sans ">{title}</h1>
        </div>
      </div>
      <div className="flex-1 w-full h-full overflow-auto bg-[white]">
        {children}
      </div>
    </div>
  );
};
