"use client";
import React, { useState, useRef } from "react";
import Table from "@/components/table/Table";
import TableLayout from "@/components/table/TableLayout";
import { tableHeaders } from "@/utils/supplier/supplierTable.util";

const tableBodies = [];
const tableActions = [];

const Layout = () => {
  const [state, setState] = useState({
    loading: false,
    initializing: false,
    searchKeyword: "",
    sortBy: { key: "name", type: "asc" },
  });

  const { loading, initializing, sortBy, searchKeyword } = state;

  const searchRef = useRef(null);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between">
      <TableLayout
        title="SUPPLIERS"
        buttonText="New Supplier"
        searchKeyword={searchKeyword}
        searchRef={searchRef}
        handleSearch={() => console.log("etst")}
      >
        <Table
          initializing={initializing}
          loading={loading}
          sortSetting={{ ...sortBy, searchKeyword }}
          headers={tableHeaders}
          bodies={tableBodies}
          messageWhenEmpty={"There are no Suppliers"}
        />
      </TableLayout>
    </div>
  );
};

export default Layout;
