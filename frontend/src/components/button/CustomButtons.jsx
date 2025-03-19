import React from "react";

export const ButtonCancelGrayLight = ({
  icon,
  text,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="flex gap-1">
        {icon && <i className="flex justify-center items-center">{icon}</i>}
        <p>{text}</p>
      </span>
    </button>
  );
};

export const ButtonCancelGrayDark = ({
  icon,
  text,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="flex gap-1">
        {icon && <i className="flex justify-center items-center">{icon}</i>}
        <p>{text}</p>
      </span>
    </button>
  );
};

export const ButtonConfirmRed = ({
  icon,
  text,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white bg-red-400 hover:bg-red-500 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="flex gap-1">
        {icon && <i className="flex justify-center items-center">{icon}</i>}
        <p>{text}</p>
      </span>
    </button>
  );
};

export const ButtonConfirmBlue = ({
  icon,
  text,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-gray-700 bg-blue-200 hover:bg-blue-300 transition-all rounded ${className}`}
      {...rest}
    >
      <span className="flex gap-1">
        {icon && <i className="flex justify-center items-center">{icon}</i>}
        <p>{text}</p>
      </span>
    </button>
  );
};
