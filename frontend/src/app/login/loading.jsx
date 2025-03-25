"use client";
import { useEffect } from "react";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

const Loading = () => {
  useEffect(() => {
    nProgress.start();
    return () => nProgress.done();
  }, []);
};

export default Loading;
