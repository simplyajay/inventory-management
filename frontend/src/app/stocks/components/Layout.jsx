"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import ProductForm from "@/app/stocks/components/Form";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { notify } from "@/components/toast/ToastProvider";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { getProductValues } from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { deleteProduct, getProducts } from "@/services/products";

const keys = ["sku", "name", "description", "unitOfMeasurement", "quantity"];

const ProductPageLayout = () => {
  const [state, setState] = useState({
    loading: true,
    initializing: true,
    deleting: false,
    products: [],
    selectedProduct: {},
    pageInfoVisible: false,
    showConfirmDialog: false,
    isEditForm: false,
    initialValues: {},
    page: 1,
    sortBy: "sku",
    totalPages: 0,
    searchKeyword: "",
    showSearch: false,
  });

  const {
    loading,
    deleting,
    products,
    selectedProduct,
    pageInfoVisible,
    showConfirmDialog,
    isEditForm,
    initialValues,
    page,
    sortBy,
    totalPages,
    searchKeyword,
    showSearch,
    initializing,
  } = state;

  const ProductFormMemo = React.memo(ProductForm);
  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }

    return {};
  }, [selectedProduct]);

  const searchRef = useRef(null);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const handleOnAddProductClick = () => {
    updateState({
      initialValues,
      isEditForm: false,
      pageInfoVisible: true,
    });
  };

  const handleConfirmDeleteClick = async () => {
    const fetchOptions = getFetchOptions("DELETE", null, true, false);
    updateState({ deleting: true });
    const data = await deleteProduct(fetchOptions, selectedProduct._id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    notify(data.message);
    updateState({
      pageInfoVisible: false,
      deleting: false,
      showConfirmDialog: false,
    });
    fetchProducts();
  };

  const handlePageChange = (action) => {
    switch (action) {
      case "prev":
        if (page > 1) {
          const newPage = Number(page) - 1;
          fetchProducts({ page: newPage });
        }
        break;
      case "next":
        if (page < totalPages) {
          const newPage = Number(page) + 1;
          fetchProducts({ page: newPage });
        }
        break;
      default:
        return;
    }
  };

  const handleSearch = (keyword = "") => {
    if (keyword) {
      updateState({ searchKeyword: keyword, showSearch: true });
      fetchProducts({ searchKeyword: keyword });
    }

    return {
      clear: () => {
        if (searchRef.current) {
          searchRef.current.clearInput();
        }
        updateState({ searchKeyword: "" });
        fetchProducts({ searchKeyword: keyword });
      },
    };
  };

  const fetchProducts = async ({ page = 1, searchKeyword = "" } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy, searchKeyword };
      const data = await getProducts(fetchOptions);
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateState({
        products: data.products,
        totalPages: data.totalPages,
        loading: false,
        page: data.page,
        initializing: false,
      });
    } catch (error) {
      console.error("Error on fetchProducts at Layout ", error);
      updateState({ loading: true });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between ">
      <ProductTableWrapper
        title="PRODUCTS"
        onAddProductClick={handleOnAddProductClick}
        onSearch={handleSearch}
        searchKeyword={searchKeyword}
        loading={loading}
        initializing={initializing}
        searchRef={searchRef}
      >
        <div className="h-full w-full flex flex-col">
          <Table
            body={products}
            keys={keys}
            loading={loading}
            onRowClick={(prod) => updateState({ selectedProduct: prod })}
            onEdit={() =>
              updateState({ isEditForm: true, pageInfoVisible: true })
            }
            onDelete={() => {
              updateState({ showConfirmDialog: true });
            }}
          />

          <Pagination
            onPrevPage={() => handlePageChange("prev")}
            onNextPage={() => handlePageChange("next")}
            loading={loading}
            initializing={initializing}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </ProductTableWrapper>

      <ProductFormWrapper
        title="PRODUCT INFORMATION"
        pageInfoVisible={pageInfoVisible}
      >
        <ProductFormMemo
          updateForm={isEditForm}
          initialValues={isEditForm ? productValues : initialValues}
          collapseForm={() => updateState({ pageInfoVisible: false })}
          selectedProduct={selectedProduct}
          fetchProducts={() => fetchProducts()}
        />
      </ProductFormWrapper>
      {showConfirmDialog && (
        <ConfirmDialog
          message={
            <>
              You are about to <strong className="text-red-500">Delete</strong>{" "}
              {selectedProduct.name}
            </>
          }
          cancelProps={{
            text: "Cancel",
            onCancel: () => updateState({ showConfirmDialog: false }),
            customclass: "bg-gray-600",
          }}
          confirmProps={{
            text: deleting ? "Deleting..." : "Confirm",
            onConfirm: handleConfirmDeleteClick,
            customclass: `${deleting ? `hover:cursor-default` : ``} bg-red-500`,
            loading: deleting,
          }}
        />
      )}
    </div>
  );
};

export default ProductPageLayout;
