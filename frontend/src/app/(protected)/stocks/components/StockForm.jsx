"use client";
import React, { useState, useMemo } from "react";
import { createStockFormHandler } from "@/utils/form/stockForm.util";
import {
  getProductComponents,
  getProductFormValues,
  productFormLabels,
} from "@/utils/form/stockForm.util";
import BasicForm from "@/components/forms/basic-form/BasicForm";
import { FormLayout } from "@/components/forms/basic-form/FormLayout";
import { ClipLoader } from "react-spinners";
import { ProductSchema } from "@/utils/schema/product.validationSchema";

const StockForm = ({ state, fetchProducts, hideForm }) => {
  const [updating, setUpdating] = useState(false);
  const { pageInfoVisible, selectedProduct, isEditForm } = state;

  const formValues = useMemo(() => {
    if (isEditForm) {
      return getProductFormValues(selectedProduct);
    } else {
      return getProductFormValues();
    }
  }, [selectedProduct, isEditForm]);

  const { onFormSubmit } = createStockFormHandler({
    isEditForm,
    selectedProduct,
    setUpdating,
    fetchProducts,
    hideForm,
  });

  const formCancelProps = {
    text: "Cancel",
    onClick: hideForm,
  };

  const formSubmitProps = {
    text: isEditForm ? (updating ? "Saving" : "Save") : updating ? "Creating" : "Create",
    icon: updating && <ClipLoader color="#007d96" size={15} loading={updating} />,
  };

  const formComponents = getProductComponents(isEditForm);

  return (
    pageInfoVisible && (
      <div className={`lg:h-full lg:w-[30%] h-[40%]`}>
        <FormLayout
          title={isEditForm ? "PRODUCT INFORMATION" : "NEW PRODUCT"}
          pageInfoVisible={pageInfoVisible}
        >
          <BasicForm
            values={formValues}
            onSubmit={onFormSubmit}
            cancelProps={formCancelProps}
            submitProps={formSubmitProps}
            components={formComponents}
            loading={updating ? true : false}
            validationSchema={ProductSchema}
            labels={productFormLabels}
          />
        </FormLayout>
      </div>
    )
  );
};

export default StockForm;
