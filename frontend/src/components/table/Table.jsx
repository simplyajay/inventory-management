import React from "react";
import useTable from "./useTable";
import { ChevronLeft, ChevronRight } from "../icons/Icons";

const Table = ({
  content,
  keys,
  cellType,
  onEdit,
  onDelete,
  onRowClick,
  comparators,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  loading,
}) => {
  const acts = [
    { type: "edit", className: "hover:bg-blue-100", handler: onEdit },
    { type: "delete", className: "hover:bg-blue-100", handler: onDelete },
  ];
  const { columns, data, addRow, actions } = useTable({
    initialData: content,
    keys,
    cellType,
    comparators,
    tableActions: acts,
  });

  return (
    <div className="h-full w-full flex flex-col">
      {loading ? (
        <div className="w-full h-full">loading</div>
      ) : (
        <div className="w-full h-full overflow-auto">
          <table className="w-full table-auto">
            <thead className="top-0 sticky z-10 bg-background">
              <tr className="border-gray-500">
                {columns.map((column, key) => {
                  return (
                    <th
                      key={key}
                      className={`px-3 py-2 text-sm font-thin overflow-clip`}
                    >
                      {column.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="text-center hover:bg-blue-50 hover:cursor-pointer"
                  onClick={() => onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${cellType === "input" ? "p-1" : "p-2"}`}
                    >
                      {column.body
                        ? column.body({ getValue: () => row[column.accessor] })
                        : actions.map((action) => action.component)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div></div>
        </div>
      )}

      <div className="flex-1 flex justify-center p-2 w-full border-t-1 rounded-b-lg bg-background gap-10">
        <button
          onClick={onPrevPage}
          disabled={loading}
          className={`p-2 rounded-full hover:bg-slate-200 disabled:cursor-default`}
        >
          <span>
            <ChevronLeft />
          </span>
        </button>
        <div className="flex items-center text-center gap-4">
          <strong>{page}</strong>
          <p>of</p>
          <strong>{totalPages}</strong>
        </div>
        <button
          onClick={onNextPage}
          disabled={loading}
          className={`p-2 rounded-full hover:bg-slate-200 disabled:cursor-default`}
        >
          <span>
            <ChevronRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Table;
