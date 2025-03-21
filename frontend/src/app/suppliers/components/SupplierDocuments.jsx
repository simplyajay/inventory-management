"use client";
import React, { useState, useRef } from "react";

const SupplierDocuments = () => {
  const [state, setState] = useState({
    documents: [],
    loading: false,
    searchKeyword: "",
    sortBy: { key: "name", type: "asc" },
    page: 1,
    totalPages: 0,
  });

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const searchRef = useRef(null);

  const fetchDocuments = async ({
    page = 1,
    searchKeyword = "",
    sortBy = { key: "name", type: "asc" },
  } = {}) => {};
  return <div className="w-full h-full bg-white">SupplierDocuments</div>;
};

export default SupplierDocuments;
