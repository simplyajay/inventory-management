import React from "react";
import Link from "next/link";

const ListItems = ({ item, onClick, currentLink, collapsed }) => {
  return (
    <span
      onClick={onClick}
      className={`flex rounded-sm items-center ${
        item.link
          ? `hover:bg-[#c3bfda] ${currentLink === item.link ? "bg-[#c3bfda]" : ""}`
          : "hover:cursor-pointer"
      }`}
    >
      <div className="p-2 flex justify-center items-center">{item.icon}</div>
      {!collapsed && (
        <p className="hidden md:flex md:flex-1 md:tems-center p-1 md:whitespace-nowrap text-responsive-xs">
          {item.name}
        </p>
      )}
    </span>
  );
};

const Section = ({ name, content, currentLink, onLinkClick, collapsed, username }) => {
  return (
    <div className="flex-1 flex flex-col px-2 gap-5">
      <div className="h-[15px] text-xs">
        <label className={`${!collapsed ? "hidden md:inline" : "hidden"}`}>
          {name.toUpperCase()}
        </label>
      </div>
      <ul id={name} className="flex flex-col gap-3">
        {content.map((item) => (
          <li key={item.id}>
            <Link replace href={item.link} prefetch>
              <ListItems
                item={item}
                onClick={() => onLinkClick(item.link)}
                currentLink={currentLink}
                collapsed={collapsed}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
