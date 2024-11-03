"use client";
import React from "react";

import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  return (
    <div>
      HomePage
      <div>
        <button
          type="button"
          onClick={() => {
            router.push("/login");
            console.log("login");
          }}
        >
          login
        </button>
        <button
          type="button"
          onClick={() => {
            router.push("/register");
            console.log("register");
          }}
        >
          create new account
        </button>
      </div>
    </div>
  );
};

export default HomePage;
