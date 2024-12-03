import React from "react";
import ActionButton from "./ActionButton";
import { DeleteIcon, EditIcon } from "@/components/Icons/Icons";
import Skeleton from "react-loading-skeleton";
import { MoonLoader } from "react-spinners";

const ProductTable = ({
  onRowClick,
  products,
  tableHeads,
  onEditButtonClick,
  onDeleteButtonclick,
  loading,
}) => {
  const widthMap = {
    SKU: "md:w-[8%]",
    NAME: "md:w-[40%] w-[20%]",
    QTY: "md:w-[10%]",
    OUM: "md:w-[8%]",
    ACTIONS: "md:w-[8%]",
  };
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
                    widthMap[value] || ""
                  }`}
                >
                  {loading ? <Skeleton height={20} /> : value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={tableHeads.length}
                className="h-full text-center p-4 "
              >
                <div className="flex items-center justify-center h-full">
                  <MoonLoader color="#007d96" size={50} loading={loading} />
                </div>
              </td>
            </tr>
          ) : (
            products.map((product) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
