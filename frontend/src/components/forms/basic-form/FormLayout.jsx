import React from "react";

export const FormLayout = ({ children, title }) => {
  return (
    <div className="h-full w-full flex flex-col shadow-md transition-all duration-300 overflow-hidden">
      <div className="w-full flex justify-start p-3 bg-white border-b border-gray-200">
        <h1 className="text-responsive-md font-sans">{title}</h1>
      </div>
      <div className="h-full flex-1 overflow-hidden bg-white">{children}</div>
    </div>
  );
};
