import { jwtDecode } from "jwt-decode";
import React from "react";
import MainLayout from "./MainLayout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AuthLayout = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt-token")?.value;

  let isLoggedIn = false;

  if (token) {
    try {
      // Decode the JWT token to get the payload (without verifying)
      const decoded = jwtDecode(token);

      // If decoding is successful, you can assume the user is logged in
      isLoggedIn = !!decoded; // If the token has a payload, it's assumed valid
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
  }

  return isLoggedIn ? <MainLayout>{children}</MainLayout> : <>{children}</>;
};

export default AuthLayout;
