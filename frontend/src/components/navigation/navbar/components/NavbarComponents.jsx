"use client";
import React, { useState, useRef, useEffect } from "react";
import { MenuUnfoldIcon, MenuFoldIcon } from "@/components/icons/Icons";
import { UserIcon, ChevronDown } from "@/components/icons/Icons";
import { endSession } from "@/services/api/user/validation";
import { getFetchOptions } from "@/services/options";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setUser } from "@/store/slices/authenticationSlice";

export const ToggleComponent = ({ collapsed, toggle, user }) => {
  return (
    <div className="flex items-center p-2">
      <div className="text-3xl hover:cursor-pointer" onClick={toggle}>
        {!collapsed ? <MenuUnfoldIcon /> : <MenuFoldIcon />}
      </div>
    </div>
  );
};

export const UserComponent = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const handleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const fetchOptions = getFetchOptions("POST", null, true, false);
    const data = await endSession(fetchOptions);

    if (!data.success) {
      console.error(data.message);
      return;
    }
    setUser({});
    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex gap-2 p-1 items-center justify-between hover:bg-blue-100 rounded-sm"
        onClick={handleDropdown}
      >
        <UserIcon height={20} width={20} />
        <p className="text-responsive-xs">{user.username}</p>
        <i>
          <ChevronDown height={10} width={10} />
        </i>
      </button>

      {dropdownOpen && (
        <div className="absolute z-50 right-0 mt-1 w-28 md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="py-2">
            <li>
              <Link href={"/account"}>
                <div className="px-4 py-2 hover:bg-gray-100 text-responsive-xs">Account</div>
              </Link>
            </li>
            <li>
              <button
                className="w-full text-start px-4 py-2 hover:bg-gray-100 cursor-pointer text-responsive-xs"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
