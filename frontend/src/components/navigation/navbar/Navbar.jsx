import React from "react";
import Image from "next/image";
import logo from "@/assets/react-icon.svg";

const Navbar = () => {
  return (
    <nav className="flex p-2 gap-5 bg-background select-none border-b border-gray-300">
      <div className="flex items-center gap-5">
        <Image src={logo} alt="logo" width={30} height={30} priority></Image>
      </div>
    </nav>
  );
};

export default Navbar;
