"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import ProductForm from "@/app/stocks/components/Form";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Pagination from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import { ProductTableLayout, ProductFormLayout } from "./Wrapper";
import { createPageHandler, getTableActions, tableHeaders } from "@/utils/stock/stockTable.util";
import { getProductValues } from "@/utils/stock/stockForm.util";

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
    sortBy: { key: "name", type: "asc" },
    totalPages: 0,
    searchKeyword: "",
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
    totalPages,
    searchKeyword,
    initializing,
    sortBy,
  } = state;

  const FormMemo = React.memo(ProductForm);
  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }

    return {};
  }, [selectedProduct]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const { fetchProducts, deleteItem, searchItem, clearSearch, handleSort, pageNext, pagePrev } =
    createPageHandler({
      totalPages,
      state,
      updateState,
    });

  const tableActions = getTableActions(updateState);
  const searchRef = useRef(null);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between ">
      <ProductTableLayout
        title="PRODUCTS"
        onAddProductClick={() =>
          updateState({
            initialValues,
            isEditForm: false,
            pageInfoVisible: true,
          })
        }
        searchKeyword={searchKeyword}
        loading={loading}
        initializing={initializing}
        handleSearch={searchItem}
        handleSearchClear={clearSearch}
        searchRef={searchRef}
      >
        <div className="h-full w-full flex flex-col">
          <Table
            loading={loading}
            headers={tableHeaders}
            bodies={products}
            actions={tableActions}
            messageWhenEmpty="No Products Available"
            sortSetting={{ ...sortBy, searchKeyword }}
            handleSort={handleSort}
          />
          <Pagination
            onPrevPage={() => pagePrev(searchKeyword)}
            onNextPage={() => pageNext(searchKeyword)}
            loading={loading}
            initializing={initializing}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </ProductTableLayout>

      <ProductFormLayout title="PRODUCT INFORMATION" pageInfoVisible={pageInfoVisible}>
        <FormMemo
          updateForm={isEditForm}
          initialValues={isEditForm ? productValues : initialValues}
          collapseForm={() => updateState({ pageInfoVisible: false })}
          selectedProduct={selectedProduct}
          fetchProducts={() => fetchProducts()}
        />
      </ProductFormLayout>
      {showConfirmDialog && (
        <ConfirmDialog
          message={
            <p>
              You are about to <strong className="text-red-500">Delete</strong>{" "}
              {selectedProduct.name}
            </p>
          }
          optionCancel={{
            text: "Cancel",
            onCancel: () => updateState({ showConfirmDialog: false }),
            customclass: "bg-gray-600",
          }}
          optionConfirm={{
            text: deleting ? "Deleting..." : "Confirm",
            onConfirm: () => deleteItem(selectedProduct),
            customclass: `${deleting ? `hover:cursor-default` : ``} bg-red-500`,
          }}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default ProductPageLayout;
