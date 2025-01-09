import React from "react";
import Skeleton from "react-loading-skeleton";

export const ProductTableWrapper = ({
  children,
  title,
  onAddProductClick,
  initializing,
}) => {
  return (
    <div
      className={`lg:h-full h-[50%] w-full flex-1 flex flex-col rounded-lg shadow-md bg-[white]`}
    >
      <div className="w-full flex rounded-t-lg items-center p-3 border-b border-gray-300 shadow-sm bg-background">
        {initializing ? (
          <div className="w-[15%] md:w-[7%]">
            <Skeleton height={30} />
          </div>
        ) : (
          <h1 className="text-xl font-sans">{title}</h1>
        )}

        <div
          className={`flex-1 flex justify-end ${
            initializing ? "md:w-[7%]" : ""
          }`}
        >
          {initializing ? (
            <div className="w-[15%] md:w-[7%]">
              <Skeleton height={30} />
            </div>
          ) : (
            <button
              type="button"
              onClick={onAddProductClick}
              className="border border-gray-500 rounded-lg py-1 px-2"
            >
              Add Product
            </button>
          )}
        </div>
      </div>
      <div className="overflow-hidden h-full">{children}</div>
    </div>
  );
};

export const ProductFormWrapper = ({ children, title, pageInfoVisible }) => {
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
