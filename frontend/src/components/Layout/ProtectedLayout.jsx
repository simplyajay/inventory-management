import React from "react";
import Sidebar from "@/components/navigation/sidebar/Sidebar";
import Navbar from "../navigation/navbar/Navbar";

const ProtectedLayout = async ({ children }) => {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
