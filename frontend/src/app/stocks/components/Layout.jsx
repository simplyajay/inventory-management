"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { getInitialValues } from "../../../utils/schema/product.validationSchema";
import { getProductValues } from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { getProducts } from "@/services/products";
import { useSelector } from "react-redux";
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog";

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "ACTIONS"];

const ProductPageLayout = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const { id, orgId } = useSelector((state) => state.authentication);

  const [pageInfoVisible, setPageInfoVisible] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  const handleOnAddProductClick = () => {
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

  const handleEditClick = () => {
    setIsEditForm(true);
    if (!pageInfoVisible) {
      setPageInfoVisible(true);
    }
  };

  const handleConfirmDeleteClick = () => {
    setShowConfirmDialog(false);
  };

  const handleCollapseForm = () => {
    setPageInfoVisible(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const fetchOptions = getFetchOptions("GET", null, true, false);
    const ownerId = orgId ? orgId : id;
    const fetchedProducts = await getProducts(fetchOptions, ownerId);
    setProducts(fetchedProducts);
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
    <div className="h-full w-full flex flex-col lg:flex-row md:flex-col gap-5 md:gap-5 justify-between ">
      <ProductTableWrapper
        title="PRODUCTS"
        onAddProductClick={handleOnAddProductClick}
      >
        <ProductTableMemo
          onRowClick={handleRowClick}
          products={products}
          tableHeads={tableHeads}
          onProductUpdate={() => {
            setAreProductsUpdated((prev) => !prev);
          }}
          onEditButtonClick={handleEditClick}
          onDeleteButtonclick={() => {
            setShowConfirmDialog(true);
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
          fetchProducts={() => fetchProducts()}
          ownerId={orgId ? orgId : id}
        />
      </ProductFormWrapper>
      {showConfirmDialog && (
        <ConfirmDialog
          message={
            <>
              You are about to <strong className="text-red-500">Delete</strong>{" "}
              {selectedProduct.name}
            </>
          }
          cancelProps={{
            text: "Cancel",
            onCancel: () => setShowConfirmDialog(false),
            customClass: "bg-gray-600",
          }}
          confirmProps={{
            text: "Confirm",
            onConfirm: handleConfirmDeleteClick,
            customClass: "bg-red-500",
          }}
        />
      )}
    </div>
  );
};

export default ProductPageLayout;
