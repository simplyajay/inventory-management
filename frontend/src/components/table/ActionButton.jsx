import React from "react";

const ActionButton = ({ text, icon, onClick, customClass }) => {
  return (
    <button className={`p-1 rounded-lg  ${customClass}`} onClick={onClick}>
      {icon && <span>{icon}</span>}
      {text && <span>{text}</span>}
    </button>
  );
};

export default ActionButton;
