"use client";
import React, { Children, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { updateProduct, addProduct } from "@/services/products";
import { notify } from "@/components/toast/ToastProvider";
import { ClipLoader } from "react-spinners";
import useInputGroup from "../../../components/forms/useInputGroup";

const Form = ({
  updateForm,
  initialValues,
  collapseForm,
  selectedProduct,
  fetchProducts,
  ownerId,
}) => {
  const [updating, setUpdating] = useState(false);

  const { register, handleSubmit, formState, clearErrors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const { errors } = formState;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onSubmit = async (values) => {
    setUpdating(true);
    let message = null;

    try {
      if (updateForm) {
        const product = { _id: selectedProduct._id, ...values };
        const fetchOptions = getFetchOptions("PUT", product, true, false);
        const updatedProduct = await updateProduct(fetchOptions, product._id);
        message = `Successfully Updated ${updatedProduct.name}`;
      } else {
        const product = { _orgId: ownerId, ...values };
        const fetchOptions = getFetchOptions("POST", product, true, false);
        const newProduct = await addProduct(fetchOptions);
        message = `Successfully Added new Product; ${newProduct.name}`;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      notify(message);
      fetchProducts();
    } catch (error) {
      console.error("Error on form submission ", error);
    } finally {
      setUpdating(false);
      collapseForm();
    }
  };

  const meta1 = [
    {
      name: "sku",
      disabled: true,
      customClass: "disabled: cursor-not-allowed",
    },
    {
      name: "name",
      disabled: updating,
    },
    {
      name: "barcode",
      disabled: updating,
    },
    {
      name: "description",
      disabled: updating,
      type: "textarea",
    },
  ];

  const meta2 = [
    {
      name: "quantity",
      disabled: updateForm ? true : updating,
      customClass: "disabled:cursor-not-allowed",
    },
    {
      name: "price",
      disabled: updating,
    },
    {
      name: "unitOfMeasurement",
      disabled: updating,
      type: "select",
      children: ["PCS", "PKT", "CTN", "OTR"],
    },
  ];

  const metas = [...meta1, meta2];
  const handlers = metas.map((meta) => ({
    accessor: meta.name,
    key: "onFocus",
    func: () => clearErrors(meta.name),
  }));

  const { renderInputs } = useInputGroup({
    register,
    handlers,
    errors,
    wrapperClassName: "flex flex-col gap-1 w-full",
  });

  return (
    <div className="h-full">
      <form
        name="add-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-1 w-full flex flex-col items-center justify-around lg:p-10 p-10 gap-2 lg:gap-4 overflow-auto">
          {renderInputs(meta1)}

          <div className="flex lg:flex-col w-full md:justify-evenly lg:justify-normal h-full gap-5">
            {renderInputs(meta2)}
          </div>
        </div>
        <div className="flex lg:justify-end md:justify-end justify-center p-3 gap-2 bg-background">
          <button
            type="button"
            onClick={() => {
              collapseForm();
              reset();
            }}
            className="border border-gray-500 rounded-lg py-1 px-2 min-w-[5em]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border border-gray-500 rounded-lg py-1 px-2 min-w-[5em]"
            disabled={updating ? true : false}
          >
            {updateForm ? (
              updating ? (
                <div className="flex gap-1 items-center justify-evenly">
                  <ClipLoader color="#007d96" size={15} loading={updating} />
                  <span>Saving</span>
                </div>
              ) : (
                <span>Save</span>
              )
            ) : updating ? (
              <div className="flex gap-1 items-center justify-evenly">
                <ClipLoader color="#007d96" size={15} loading={updating} />
                <span>Creating</span>
              </div>
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
