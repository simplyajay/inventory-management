import React from "react";

const FormDialog = ({ title, children }) => {
  return (
    <div className="h-full w-full fixed z-10 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="h-[80%] w-[80%] lg:w-[50%] flex flex-col bg-white rounded-sm">
        <div className="flex justify-between p-3 border-b border-gray-200 ">
          <p className=" font-light text-lg text-responsive-md ">{title}</p>
        </div>
        <div className="w-full flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default FormDialog;
