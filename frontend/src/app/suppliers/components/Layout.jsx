"use client";
import React, { useState } from "react";
import Table from "@/components/table/Table";

const tableHeaders = [];
const tableBodies = [];
const tableActions = [];

const Layout = () => {
  const [state, setState] = useState({
    loading: false,
    searchKeyword: "",
    sortBy: { key: "name", type: "asc" },
  });

  const { loading, sortBy, searchKeyword } = state;

  const handleSort = () => {};

  return (
    <div className="w-full h-full border border-red-500 p-5">
      <Table
        loading={loading}
        headers={tableHeaders}
        bodies={tableBodies}
        actions={tableActions}
        messageWhenEmpty="You don't have any suppliers"
        sortSetting={{ ...sortBy, searchKeyword }}
        handleSort={handleSort}
      />
    </div>
  );
};

export default Layout;
