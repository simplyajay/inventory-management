"use client";
import React, { useState, useRef } from "react";
import TableLayout from "@/components/table/TableLayout";
import TableHead from "@/components/table/TableInfo";
import Table from "@/components/table/Table";
import Pagination from "@/components/table/Pagination";
import { createTableHandler } from "@/components/table/utils/table.util";
import ActionButton from "@/components/table/TableAction";
import { ExternalLinkIcon } from "@/components/icons/Icons";
import { getFetchOptions } from "@/services/options";
import { getDocumentsByEntity } from "@/services/api/documents";
import { formatDate } from "@/components/table/utils/tableFormater";
import { formatDocument } from "@/components/table/utils/tableFormater";
import { formatAmount } from "@/components/table/utils/tableFormater";

const SupplierDocuments = ({ supplierId, data }) => {
  const [state, setState] = useState({
    documents: data.documents,
    loading: false,
    searchKeyword: "",
    sortBy: { key: "_documentId", type: "desc" },
    page: 1,
    totalPages: 0,
  });

  const tableHeaders = [
    { name: "TYPE", key: "type", hasFormat: true, value: (type) => formatDocument(type) },
    { name: "DOCUMENT NO", key: "_documentId" },
    {
      name: "DATE",
      key: "date",
      hasFormat: true,
      value: (date, format) => formatDate(date, "mdy"),
    },
    { name: "MEMO", key: "memorandum" },
    {
      name: "AMOUNT",
      key: "costAfterVat",
      hasFormat: true,
      value: (amount) => formatAmount(amount, { locale: "en-US", currency: "USD" }),
      align: "right",
    },
    {
      name: "STATUS",
      key: "documentStatus",
      hasFormat: true,
      value: (status) => status.charAt(0).toUpperCase() + status.slice(1),
    },
  ];
  const tableActions = {
    name: "ACTIONS",
    key: "actions",
    components: [
      <ActionButton
        key={"goto"}
        onClick={(target) => console.log("goto doc")}
        icon={<ExternalLinkIcon className="fill-current text-blue-500" />}
        text={"View"}
        customClass={"text-blue-500"}
      />,
    ],
  };

  const { documents, loading, searchKeyword, sortBy, page, totalPages } = state;

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const searchRef = useRef(null);

  const fetchDocuments = async ({
    page = 1,
    searchKeyword = "",
    sortBy = { key: "_documentId", type: "desc" },
  } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy: JSON.stringify(sortBy), searchKeyword };
      const data = await getDocumentsByEntity(fetchOptions, supplierId);
      updateState({
        searchKeyword,
        sortBy,
        documents: data.documents,
        totalPages: data.totalPages,
        loading: false,
        page: data.page,
      });
    } catch (error) {
      console.error("Error fetchDocuments at SupplierDocuments", error);
      return;
    }
  };

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
