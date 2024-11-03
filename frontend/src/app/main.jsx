"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggle = () => {
    setSidebarVisible((prev) => !prev);
  };
  return (
    <div className="antialiased m-0 p-0 h-screen w-screen flex flex-col">
      <nav className="h-[9%]">
        <Navbar toggle={handleToggle} unfold={sidebarVisible}></Navbar>
      </nav>
      <main className="flex flex-1 overflow-hidden">
        <aside className="h-full">
          <Sidebar visible={sidebarVisible} />
        </aside>
        <div
          className={`flex-1 overflow-auto ${
            sidebarVisible ? "" : ""
          } transition-all duration-200`}
        >
          {children}
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
