import React from "react";
import useTable from "./hooks/useTable";

const comparators = [
  { key: "sku", header: "SKU", width: 50 },
  { key: "unitOfMeasurement", header: "OUM", width: 50 },
  { key: "quantity", header: "QTY", width: 50 },
];

const Table = ({ content, keys, cellType }) => {
  const { columns, data, addRow } = useTable({
    initialData: content,
    keys,
    cellType,
    comparators,
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
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`${cellType === "input" ? "p-1" : p - 2}`}
                >
                  {column.body({ getValue: () => row[column.accessor] })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
