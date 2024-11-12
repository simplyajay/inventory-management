"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MainLayout from "@/app/main";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const publicRoutes = ["/", "/login", "/register"];
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    if (!isLoggedIn && !isPublicRoute) {
      router.replace("/login");
    }
  }, [isLoggedIn, currentPath, router]);

  // if user is logged in and will try to navigate to a public route, or is not logged in, children will render without using mainlayout

  if (!isLoggedIn || (isLoggedIn && isPublicRoute)) {
    return <>{children}</>;
  }

  // main layout is where the sidebar, navigationbar and protected pages
  return <MainLayout>{children}</MainLayout>;
};

export default AuthLayout;
