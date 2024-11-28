"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { overview, account } from "./links";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { MenuFoldIcon, MenuUnfoldIcon } from "../Icons/Icons";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/services/validation";

const Sidebar = () => {
  //global states
  const user = useSelector((state) => state.authentication.user);

  //local states
  const [selectedLink, setSelectedLink] = useState(null);
  const [collapsed, setCollapsed] = useState(true);

  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    setSelectedLink(currentPath);
  }, [currentPath]);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        router.replace("/");
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`h-full px-2 py-5 flex flex-col w-[65px] md:w-[180px] gap-5 shadow-lg bg-yellow-500
        ${
          !collapsed ? "md:w-[180px]" : "md:w-[65px]"
        } select-none transform duration-200 ease-in-out transition-all overflow-hidden`}
    >
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
      <div className="h-full flex flex-col justify-between pb-[20px]">
        <div className="flex flex-col gap-5">
          <div className="h-[15px] text-xs">
            <label
              className={`${!collapsed ? "hidden md:inline" : "hidden"}`}
              htmlFor="overview"
            >
              OVERVIEW
            </label>
          </div>
          <ul id="overview" className="flex flex-col gap-3">
            {overview.map((item) => (
              <li key={item.id}>
                <Link replace href={item.link} prefetch>
                  <div
                    onClick={() => setSelectedLink(item.link)}
                    className={`flex gap-3 p-1 rounded-lg hover:bg-[#bbb4d9] ${
                      selectedLink === item.link ? "bg-[#bbb4d9]" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="text-3xl w-[40px] flex justify-center icon">
                        {item.icon}
                      </span>
                    </div>
                    <p className="hidden md:flex md:flex-1 md:items-center md:whitespace-nowrap">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <div className="h-[15px] text-xs">
            <label
              className={`${!collapsed ? "hidden md:inline" : "hidden"}`}
              htmlFor="account"
            >
              ACCOUNT
            </label>
          </div>
          <ul id="account" className="flex flex-col gap-3">
            {account.map((item) => (
              <li key={item.id}>
                <Link
                  replace
                  href={
                    item.id === "profile"
                      ? `/user/${user.username}/profile`
                      : item.link
                  }
                  onClick={() => {
                    if (item.hasFunction) handleLogout();
                  }}
                >
                  <div
                    onClick={() => setSelectedLink(item.name)}
                    className={`flex gap-3 p-1 rounded-lg hover:bg-[#bbb4d9] ${
                      selectedLink === item.name ? "bg-[#bbb4d9]" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-3xl w-[40px] flex  flex-grow justify-center">
                        {item.icon}
                      </span>
                    </div>
                    <p className="hidden md:flex md:flex-1 md:items-center md:whitespace-nowrap">
                      {item.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
