import React from "react";
import useTable from "./useTable";
import { MoonLoader } from "react-spinners";

const Table = ({ body, keys, onEdit, onDelete, onRowClick, loading }) => {
  const acts = [
    { type: "edit", className: "hover:bg-blue-100", handler: onEdit },
    { type: "delete", className: "hover:bg-blue-100", handler: onDelete },
  ];
  const { columns, actions } = useTable({
    keys,
    tableActions: acts,
    initialData: body,
  });

  return (
    <div className="w-full h-full overflow-auto">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <MoonLoader color="#29b8ea" size={60} />
        </div>
      ) : (
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
            {body.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center hover:bg-blue-50 border-b-2 px-2"
                onClick={() => onRowClick(row)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="py-2">
                    {column.body
                      ? column.body({ getValue: () => row[column.accessor] })
                      : actions.map((action) => action.component)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
