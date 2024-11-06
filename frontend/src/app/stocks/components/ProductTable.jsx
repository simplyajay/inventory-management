"use client";
import { getProducts } from "@/api/products";
import React, { useState, useEffect } from "react";

const tableHeads = ["SKU", "NAME", "PRICE"];

const ProductTable = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
            {products.map((product) => (
              <tr
                key={product._id}
                className="text-center hover:bg-blue-50 hover:cursor-pointer"
              >
                <td className="md:p-1">{product.sku}</td>
                <td className="md:p-1">{product.name}</td>
                <td className="md:p-1">{product.quantity}</td>
                <td className="md:p-1">{`$${product.price}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
