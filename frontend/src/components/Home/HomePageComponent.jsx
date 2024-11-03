"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const GuestComponent = ({ router }) => {
  return (
    <div className="flex gap-10">
      <button
        type="button"
        className="p-2 border border-gray-500 rounded-lg"
        onClick={() => {
          router.push("/login");
        }}
      >
        Login
      </button>
      <button
        type="button"
        className="p-2 border border-gray-500 rounded-lg"
        onClick={() => {
          router.push("/register");
        }}
      >
        Register
      </button>
    </div>
  );
};

const UserComponent = ({ user, router }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1>{`Welcome back, ${user.firstname}`}</h1>
      <button
        type="button"
        className="p-2 border border-gray-500 rounded-lg"
        onClick={() => {
          router.push("/dashboard");
        }}
      >{`Dashboard >`}</button>
    </div>
  );
};

const HomePageComponent = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const user = useSelector((state) => state.authentication.user);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  return isLoggedIn ? (
    <UserComponent user={user} router={router} />
  ) : (
    <GuestComponent router={router} />
  );
};

export default HomePageComponent;
