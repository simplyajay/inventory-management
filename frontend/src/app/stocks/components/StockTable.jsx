"use client";
import React, { useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableInfo from "@/components/table/TableInfo";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { createTableHandler } from "@/components/table/utils/table.util";
import { getFetchOptions } from "@/services/options";
import { deleteProduct } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";
import ActionButton from "@/components/table/TableAction";
import { EditIcon, DeleteIcon } from "@/components/icons/Icons";

const StockTable = ({ state, bodies, handleTableButtonClick, fetchProducts, updateState }) => {
  const {
    sortBy,
    searchKeyword,
    loading,
    page,
    totalPages,
    showConfirmDialog,
    deleting,
    selectedProduct,
  } = state;

  const searchRef = useRef(null);

  const { searchItem, clearSearch, handleSort, pageNext, pagePrev } = createTableHandler({
    state,
    updateState,
    fetchTableData: fetchProducts,
  });

  const tableHeaders = [
    { name: "SKU", key: "sku" },
    { name: "NAME", key: "name" },
    { name: "DESCRIPTION", key: "description" },
    { name: "UNIT", key: "unitOfMeasurement" },
    { name: "QTY", key: "quantity", align: "right" },
  ];

  const tableActions = {
    name: "ACTIONS",
    key: "actions",
    components: [
      <ActionButton
        key={"edit"}
        onClick={(prod) => {
          updateState({
            isEditForm: true,
            pageInfoVisible: true,
            selectedProduct: prod,
          });
        }}
        icon={<EditIcon />}
      />,
      <ActionButton
        key={"delete"}
        onClick={(prod) => {
          updateState({
            showConfirmDialog: true,
            selectedProduct: prod,
            isEditForm: false,
            pageInfoVisible: false,
          });
        }}
        icon={<DeleteIcon />}
      />,
    ],
  };

  const deleteItem = async (selectedProduct) => {
    const fetchOptions = getFetchOptions("DELETE", null, true, false);
    updateState({ deleting: true });
    const data = await deleteProduct(fetchOptions, selectedProduct._id);
    notify(data.message);
    updateState({
      pageInfoVisible: false,
      deleting: false,
      showConfirmDialog: false,
    });
    fetchProducts();
  };

  return (
    <div className="flex-1 overflow-auto">
      <TableLayout loading={loading}>
        <TableInfo
          title={"PRODUCTS"}
          buttonText={"Add Product"}
          onButtonClick={handleTableButtonClick}
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={searchKeyword}
        />

        <Table
          loading={loading}
          headers={tableHeaders}
          bodies={bodies}
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

export default StockTable;
