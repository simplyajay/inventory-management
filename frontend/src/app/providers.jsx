"use client";
import { Provider } from "react-redux";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/reducers";

//initialize redux store
const initializeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const Providers = ({ children, initialState }) => {
  const store = initializeStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
