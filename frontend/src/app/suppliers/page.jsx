import React from "react";
import Suppliers from "./components/Suppliers";

export const metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
  title: "Suppliers",
};

const SuppliersPage = () => {
  return (
    <div className="h-full w-full bg-white">
      <Suppliers />
    </div>
  );
};

export default SuppliersPage;
