"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
import React from "react";

const Providers = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
