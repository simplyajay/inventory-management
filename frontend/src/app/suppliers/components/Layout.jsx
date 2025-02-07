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
    <div className="w-full h-full p-4">
      <div className="w-full h-full flex flex-col shadow-md p-2">
        <div className="w-full p-2 flex justify-between">
          <div className="flex items-center justify-center">Suppliers</div>
          <div className="flex h-full flex-row-reverse items-end">
            <button
              id="addButton"
              type="button"
              className="w-full border border-gray-500 rounded-lg p-2 select-none"
            >
              Add Supplier
            </button>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
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
      </div>
    </div>
  );
};

export default Layout;
