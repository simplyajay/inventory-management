"use client";
import React, { useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableHead from "@/components/table/TableHead";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { getStockTableActions, tableHeaders } from "@/utils/stock/stockTable.util";
import { createStockTableHandler } from "@/utils/stock/stockTable.util";

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
  const tableActions = getStockTableActions(updateState);

  const { deleteItem, searchItem, clearSearch, handleSort, pageNext, pagePrev } =
    createStockTableHandler({
      state,
      updateState,
      fetchProducts,
    });

  return (
    <div className="lg:h-full h-[50%] flex-1">
      <TableLayout loading={loading}>
        <TableHead
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
