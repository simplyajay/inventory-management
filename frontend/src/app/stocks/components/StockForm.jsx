"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createStockFormHandler } from "@/utils/form/stockForm.util";
import {
  getProductFormInputs,
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
    disabled: updating ? true : false,
    text: isEditForm ? (updating ? "Saving" : "Save") : updating ? "Creating" : "Create",
    icon: updating && <ClipLoader color="#007d96" size={15} loading={updating} />,
  };

  const formInputs = getProductFormInputs(updating, isEditForm);

  return (
    pageInfoVisible && (
      <div className={`lg:h-full lg:w-[35%] h-[40%]`}>
        <FormLayout
          title={isEditForm ? "PRODUCT INFORMATION" : "NEW PRODUCT"}
          pageInfoVisible={pageInfoVisible}
        >
          <BasicForm
            updateForm={isEditForm}
            values={formValues}
            fetchProducts={() => fetchProducts()}
            onSubmit={onFormSubmit}
            cancelProps={formCancelProps}
            submitProps={formSubmitProps}
            inputs={formInputs}
            validationSchema={ProductSchema}
            labels={productFormLabels}
          />
        </FormLayout>
      </div>
    )
  );
};

export default StockForm;
