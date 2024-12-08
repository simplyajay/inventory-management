"use client";
import React, { useEffect, useMemo, useState } from "react";
import ProductForm from "@/app/stocks/components/Form";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import Table from "@/components/table/Table";
import { notify } from "@/components/toast/ToastProvider";
import { ProductTableWrapper, ProductFormWrapper } from "./Wrapper";
import { getInitialValues } from "../../../utils/schema/product.validationSchema";
import {
  getProductValues,
  getNextAvailableSku,
} from "@/utils/stock/product.util";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { deleteProduct, getProducts } from "@/services/products";

const keys = ["sku", "name", "description", "unitOfMeasurement", "quantity"];
const comparators = [
  { key: "sku", header: "SKU", width: 50 },
  { key: "unitOfMeasurement", header: "OUM", width: 50 },
  { key: "quantity", header: "QTY", width: 50 },
];

const ProductPageLayout = () => {
  const [state, setState] = useState({
    loading: true,
    deleting: false,
    products: [],
    selectedProduct: {},
    pageInfoVisible: false,
    showConfirmDialog: false,
    isEditForm: false,
    initialValues: {},
    page: 1,
    limit: 15,
    sortBy: "sku",
    totalPages: 0,
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
    page,
    limit,
    sortBy,
    totalPages,
  } = state;

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

  const handleConfirmDeleteClick = async () => {
    const fetchOptions = getFetchOptions("DELETE", null, true, false);
    updateState({ deleting: true });
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

  const handlePageChange = (action) => {
    switch (action) {
      case "prev":
        if (page > 1) {
          updateState({ page: page - 1 });
        }
        break;
      case "next":
        if (page < totalPages) {
          updateState({ page: page + 1 });
          console.log("next");
        }
        break;
      default:
        return;
    }
  };

  const fetchProducts = async () => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, limit, sortBy };
      const data = await getProducts(fetchOptions);
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateState({
        products: data.products,
        totalPages: data.totalPages,
        loading: false,
      });
    } catch (error) {
      console.error("Error on fetchProducts at Layout ", error);
      updateState({ loading: true });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="h-full w-full flex flex-col lg:flex-row gap-5 md:gap-5 justify-between ">
      <ProductTableWrapper
        title="PRODUCTS"
        onAddProductClick={handleOnAddProductClick}
        loading={loading}
      >
        <Table
          content={products}
          keys={keys}
          cellType="text"
          onRowClick={(prod) => updateState({ selectedProduct: prod })}
          onEdit={() =>
            updateState({ isEditForm: true, pageInfoVisible: true })
          }
          onDelete={() => {
            updateState({ showConfirmDialog: true });
          }}
          onPrevPage={() => handlePageChange("prev")}
          onNextPage={() => handlePageChange("next")}
          comparators={comparators}
          page={page}
          totalPages={totalPages}
          loading={loading}
        />
      </ProductTableWrapper>

      <ProductFormWrapper
        title="PRODUCT INFORMATION"
        pageInfoVisible={pageInfoVisible}
      >
        <ProductFormMemo
          updateForm={isEditForm}
          initialValues={isEditForm ? productValues : initialValues}
          collapseForm={() => updateState({ pageInfoVisible: false })}
          selectedProduct={selectedProduct}
          fetchProducts={() => fetchProducts()}
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
            customClass: `${deleting ? `hover:cursor-` : ``} bg-red-500`,
            loading: deleting,
          }}
        />
      )}
    </div>
  );
};

export default ProductPageLayout;
