import React from "react";
import Image from "next/image";
import logo from "@/assets/react-icon.svg";
import { MenuFoldIcon, MenuUnfoldIcon } from "../Icons/Icons";

const Navbar = (props) => {
  const { toggle, unfold } = props;

  return (
    <div className="flex p-2 gap-5 shadow-md bg-background select-none">
      <div className="flex items-center gap-5">
        <Image src={logo} alt="logo" width={50} height={50} priority></Image>
        <div className="text-3xl hover:cursor-pointer" onClick={toggle}>
          {unfold ? <MenuUnfoldIcon /> : <MenuFoldIcon />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
