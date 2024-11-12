"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import { initialValues } from "./validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSelectedProduct } from "@/store/slices/productSlice";

const getProductValues = (product) => {
  return {
    sku: product.sku,
    name: product.name,
    barcode: product.barcode,
    description: product.description,
    unitOfMeasurement: product.unitOfMeasurement,
    quantity: product.quantity,
    price: product.price,
  };
};

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "PRICE"];

const ProductPageLayout = () => {
  const dispatch = useDispatch();
  //local states
  const [pageInfoVisible, setPageInfoVisible] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  //global states
  const { products, loading, selectedProduct } = useSelector(
    (state) => state.product
  );
  const { user, isLoggedIn } = useSelector((state) => state.authentication);

  //memo
  const ProductTableMemo = React.memo(ProductTable);
  const ProductFormMemo = React.memo(ProductForm);

  const loadProducts = () => {
    let targetId = user._orgId ? user._orgId : user._id;
    dispatch(fetchProducts(targetId));
  };

  //load on initial render
  useEffect(() => {
    if (isLoggedIn) {
      loadProducts();
    }
  }, []);

  //collapse product info panel
  const collapse = () => {
    setPageInfoVisible(false);
  };

  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }
    return {};
  }, [selectedProduct]);

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

  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between ">
      <div
        className={`h-full w-full flex flex-col rounded-lg shadow-md overflow-hidden bg-[white]`}
      >
        <div className="w-full flex rounded-tl-lg items-center p-1 border-b border-gray-300 shadow-sm bg-background">
          <div className="w-[50%] h-full flex flex-col justify-center p-3">
            <h1 className="text-xl font-sans">PRODUCTS</h1>
          </div>
          <div className="flex-1 flex justify-end p-3">
            <button
              type="button"
              onClick={handleAdd}
              className="border border-gray-500 rounded-lg py-1 px-2"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="overflow-y-auto">
          <ProductTableMemo
            onRowClick={handleRowClick}
            products={products}
            loading={loading}
            tableHeads={tableHeads}
          />
        </div>
      </div>
      <div
        className={`h-full w-full md:w-[70%] flex flex-col rounded-lg shadow-md transition-all duration-300 overflow-hidden ${
          pageInfoVisible ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex justify-around rounded-tr-lg p-1 shadow-sm rounded-t-lg bg-background">
          <div className="w-full h-full p-3">
            <h1 className="text-xl font-sans ">Product Information</h1>
          </div>
        </div>
        <div className="flex-1 w-full h-full overflow-auto bg-[white]">
          <ProductFormMemo
            updateForm={isEditForm}
            initialValues={isEditForm ? productValues : initialValues}
            collapse={collapse}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPageLayout;
