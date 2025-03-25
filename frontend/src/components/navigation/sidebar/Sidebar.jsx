"use client";
import React, { useState, useEffect } from "react";
import { overview } from "./links";
import { usePathname } from "next/navigation";
import logo from "@/assets/react-icon.svg";
import Image from "next/image";
import Section from "./SidebarSection";

const Sidebar = ({ collapsed }) => {
  const [activeLink, setActiveLink] = useState(null);

  const currentPath = usePathname();

  useEffect(() => {
    setActiveLink(currentPath);
  }, [currentPath]);

  return (
    <aside
      className={`${
        !collapsed ? "w-[51px] md:w-[180px] border-r" : "w-[0px] md:w-[51px] md:border-r border-0"
      } border-gray-300 select-none transform duration-200 ease-in-out transition-all overflow-hidden bg-[#faf9ff]`}
    >
      <div className="flex flex-col h-full w-full justify-between gap-5">
        <div className="w-full h-10 p-2">
          <div className="w-full flex">
            <Image src={logo} alt="logo" width={30} height={30} layout="fixed" priority />
          </div>
        </div>
        <Section
          name="menu"
          content={overview}
          currentLink={activeLink}
          onLinkClick={setActiveLink}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
