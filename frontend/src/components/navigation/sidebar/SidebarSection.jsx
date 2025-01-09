import React from "react";
import Link from "next/link";

const ListItems = ({ username, item, onClick, currentLink }) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-1 rounded-lg  ${
        item.link
          ? `hover:bg-[#bbb4d9] ${
              currentLink === item.link ? "bg-[#bbb4d9]" : ""
            }`
          : "hover:cursor-pointer"
      }`}
    >
      <div className="flex items-center justify-center">
        <span className="text-3xl w-[40px] flex justify-center icon">
          {item.icon}
        </span>
      </div>
      <p className="hidden md:flex md:flex-1 md:items-center md:whitespace-nowrap">
        {username ? username : item.name}
      </p>
    </div>
  );
};

const Section = ({
  name,
  content,
  currentLink,
  onLinkClick,
  collapsed,
  customFunctions,
  username,
}) => {
  const getFunction = (item) => {
    if (customFunctions) {
      const customFunction = customFunctions.find(
        (func) => func.target === item.id
      );
      return customFunction ? customFunction.function : null;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="h-[15px] text-xs">
        <label className={`${!collapsed ? "hidden md:inline" : "hidden"}`}>
          {name.toUpperCase()}
        </label>
      </div>
      <ul id={name} className="flex flex-col gap-3">
        {content.map((item) => (
          <li key={item.id}>
            {item.link ? (
              <Link replace href={item.link} prefetch>
                <ListItems
                  item={item}
                  onClick={() => onLinkClick(item.link)}
                  currentLink={currentLink}
                  username={username}
                />
              </Link>
            ) : (
              <ListItems item={item} onClick={getFunction(item)} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
