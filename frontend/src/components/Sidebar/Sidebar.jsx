"use client";
import Link from "next/link";
import React, { useState } from "react";
import { overview, account } from "./links";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authenticationSlice";

const Sidebar = (props) => {
  const [selectedLink, setSelectedLink] = useState(null);
  const { visible } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`md:h-[80%] h-[88%] px-2 py-5 flex flex-col w-[70px] md:w-[180px] fixed gap-5 shadow-lg bg-background rounded-lg select-none ${
        visible ? "translate-x-0" : "-translate-x-full"
      }  transform duration-200 ease-in-out transition-all overflow-hidden`}
    >
      <div className="h-full flex flex-col justify-between pb-[20px]">
        <div className="flex flex-col gap-5">
          <div className="h-[15px] text-xs">
            <label className="hidden md:inline" htmlFor="overview">
              OVERVIEW
            </label>
          </div>
          <ul id="overview" className="flex flex-col gap-3">
            {overview.map((item) => (
              <li key={item.id}>
                <Link href={item.link}>
                  <div
                    onClick={() => setSelectedLink(item.name)}
                    className={`flex gap-5 p-1 rounded-lg hover:bg-[#bbb4d9] ${
                      selectedLink === item.name ? "bg-[#bbb4d9]" : ""
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
            <label className="hidden md:inline" htmlFor="account">
              ACCOUNT
            </label>
          </div>
          <ul id="account" className="flex flex-col gap-3">
            {account.map((item) => (
              <li key={item.id}>
                <Link
                  href={
                    item.id === "profile"
                      ? `/user/${user.username}/profile`
                      : item.id === "settings"
                      ? `/user/${user.username}/settings`
                      : item.link
                  }
                  onClick={() => {
                    if (item.hasFunction) handleLogout();
                  }}
                >
                  <div
                    onClick={() => setSelectedLink(item.name)}
                    className={`flex gap-5 p-1 rounded-lg hover:bg-[#bbb4d9] ${
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
