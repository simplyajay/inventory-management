import React from "react";
import { MenuFoldIcon, MenuUnfoldIcon } from "../../icons/Icons";

const Toggle = ({ collapsed, handleToggle }) => {
  return (
    <div
      className={`flex items-center gap-5 ${
        !collapsed ? "self-end" : "self-center"
      }`}
    >
      <div
        className="text-3xl hover:cursor-pointer hidden md:block"
        onClick={handleToggle}
      >
        {!collapsed ? <MenuUnfoldIcon /> : <MenuFoldIcon />}
      </div>
    </div>
  );
};

export default Toggle;
