import React from "react";

const SupplierDetail = ({ detailCollapse, supplier }) => {
  return detailCollapse ? (
    <div className="w-full h-full border border-green-500 p-3">
      <div></div>{" "}
    </div>
  ) : (
    <div className="w-full h-full">SupplierDetail</div>
  );
};

export default SupplierDetail;
