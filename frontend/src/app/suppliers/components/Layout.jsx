"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/table/Table";
import TableLayout from "@/components/table/TableLayout";
import { tableHeaders } from "@/utils/supplier/supplierTable.util";

const tableBodies = [
  {
    id: "01",
    name: "JALEEL",
    phone: "00002",
    email: "jaleel@gmail.com",
    address: "al qouz",
  },
  {
    id: "02",
    name: "Jalol",
    phone: "00002",
    email: "jaleel@gmail.com",
    address: "al qouz",
  },
  {
    id: "03",
    name: "Jalal",
    phone: "00002",
    email: "jaleel@gmail.com",
    address: "al qouz",
  },
];
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

  const route = useRouter();

  const handleSearch = () => {
    console.log("test");
  };

  const handleRowClick = (row) => {
    console.log(row.name);
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between">
      <TableLayout
        title="SUPPLIERS"
        buttonText="New Supplier"
        searchKeyword={searchKeyword}
        searchRef={searchRef}
        handleSearch={handleSearch}
      >
        <Table
          initializing={initializing}
          loading={loading}
          sortSetting={{ ...sortBy, searchKeyword }}
          headers={tableHeaders}
          bodies={tableBodies}
          messageWhenEmpty={"There are no Suppliers"}
          handleRowClick={handleRowClick}
        />
      </TableLayout>
    </div>
  );
};

export default Layout;
