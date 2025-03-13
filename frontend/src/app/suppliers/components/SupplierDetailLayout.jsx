"use client";
import React, { useState, useEffect } from "react";
import SupplierDetail from "./SupplierDetail";
import SupplierDocuments from "./SupplierDocuments";

const SupplierDetailLayout = ({ supplier }) => {
  const [state, setState] = useState({
    detailCollapse: true,
  });

  const { detailCollapse } = state;

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };
  return (
    <div className="w-full h-full flex flex-col items-center shadow-sm bg-white ">
      <div className={`${detailCollapse ? `h-[20%]` : "flex-1"} w-full pb-2`}>
        <SupplierDetail detailCollapse={detailCollapse} supplier={supplier} />
      </div>
      <div className="w-full flex items-center justify-center border border-collapse border-gray-300 ">
        <button
          className="fixed z-10 bg-yellow-50 p-2 rounded-full hover:scale-105 transition-al l"
          onClick={() => updateState({ detailCollapse: !detailCollapse })}
        >
          test
        </button>
      </div>
      <div className={`${detailCollapse ? "flex-1" : "h-[20%]"} w-full pt-2 `}>
        <SupplierDocuments />
      </div>
    </div>
  );
};

export default SupplierDetailLayout;
