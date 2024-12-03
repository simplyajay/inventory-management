import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const defaultToastConfig = {
  type: "success",
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const notify = (message, config = defaultToastConfig) => {
  toast(message, config);
};

const ToastProvider = () => {
  return <ToastContainer />;
};

export default ToastProvider;
