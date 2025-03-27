"use client";
import React, { useState } from "react";
import ToastProvider from "@/components/toast/ToastProvider";
import Navbar from "@/components/navigation/navbar/Navbar";
import Sidebar from "@/components/navigation/sidebar/Sidebar";

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
      <ToastProvider />
    </div>
  );
};

export default ProtectedLayout;
