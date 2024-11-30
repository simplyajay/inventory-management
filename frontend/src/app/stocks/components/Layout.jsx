"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { initialValues } from "../../../utils/schema/product.validationSchema";
import { getProductValues } from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { getProducts } from "@/services/products";
import { hasOrganization } from "@/services/authentication";

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "PRICE"];

const ProductPageLayout = () => {
  const [pageInfoVisible, setPageInfoVisible] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});

  const ProductTableMemo = React.memo(ProductTable);
  const ProductFormMemo = React.memo(ProductForm);

  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }
    return {};
  }, [selectedProduct]);

  const handleAdd = () => {
    setIsEditForm(false);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  const handleRowClick = (prod) => {
    setSelectedProduct(prod);
    setIsEditForm(true);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  const handleCollapseForm = () => {
    setPageInfoVisible(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const fetchOptions = getFetchOptions("GET", null, true, false);
    const { id } = await hasOrganization(fetchOptions);
    const fetchedProducts = await getProducts(fetchOptions, id);
    setProducts(fetchedProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <div className="h-full w-full flex bg-gray-500">
      <div className="text-5xl self-center">loading</div>
    </div>
  ) : (
    <div className="h-full w-full flex flex-col md:flex-row gap-5 md:gap-10 justify-between ">
      <ProductTableWrapper title="PRODUCTS" handleAddProduct={handleAdd}>
        <ProductTableMemo
          onRowClick={handleRowClick}
          products={products}
          tableHeads={tableHeads}
          onProductUpdate={() => {
            setAreProductsUpdated((prev) => !prev);
          }}
        />
      </ProductTableWrapper>
      <ProductFormWrapper
        title="PRODUCT INFORMATION"
        pageInfoVisible={pageInfoVisible}
      >
        <ProductFormMemo
          updateForm={isEditForm}
          initialValues={isEditForm ? productValues : initialValues}
          collapseForm={handleCollapseForm}
          selectedProduct={selectedProduct}
          fetchProducts={() => fetchProducts(user)}
        />
      </ProductFormWrapper>
    </div>
  );
};

export default ProductPageLayout;
