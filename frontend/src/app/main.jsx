"use client";
import React, { useState } from "react";
import Navbar from "@/app/(components)/Navbar/Navbar";
import Sidebar from "@/app/(components)/Sidebar/Sidebar";

const MainLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggle = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <div className="antialiased m-0 p-0 h-screen flex flex-col">
      <nav>
        <Navbar toggle={handleToggle} unfold={sidebarVisible}></Navbar>
      </nav>
      <main className="flex flex-1 w-screen h-screen overflow-hidden">
        <aside className="flex flex-col justify-center">
          <Sidebar visible={sidebarVisible} />
        </aside>
        <div
          className={`flex-1 overflow-auto ${
            sidebarVisible ? "ml-[70px] md:ml-[180px]" : ""
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
