"use client";
import React from "react";
import { useRouter } from "next/navigation";
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

const UserComponent = ({ username, router }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1>{`Welcome back, ${username}`}</h1>
      <button
        type="button"
        className="p-2 border border-gray-500 rounded-lg"
        onClick={() => {
          router.push("/dashboard");
          router.refresh();
        }}
      >{`Dashboard >`}</button>
    </div>
  );
};

const HomePageComponent = () => {
  const router = useRouter();
  const { username } = useSelector((state) => state.authentication);

  return username ? (
    <UserComponent username={username} router={router} />
  ) : (
    <GuestComponent router={router} />
  );
};

export default HomePageComponent;
