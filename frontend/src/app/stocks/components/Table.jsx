import React from "react";

const ProductTable = ({ onRowClick, products, loading, tableHeads }) => {
  return (
    <div className="w-full">
      {loading ? (
        <>Loading</>
      ) : (
        <table className="w-full table-auto">
          <thead className="top-0 sticky z-10 bg-background">
            <tr className="border-gray-500">
              {tableHeads.map((value, key) => (
                <th key={key} className="px-3 py-2 text-sm font-thin">
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>Loading...</>
            ) : (
              <>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="text-center hover:bg-blue-50 hover:cursor-pointer"
                    onClick={() => onRowClick(product)}
                  >
                    <td className="p-2">{product.sku}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.description}</td>
                    <td className="p-2">{product.unitOfMeasurement}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">{product.price}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
