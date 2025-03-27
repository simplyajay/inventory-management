"use client";
import React, { useState } from "react";
import { getFetchOptions } from "@/api/options";
import { getProducts } from "@/api/products";
import StockForm from "./StockForm";
import StockTable from "./StockTable";

const Stocks = ({ data }) => {
  const [state, setState] = useState({
    loading: false,
    products: data.products,
    selectedProduct: {},
    pageInfoVisible: false,
    showConfirmDialog: false,
    isEditForm: false,
    page: data.page,
    sortBy: { key: "name", type: "asc" },
    totalPages: data.totalPages,
    searchKeyword: "",
  });

  const { products } = state;

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
    <div className="h-full flex flex-col lg:flex-row gap-1 justify-between">
      <StockTable
        state={state}
        bodies={products}
        handleTableButtonClick={() =>
          updateState({
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
