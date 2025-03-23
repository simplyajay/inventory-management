"use client";
import React, { useState } from "react";
import Sidebar from "@/components/navigation/sidebar/Sidebar";
import Navbar from "../navigation/navbar/Navbar";

const ProtectedLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };
  return (
    <div className="flex h-full w-full">
      <Sidebar collapsed={collapsed} />
      <div className="flex flex-col flex-1">
        <Navbar collapsed={collapsed} toggle={handleToggle} />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
