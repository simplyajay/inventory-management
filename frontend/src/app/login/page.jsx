import React from "react";
import LoginForm from "./components/LoginComponent";

const Login = () => {
  return (
    <div className="w-full h-full p-10 flex items-center justify-center">
      <div className="md:w-[60%] md:h-[80%] h-[70%] w-full flex shadow-lg rounded-lg">
        <div className="md:block hidden w-[55%] rounded-l-lg bg-[#adc9eb]"></div>
        <div className="md:flex-1 w-full rounded-lg bg-[#adc9eb] md:bg-background">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
