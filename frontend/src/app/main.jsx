"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
const MainLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggle = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="antialiased m-0 p-0 h-screen w-screen flex flex-col">
      <nav className="">
        <Navbar toggle={handleToggle} unfold={sidebarVisible}></Navbar>
      </nav>
      <main className="flex-1 flex overflow-hidden">
        <aside className="h-full">
          <Sidebar toggle={handleToggle} unfold={sidebarVisible} />
        </aside>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;
