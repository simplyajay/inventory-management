import React from "react";
import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex-1 max-w-[350px]">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
