import React from "react";
import ProductTable from "./components/ProductTable";

const Products = () => {
  return (
    <div className="h-full p-5 md:p-10">
      <div className="h-full w-full flex flex-col-reverse md:flex-row gap-5 md:gap-10 justify-between">
        <div
          className={`h-full w-full flex flex-col rounded-lg shadow-md overflow-hidden`}
        >
          <div className="w-full rounded-tl-lg p-3 border-b border-gray-300 shadow-sm bg-background">
            <h1 className="text-md font-sans font-semibold">PRODUCTS</h1>
          </div>
          <div className="overflow-y-auto">
            <ProductTable />
          </div>
        </div>
        <div className="md:h-full h-[50%] w-full md:w-[70%] flex flex-col rounded-lg shadow-md">
          <div className="w-full flex justify-around rounded-tr-lg p-2 shadow-sm bg-background">
            <h1>Product Information</h1>
          </div>
          <div className="flex-1 "></div>
        </div>
      </div>
    </div>
  );
};

export default Products;
