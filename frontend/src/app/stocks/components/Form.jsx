"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { getFetchOptions } from "@/services/options";
import { updateProduct, addProduct } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";
import { validateSku } from "@/services/api/products";
import { ClipLoader } from "react-spinners";
import { getProductMetaData } from "@/utils/stock/stockForm.util";
import { ButtonConfirmBlue, ButtonCancelGrayLight } from "@/components/buttons/buttons";
import useInputGroup from "../../../components/forms/useInputGroup";

const Form = ({ updateForm, initialValues, collapseForm, selectedProduct, fetchProducts }) => {
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, formState, clearErrors, reset, setValue, setError } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const { errors } = formState;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const validate = async (sku) => {
    try {
      const fetchOptions = getFetchOptions(
        "POST",
        { sku, targetId: selectedProduct._id },
        true,
        false
      );
      const data = await validateSku(fetchOptions);

      return data;
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const onSubmit = async (values) => {
    setUpdating(true);
    const targetSku = await validate(values.sku);

    if (!targetSku.isValid) {
      setError("sku", {
        type: "manual",
        message: targetSku.message,
      });
      setUpdating(false);
      return;
    }

    clearErrors("sku");

    try {
      let data = null;
      if (updateForm) {
        const product = { _id: selectedProduct._id, ...values };
        const fetchOptions = getFetchOptions("PUT", product, true, false);
        data = await updateProduct(fetchOptions, product._id);
      } else {
        const fetchOptions = getFetchOptions("POST", values, true, false);
        data = await addProduct(fetchOptions);
      }

      //  await new Promise((resolve) => setTimeout(resolve, 500));
      notify(data.message);
      fetchProducts();
    } catch (error) {
      console.error("Error on form submission ", error);
    } finally {
      setUpdating(false);
      collapseForm();
    }
  };

  const { metaData1, metaData2, combinedMetaDatas } = getProductMetaData(updating, updateForm);
  const handlers = combinedMetaDatas.map((meta) => ({
    accessor: meta.name,
    key: "onFocus",
    func: () => clearErrors(meta.name),
  }));

  const { renderInputs } = useInputGroup({
    register,
    handlers,
    errors,
    wrapperClassName: "flex flex-col gap-1 w-full",
    setValue,
  });

  return (
    <div className="h-full">
      <form
        name="add-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-1 w-full flex flex-col items-center justify-around lg:p-10 p-10 gap-2 lg:gap-4 overflow-auto">
          {renderInputs(metaData1)}

          <div className="flex lg:flex-col w-full md:justify-evenly lg:justify-normal h-full gap-5">
            {renderInputs(metaData2)}
          </div>
        </div>
        <div className="flex lg:justify-end md:justify-end justify-center p-3 gap-2 border-t border-gray-200">
          <ButtonCancelGrayLight
            type="button"
            onClick={() => {
              collapseForm();
              reset();
            }}
            text="Cancel"
          />

          <ButtonConfirmBlue
            type="submit"
            disabled={updating ? true : false}
            text={updateForm ? (updating ? "Saving" : "Save") : updating ? "Creating" : "Create"}
            icon={updating && <ClipLoader color="#007d96" size={15} loading={updating} />}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
