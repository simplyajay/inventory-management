import React from "react";

export const ButtonCancelGrayLight = ({ children, className, ...rest }) => {
  return (
    <button
      className={`flex justify-center items-center p-2 text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="min-w-6">{children}</span>
    </button>
  );
};

export const ButtonCancelGrayDark = ({ children, className, ...rest }) => {
  return (
    <button
      className={`flex justify-center items-center p-2 text-white bg-gray-500 hover:bg-gray-600 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="min-w-6">{children}</span>
    </button>
  );
};

export const ButtonConfirmRed = ({ children, className, ...rest }) => {
  return (
    <button
      className={`flex justify-center items-center p-2 text-white bg-red-400 hover:bg-red-500 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="min-w-6">{children}</span>
    </button>
  );
};

export const ButtonConfirmBlue = ({ children, className, ...rest }) => {
  return (
    <button
      className={`flex justify-center items-center p-2 text-gray-700 bg-blue-200 hover:bg-blue-300 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="min-w-6">{children}</span>
    </button>
  );
};

export const ButtonConfirmBlueLight = ({ children, className, ...rest }) => {
  return (
    <button
      className={`flex justify-center items-center p-2 text-gray-700 bg-blue-100 hover:bg-blue-200 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="min-w-6">{children}</span>
    </button>
  );
};
