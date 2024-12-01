import React from "react";
import ActionButton from "./ActionButton";
import { DeleteIcon, EditIcon } from "@/components/Icons/Icons";

const ProductTable = ({
  onRowClick,
  products,
  tableHeads,
  onEditButtonClick,
  onDeleteButtonclick,
}) => {
  return (
    <div className="w-full h-full overflow-auto">
      <table className="w-full table-auto">
        <thead className="top-0 sticky z-10 bg-background">
          <tr className="border-gray-500">
            {tableHeads.map((value, key) => {
              return (
                <th
                  key={key}
                  className={`px-3 py-2 text-sm font-thin overflow-clip ${
                    value === "SKU"
                      ? "md:w-[8%]"
                      : value === "NAME"
                      ? "md:w-[40%] w-[20%]"
                      : value === "QTY"
                      ? "md:w-[10%]"
                      : value === "OUM"
                      ? "md:w-[8%]"
                      : value === "ACTIONS"
                      ? "md:w-[8%]"
                      : ""
                  }`}
                >
                  {value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="text-center hover:bg-blue-50 hover:cursor-pointer"
              onClick={() => onRowClick(product)}
            >
              <td className="p-2 ">{product.sku}</td>
              <td className="p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                {product.name}
              </td>
              <td className="p-2 max-w-xs whitespace-nowrap overflow-hidden text-ellipsis">
                {product.description}
              </td>
              <td className="p-2">{product.unitOfMeasurement}</td>
              <td className="p-2">{product.quantity}</td>
              <td className="p-2">
                <div className="flex justify-around gap-1">
                  <ActionButton
                    customClass={`hover:bg-blue-100`}
                    onClick={onEditButtonClick}
                    icon={<EditIcon />}
                  />
                  <ActionButton
                    customClass={`hover:bg-blue-100`}
                    onClick={onDeleteButtonclick}
                    icon={<DeleteIcon />}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
