"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { overview, account } from "./links";
import { usePathname } from "next/navigation";
import { MenuFoldIcon, MenuUnfoldIcon } from "../Icons/Icons";
import { useRouter } from "next/navigation";
import { logOutUser } from "@/services/validation";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { getAuthenticatedUser } from "@/services/authentication";
import Section from "./SidebarSection";
import Toggle from "./Toggle";

const Sidebar = () => {
  //local states
  const [selectedLink, setSelectedLink] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentPath = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    const fetchOptions = getFetchOptions("GET", null, true, false);
    const { username, ...user } = await getAuthenticatedUser(fetchOptions);
    setUsername(username);
    setLoading(false);
  };

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        router.replace("/");
      })
      .finally(() => {
        router.refresh();
      });
  };

  useEffect(() => {
    setSelectedLink(currentPath);
  }, [currentPath]);

  useEffect(() => {
    fetchUser();
  }, []);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`h-full px-2 py-5 w-[65px] md:w-[180px] shadow-lg bg-yellow-500
        ${
          !collapsed ? "md:w-[180px]" : "md:w-[65px]"
        } select-none transform duration-200 ease-in-out transition-all overflow-hidden`}
    >
      {loading ? (
        <div className="h-full w-full bg-gray-500 text-5xl"> LOADING</div>
      ) : (
        <div className="flex flex-col h-full w-full gap-5">
          <Toggle collapsed={collapsed} handleToggle={handleToggle} />

          <div className="h-full flex flex-col justify-between pb-[20px]">
            <Section
              name="overview"
              content={overview}
              currentLink={selectedLink}
              onLinkClick={setSelectedLink}
              collapsed={collapsed}
            />

            <Section
              name="account"
              content={account}
              currentLink={selectedLink}
              onLinkClick={setSelectedLink}
              customFunctions={[{ target: "logout", function: handleLogout }]}
              collapsed={collapsed}
              username={username}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
