"use client";
import React, { useEffect, useState } from "react";
import { getFetchOptions } from "@/services/options";
import { getAuthenticatedUser } from "@/services/api/user/authentication";
import { ToggleComponent, UserComponent } from "./components/NavbarComponents";

const Navbar = ({ collapsed, toggle }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    setLoading(true);
    const fetchOptions = getFetchOptions("GET", null, true, false);
    const { username, ...user } = await getAuthenticatedUser(fetchOptions);
    setUser({ username: username });
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    !loading && (
      <nav className="flex bg-background select-none border-b border-gray-300 minh-[30px]">
        <ToggleComponent collapsed={collapsed} toggle={toggle} />

        <div className="flex-1 flex p-1 justify-end items-center">
          <UserComponent user={user} />
        </div>
      </nav>
    )
  );
};

export default Navbar;
