import React from "react";

const CardButton = ({ children, image, onClick, className, name, value, selected }) => {
  const [title, description] = children;
  return (
    <div
      className={`flex gap-4 p-4 hover:cursor-pointer rounded-sm border border-gray-300 hover:border-blue-300 transition-colors ${className} ${
        selected === name ? "border-blue-400 hover:border-blue-400" : ""
      }`}
      onClick={onClick}
    >
      {image && (
        <div className="flex justify-center items-center">
          <i>{image}</i>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-start items-start">
        <div className="w-full flex justify-between">
          {title}
          <input
            name={name}
            id={name}
            value={value}
            type="radio"
            checked={selected === name}
            readOnly
          ></input>
        </div>

        {description}
      </div>
    </div>
  );
};

export default CardButton;
