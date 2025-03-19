"use client";
import React, { useState, useRef, useEffect } from "react";
import Table from "@/components/table/Table";
import TableHead from "@/components/table/TableHead";
import TableLayout from "@/components/table/TableLayout";
import Pagination from "@/components/table/Pagination";
import ActionButton from "@/components/table/TableAction";
import { useRouter } from "next/navigation";
import { getFetchOptions } from "@/services/options";
import { getSuppliers } from "@/services/api/supplier";
import { ExternalLinkIcon } from "@/components/icons/Icons";
import { createTableHandler } from "@/components/table/table.util";

const Suppliers = () => {
  const [state, setState] = useState({
    suppliers: [],
    loading: false,
    initializing: false,
    searchKeyword: "",
    sortBy: { key: "name", type: "asc" },
    page: 1,
    totalPages: 0,
  });

  const { suppliers, loading, page, totalPages, sortBy, searchKeyword } = state;

  const searchRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const fetchSuppliers = async ({
    page = 1,
    searchKeyword = "",
    sortBy = { key: "name", type: "asc" },
  } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy: JSON.stringify(sortBy), searchKeyword };
      const data = await getSuppliers(fetchOptions);
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateState({
        searchKeyword,
        sortBy,
        suppliers: data.suppliers,
        totalPages: data.totalPages,
        loading: false,
        page: data.page,
      });
    } catch (error) {
      console.error("Error on fetchSupplier at Layout ", error);
      updateState({ loading: true });
    }
  };

  const { searchItem, clearSearch, handleSort, pageNext, pagePrev } = createTableHandler({
    state,
    fetchTableData: fetchSuppliers,
  });

  const tableHeaders = [
    { name: "COMPANY NAME", key: "name" },
    { name: "DESCRIPTION", key: "description" },
    { name: "PHONE", key: "phone", object: "contact" },
    { name: "EMAIL", key: "email", object: "contact" },
  ];

  const tableActions = {
    name: "ACTIONS",
    key: "actions",
    components: [
      <ActionButton
        key={"goto"}
        onClick={(target) => router.push(`/suppliers/${target._id}`)}
        icon={<ExternalLinkIcon className="fill-current text-blue-500" />}
        text={"View"}
        customClass={"text-blue-500"}
      />,
    ],
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between">
      <TableLayout loading={loading}>
        <TableHead
          title={"SUPPLIERS"}
          buttonText={"Add Supplier"}
          onButtonClick={() => console.log("test")}
          searchRef={searchRef}
          handleSearch={searchItem}
          handleSearchClear={clearSearch}
          searchKeyword={searchKeyword}
        />

        <Table
          loading={loading}
          headers={tableHeaders}
          bodies={suppliers}
          actions={tableActions}
          messageWhenEmpty={"There are no Suppliers"}
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

export default Suppliers;
