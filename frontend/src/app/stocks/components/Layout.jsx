"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductTable from "./Table";
import ProductForm from "./Form";
import ConfirmDialog from "@/components/Dialogs/ConfirmDialog";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { getInitialValues } from "../../../utils/schema/product.validationSchema";
import {
  getProductValues,
  getNextAvailableSku,
} from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { deleteProduct, getProducts } from "@/services/products";
import { useSelector } from "react-redux";
import { notify } from "@/components/Toast/ToastProvider";

const tableHeads = ["SKU", "NAME", "DESCRIPTION", "OUM", "QTY", "ACTIONS"];

const ProductPageLayout = () => {
  const { id, orgId } = useSelector((state) => state.authentication);
  const [state, setState] = useState({
    loading: true,
    deleting: false,
    products: [],
    selectedProduct: {},
    pageInfoVisible: false,
    showConfirmDialog: false,
    isEditForm: false,
    initialValues: {},
  });

  const {
    loading,
    deleting,
    products,
    selectedProduct,
    pageInfoVisible,
    showConfirmDialog,
    isEditForm,
    initialValues,
  } = state;

  const ProductTableMemo = React.memo(ProductTable);
  const ProductFormMemo = React.memo(ProductForm);
  const productValues = useMemo(() => {
    if (selectedProduct) {
      return getProductValues(selectedProduct);
    }

    return {};
  }, [selectedProduct]);

  const updateState = (updates) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  const handleOnAddProductClick = () => {
    const sku = getNextAvailableSku(products);
    const values = getInitialValues("sku", sku);
    updateState({
      initialValues: values,
      isEditForm: false,
      pageInfoVisible: true,
    });
  };

  const handleRowClick = (prod) => {
    updateState({ selectedProduct: prod });
  };

  const handleEditClick = () => {
    updateState({ isEditForm: true, pageInfoVisible: true });
  };

  const handleConfirmDeleteClick = async () => {
    const fetchOptions = getFetchOptions("DELETE", null, true, false);
    updateState({ deleting: false });
    await deleteProduct(fetchOptions, selectedProduct._id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    notify(`Successfully Deleted Product ${selectedProduct.name}`);
    updateState({
      pageInfoVisible: false,
      deleting: false,
      showConfirmDialog: false,
    });
    fetchProducts();
  };

  const handleCollapseForm = () => {
    updateState({ pageInfoVisible: false });
  };

  const fetchProducts = async () => {
    updateState({ loading: true });
    const fetchOptions = getFetchOptions("GET", null, true, false);
    const ownerId = orgId ? orgId : id;
    const fetchedProducts = await getProducts(fetchOptions, ownerId);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateState({ products: fetchedProducts, loading: false });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row md:flex-col gap-5 md:gap-5 justify-between ">
      <ProductTableWrapper
        title="PRODUCTS"
        onAddProductClick={handleOnAddProductClick}
        loading={loading}
      >
        <ProductTableMemo
          products={products}
          tableHeads={tableHeads}
          loading={loading}
          onRowClick={handleRowClick}
          onEditButtonClick={handleEditClick}
          onDeleteButtonclick={() => {
            updateState({ showConfirmDialog: true });
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
            onCancel: () => updateState({ showConfirmDialog: false }),
            customClass: "bg-gray-600",
          }}
          confirmProps={{
            text: deleting ? "Deleting..." : "Confirm",
            onConfirm: handleConfirmDeleteClick,
            customClass: "bg-red-500",
          }}
        />
      )}
    </div>
  );
};

export default ProductPageLayout;
