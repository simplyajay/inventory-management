"use client";
import React, { useState, useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableHead from "@/components/table/TableHead";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { createTableHandler } from "@/components/table/table.util";

const SupplierDocuments = () => {
  const [state, setState] = useState({
    documents: [],
    loading: false,
    searchKeyword: "",
    sortBy: { key: "name", type: "asc" },
    page: 1,
    totalPages: 0,
  });

  const tableHeaders = [];
  const tableActions = [];

  const { documents, loading, searchKeyword, sortBy, page, totalPages } = state;

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const searchRef = useRef(null);

  const fetchDocuments = async ({
    page = 1,
    searchKeyword = "",
    sortBy = { key: "name", type: "asc" },
  } = {}) => {};

  const handleTableButtonClick = () => {
    console.log("test");
  };

  const { pageNext, pagePrev, searchItem, clearSearch, handleSort } = createTableHandler({
    state,
    fetchTableData: fetchDocuments,
  });
  return (
    <div className="w-full h-full">
      <TableLayout loading={loading}>
        <TableHead
          title={"Documents"}
          buttonText={"New Document"}
          onButtonClick={handleTableButtonClick}
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={searchKeyword}
        />
        <Table
          loading={loading}
          headers={tableHeaders}
          bodies={documents}
          actions={tableActions}
          messageWhenEmpty="There are no documents"
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
    </div>
  );
};

export default SupplierDocuments;
