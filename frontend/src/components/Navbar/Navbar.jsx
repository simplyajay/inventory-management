import React from "react";
import Image from "next/image";
import logo from "@/assets/react-icon.svg";

const Navbar = () => {
  return (
    <div className="flex p-2 gap-5 shadow-md bg-background select-none">
      <div className="flex items-center gap-5">
        <Image src={logo} alt="logo" width={50} height={50} priority></Image>
      </div>
    </div>
  );
};

export default Navbar;
