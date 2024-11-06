"use client";
import React, { useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";

const ProductPageLayout = () => {
  const [pageInfoVisible, setPageInfoVisible] = useState(false);

  const handleAdd = () => {
    setPageInfoVisible(true);
  };

  const handleCancel = () => {
    setPageInfoVisible(false);
  };

  const handleSave = () => {
    setPageInfoVisible(false);
  };
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between">
      <div
        className={`h-full w-full flex flex-col rounded-lg shadow-md overflow-hidden`}
      >
        <div className="w-full flex rounded-tl-lg items-center p-1 border-b border-gray-300 shadow-sm bg-background">
          <div className="w-[50%] h-full flex flex-col justify-center p-3">
            <h1 className="text-xl font-sans">PRODUCTS</h1>
          </div>
          <div className="flex-1 flex justify-end p-3">
            <button
              type="button"
              onClick={handleAdd}
              className="border border-gray-500 rounded-lg py-1 px-2"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="overflow-y-auto">
          <ProductTable />
        </div>
      </div>
      <div
        className={`md:h-full h-[50%] w-full md:w-[70%] flex flex-col rounded-lg shadow-md transition-all duration-300 ${
          pageInfoVisible ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex justify-around rounded-tr-lg p-1 shadow-sm rounded-t-lg bg-background">
          <div className="w-full h-full p-3">
            <h1 className="text-xl font-sans ">Product Information</h1>
          </div>
        </div>
        <div className="flex-1 w-full">
          <ProductForm />
        </div>
        <div className="bg-background rounded-b-lg">
          <div className="flex justify-end p-3 gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="border border-gray-500 rounded-lg py-1 px-2 min-w-[5em]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="border border-gray-500 rounded-lg py-1 px-2 min-w-[5em]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
