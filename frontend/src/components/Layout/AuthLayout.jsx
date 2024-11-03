"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/app/main";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("loginPage");
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  /*  useEffect(() => {
    setLoading(false);
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      router.push("/");
    }
  }, [isLoggedIn]);

  if (loading) {
    return <p>Loading...</p>; // Optionally show a loading state
  } */

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default AuthLayout;
