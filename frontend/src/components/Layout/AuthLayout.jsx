"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MainLayout from "./MainLayout";
import { useSelector } from "react-redux";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const currentPath = usePathname();
  const publicPaths = ["/login", "/register", "/"];
  const isPublicPath = publicPaths.includes(currentPath);
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (!isPublicPath) {
        router.replace("/login");
      } else {
        router.replace(currentPath);
      }
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  }, [isLoggedIn, currentPath, router]);

  return isPublic ? <>{children}</> : <MainLayout>{children}</MainLayout>;
};

export default AuthLayout;
