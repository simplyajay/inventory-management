"use client";
import React, { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { updateProduct, addProduct } from "@/services/products";
import { notify } from "@/components/toast/ToastProvider";
import { ClipLoader } from "react-spinners";

const ProductForm = ({
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

  const handleOnSubmit = async (values) => {
    let fetchOptions = {};
    setUpdating(true);
    let message = null;

    if (updateForm) {
      const product = { _id: selectedProduct._id, ...values };
      fetchOptions = getFetchOptions("PUT", product, true, false);
      const updatedProduct = await updateProduct(fetchOptions, product._id);
      message = `Successfully Updated ${updatedProduct.name}`;
    } else {
      const product = { _orgId: ownerId, ...values };
      fetchOptions = getFetchOptions("POST", product, true, false);
      const newProduct = await addProduct(fetchOptions);
      message = `Successfully Added new Product; ${newProduct.name}`;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    notify(message);
    setUpdating(false);
  };

  const onSubmit = (values) => {
    handleOnSubmit(values)
      .then(() => {
        fetchProducts();
      })
      .finally(() => {
        collapseForm();
      });
  };

  return (
    <div className="h-full">
      <form
        name="add-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-1 w-full flex flex-col items-center justify-around lg:p-10 p-10 gap-2 lg:gap-4 overflow-auto">
          <LabeledInput
            register={register}
            disabled
            name="sku"
            customClass="disabled:cursor-not-allowed"
          />

          <LabeledInput
            register={register}
            disabled={updating ? true : false}
            name="name"
            onFocus={() => () => clearErrors("name")}
            customClass={`${errors.name && `ring-2 ring-red-100`}`}
            errors={errors.name}
          />

          <LabeledInput
            register={register}
            disabled={updating ? true : false}
            name="barcode"
            onFocus={() => () => clearErrors("barcode")}
            customClass={`${errors.name && `ring-2 ring-red-100`}`}
            errors={errors.barcode}
          />

          <LabeledInput
            register={register}
            disabled={updating ? true : false}
            name="description"
            onFocus={() => () => clearErrors("description")}
            errors={errors.description}
            type="textArea"
          />

          <div className="flex lg:flex-col w-full md:justify-evenly lg:justify-normal h-full gap-5">
            <LabeledInput
              register={register}
              disabled={updateForm ? true : updating ? true : false}
              name="quantity"
              onFocus={() => () => clearErrors("quantity")}
              customClass={`${
                errors.quantity &&
                `ring-2 ring-red-100 disabled:cursor-not-allowed`
              }`}
              errors={errors.quantity}
            />

            <LabeledInput
              register={register}
              disabled={updating ? true : false}
              name="price"
              onFocus={() => () => clearErrors("price")}
              customClass={`${errors.quantity && `ring-2 ring-red-100 `}`}
              errors={errors.price}
            />

            <LabeledInput
              register={register}
              disabled={updating ? true : false}
              name="unitOfMeasurement"
              onFocus={() => () => clearErrors("unitOfMeasurement")}
              type="select"
            >
              <option>PC</option>
              <option>PKT</option>
              <option>CTN</option>
            </LabeledInput>
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

export default ProductForm;
