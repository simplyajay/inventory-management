import React from "react";
import ProductPageLayout from "./components/Layout";

const Products = () => {
  const ProductPageLayoutMemo = React.memo(ProductPageLayout);
  return (
    <div className="h-full p-4">
      <ProductPageLayoutMemo />
    </div>
  );
};

export default Products;
