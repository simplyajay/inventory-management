"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createStockFormHandler } from "@/utils/stock/stockForm.util";
import { getProductFormInputs, getProductFormValues } from "@/utils/stock/stockForm.util";
import Form from "@/components/form/Form";
import { FormLayout } from "@/components/form/FormLayout";
import { ClipLoader } from "react-spinners";

const StockFormLayout = ({
  fetchProducts,
  pageInfoVisible,
  hideForm,
  selectedProduct,
  isEditForm,
}) => {
  const [updating, setUpdating] = useState(false);

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
          <Form
            updateForm={isEditForm}
            values={formValues}
            fetchProducts={() => fetchProducts()}
            onSubmit={onFormSubmit}
            cancelProps={formCancelProps}
            submitProps={formSubmitProps}
            inputs={formInputs}
          />
        </FormLayout>
      </div>
    )
  );
};

export default StockFormLayout;
