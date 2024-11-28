"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, setSelectedProduct } from "@/store/slices/productSlice";
import { initialValues } from "../../../utils/schema/product.validationSchema";
import { getProductValues } from "@/utils/stock/product.util";

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "PRICE"];

const ProductPageLayout = () => {
  //local states
  const [pageInfoVisible, setPageInfoVisible] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);

  //global states

  const { selectedProduct, products, loading } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  //memo
  const ProductTableMemo = React.memo(ProductTable);
  const ProductFormMemo = React.memo(ProductForm);

  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }
    return {};
  }, [selectedProduct]);

  const loadProducts = async () => {
    let targetId = user._orgId ? user._orgId : user._id;
    dispatch(fetchProducts(targetId));
  };

  const handleAdd = () => {
    setIsEditForm(false);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  const handleRowClick = (prod) => {
    dispatch(setSelectedProduct(prod));
    setIsEditForm(true);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  const handleCollapseForm = () => {
    setPageInfoVisible(false);
  };
  return loading ? (
    //IMPLEMENT LOADING SKELETON
    <>loading</>
  ) : (
    <div className="h-full w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between ">
      <ProductTableWrapper title="PRODUCTS" handleAddProduct={handleAdd}>
        <ProductTableMemo
          onRowClick={handleRowClick}
          products={products}
          tableHeads={tableHeads}
        />
      </ProductTableWrapper>
      <ProductFormWrapper
        title="PRODUCT INFORMATION"
        pageInfoVisible={pageInfoVisible}
      >
        <ProductFormMemo
          updateForm={isEditForm}
          initialValues={isEditForm ? productValues : initialValues}
          collapseForm={handleCollapseForm}
          selectedProduct={selectedProduct}
        />
      </ProductFormWrapper>
    </div>
  );
};

export default ProductPageLayout;
