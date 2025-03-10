import React from "react";

const ActionButton = ({ text, icon, onClick, target, customClass }) => {
  if (!onClick || !target) throw new Error("Missing handler");

  //target prop is passed from the table component during render
  return (
    <button className={`p-1 rounded-lg  ${customClass}`} onClick={() => onClick(target)}>
      <span className="flex gap-1">
        <i>{icon}</i>
        <p>{text}</p>
      </span>
    </button>
  );
};

export default ActionButton;
