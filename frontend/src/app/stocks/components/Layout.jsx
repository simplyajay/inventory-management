"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import ProductForm from "@/app/stocks/components/Form";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { ProductTableLayout, ProductFormLayout } from "./Wrapper";
import {
  createStockPageHandler,
  getProductValues,
} from "@/utils/stock/stock.util";

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
  } = state;

  const FormMemo = React.memo(ProductForm);

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

  const {
    fetchProducts,
    deleteItem,
    searchItem,
    clearSearch,
    pageNext,
    pagePrev,
  } = createStockPageHandler({
    page,
    totalPages,
    state,
    updateState,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

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
            onPrevPage={pagePrev}
            onNextPage={pageNext}
            loading={loading}
            initializing={initializing}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </ProductTableLayout>

      <ProductFormLayout
        title="PRODUCT INFORMATION"
        pageInfoVisible={pageInfoVisible}
      >
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
          cancelProps={{
            text: "Cancel",
            onCancel: () => updateState({ showConfirmDialog: false }),
            customclass: "bg-gray-600",
          }}
          confirmProps={{
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
