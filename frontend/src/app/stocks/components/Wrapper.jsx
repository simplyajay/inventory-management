import React from "react";
import Skeleton from "react-loading-skeleton";

export const ProductTableWrapper = ({
  children,
  title,
  onAddProductClick,
  loading,
}) => {
  return (
    <div
      className={`h-full lg:h-full w-full flex flex-col rounded-lg shadow-md bg-[white]`}
    >
      <div className="w-full flex rounded-tl-lg items-center p-3 border-b border-gray-300 shadow-sm bg-background">
        {loading ? (
          <div className="w-[7%]">
            <Skeleton height={30} />
          </div>
        ) : (
          <h1 className="text-xl font-sans">{title}</h1>
        )}

        <div className={`flex-1 flex justify-end ${loading ? "w-[7%]" : ""}`}>
          {loading ? (
            <div className="w-[7%]">
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
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

export const ProductFormWrapper = ({ children, title, pageInfoVisible }) => {
  return (
    <div
      className={`h-full w-full lg:w-[40%] flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
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
