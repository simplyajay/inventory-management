import React from "react";
import HomePageComponent from "@/components/home/HomePageComponent";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-around gap-5 px-20 py-10">
      <div className="h-[20%] w-full flex items-center justify-center ">
        <h1 className="text-5xl">Home Page</h1>
      </div>
      <div className="w-full flex-1 flex items-center justify-center">
        <HomePageComponent />
      </div>
    </div>
  );
};

export default HomePage;
