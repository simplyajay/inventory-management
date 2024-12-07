import React from "react";
import useTable from "./useTable";

const Table = ({
  content,
  keys,
  cellType,
  onEdit,
  onDelete,
  onRowClick,
  comparators,
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
  );
};

export default Table;
