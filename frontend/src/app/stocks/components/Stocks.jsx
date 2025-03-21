"use client";
import React, { useEffect, useState } from "react";
import { getFetchOptions } from "@/services/options";
import { getProducts } from "@/services/api/products";
import StockForm from "./StockForm";
import StockTable from "./StockTable";

const Stocks = () => {
  const [state, setState] = useState({
    loading: true,
    updating: false,
    deleting: false,
    products: [],
    selectedProduct: {},
    pageInfoVisible: false,
    showConfirmDialog: false,
    isEditForm: false,
    initialValues: {},
    page: 1,
    sortBy: { key: "name", type: "asc" },
    totalPages: 0,
    searchKeyword: "",
  });

  const { products, initialValues } = state;

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const fetchProducts = async ({
    page = 1,
    searchKeyword = "",
    sortBy = { key: "name", type: "asc" },
  } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy: JSON.stringify(sortBy), searchKeyword };
      const data = await getProducts(fetchOptions);
      updateState({
        searchKeyword,
        sortBy,
        products: data.products,
        totalPages: data.totalPages,
        loading: false,
        page: data.page,
      });
    } catch (error) {
      console.error("Error on fetchProducts at Layout ", error);
      updateState({ loading: true });
    }
  };

  const hideForm = () => {
    updateState({ pageInfoVisible: false });
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-2 md:gap-2 justify-between">
      <StockTable
        state={state}
        bodies={products}
        handleTableButtonClick={() =>
          updateState({
            initialValues,
            isEditForm: false,
            pageInfoVisible: true,
          })
        }
        fetchProducts={fetchProducts}
        updateState={updateState}
      />
      <StockForm state={state} fetchProducts={fetchProducts} hideForm={hideForm} />
    </div>
  );
};

export default Stocks;
