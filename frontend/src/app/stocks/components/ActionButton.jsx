import React from "react";

const ActionButton = ({ text, icon, handleOnClick, customClass }) => {
  return (
    <button
      className={`p-1 rounded-lg  ${customClass}`}
      onClick={handleOnClick}
    >
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default ActionButton;
