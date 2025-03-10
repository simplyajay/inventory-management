"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { getFetchOptions } from "@/services/options";
import { getProducts } from "@/services/api/products";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Table from "@/components/table/Table";
import TableHead from "@/components/table/TableHead";
import TableLayout from "@/components/table/TableLayout";
import Pagination from "@/components/table/Pagination";
import {
  createStockTableHandler,
  getTableActions,
  tableHeaders,
} from "@/utils/stock/stockTable.util";
import { createStockFormHandler, getProductFormValues } from "@/utils/stock/stockForm.util";
import { ClipLoader } from "react-spinners";
import { getProductFormInputs } from "@/utils/stock/stockForm.util";
import StockFormLayout from "./StockForm";

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

  const {
    loading,
    updating,
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
    sortBy,
  } = state;

  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductFormValues(selectedProduct);
    }

    return {};
  }, [selectedProduct]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const fetchProducts = async ({ page = 1, searchKeyword = "", sortBy = {} } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy: JSON.stringify(sortBy), searchKeyword };
      const data = await getProducts(fetchOptions);
      await new Promise((resolve) => setTimeout(resolve, 500)); // testing purposes only
      updateState({
        searchKeyword,
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

  const { deleteItem, searchItem, clearSearch, handleSort, pageNext, pagePrev } =
    createStockTableHandler({
      totalPages,
      state,
      updateState,
      fetchProducts,
    });

  const { onFormSubmit } = createStockFormHandler({ state, fetchProducts });

  const hideForm = () => {
    updateState({ pageInfoVisible: false });
  };
  const formCancelProps = {
    text: "Cancel",
    onClick: () => {
      updateState({ pageInfoVisible: false });
    },
  };

  const formSubmitProps = {
    disabled: updating ? true : false,
    text: isEditForm ? (updating ? "Saving" : "Save") : updating ? "Creating" : "Create",
    icon: updating && <ClipLoader color="#007d96" size={15} loading={updating} />,
  };

  const formInputs = getProductFormInputs(updating, isEditForm);

  const tableActions = getTableActions(updateState);
  const searchRef = useRef(null);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-4 md:gap-4 justify-between">
      <TableLayout loading={loading}>
        <TableHead
          title={"PRODUCTS"}
          buttonText={"Add Product"}
          onButtonClick={() =>
            updateState({
              initialValues,
              isEditForm: false,
              pageInfoVisible: true,
            })
          }
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={searchKeyword}
        />

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
          currentPage={page}
          totalPages={totalPages}
        />
      </TableLayout>

      <StockFormLayout
        fetchProducts={fetchProducts}
        pageInfoVisible={pageInfoVisible}
        hideForm={hideForm}
        selectedProduct={selectedProduct}
        isEditForm={isEditForm}
      />

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
          }}
          optionConfirm={{
            text: deleting ? "Deleting..." : "Confirm",
            onConfirm: () => deleteItem(selectedProduct),
            customclass: `${deleting ? `hover:cursor-default` : ``}`,
          }}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default Stocks;
