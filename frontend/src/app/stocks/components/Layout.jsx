"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { getInitialValues } from "../../../utils/schema/product.validationSchema";
import { getProductValues } from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { getProducts } from "@/services/products";
import { hasOrganization } from "@/services/authentication";

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "ACTIONS"];

const ProductPageLayout = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [ownerId, setOwnerId] = useState(null);

  const [pageInfoVisible, setPageInfoVisible] = useState(false);

  const [isEditForm, setIsEditForm] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const ProductTableMemo = React.memo(ProductTable);
  const ProductFormMemo = React.memo(ProductForm);

  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }
    return {};
  }, [selectedProduct]);

  const handleAdd = () => {
    const sku = getNextAvailableSku(products);
    const values = getInitialValues("sku", sku);
    setInitialValues(values);
    setIsEditForm(false);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  const handleRowClick = (prod) => {
    setSelectedProduct(prod);
  };

  const handleEdit = () => {
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
    setOwnerId(id);
    setLoading(false);
  };

  const getNextAvailableSku = (products) => {
    const skus = products
      .map((product) => parseInt(product.sku, 10))
      .sort((a, b) => a - b);

    for (let i = 0; i < skus.length; i++) {
      if (skus[i] !== i + 1) {
        return i + 1;
      }
    }

    return skus.length + 1;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <div className="h-full w-full flex bg-gray-500">
      <div className="text-5xl self-center">loading</div>
    </div>
  ) : (
    <div className="h-full w-full flex flex-col md:flex-row gap-5 md:gap-5 justify-between ">
      <ProductTableWrapper title="PRODUCTS" handleAddProduct={handleAdd}>
        <ProductTableMemo
          onRowClick={handleRowClick}
          products={products}
          tableHeads={tableHeads}
          onProductUpdate={() => {
            setAreProductsUpdated((prev) => !prev);
          }}
          handleEdit={handleEdit}
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
          fetchProducts={() => fetchProducts()}
          ownerId={ownerId}
        />
      </ProductFormWrapper>
    </div>
  );
};

export default ProductPageLayout;
