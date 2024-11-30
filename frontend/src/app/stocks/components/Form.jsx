"use client";
import React, { useEffect, useState } from "react";
import LabeledInput from "./LabeledInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { getFetchOptions } from "@/utils/api-request/fetchOptions";
import { updateProduct } from "@/services/products";

const ProductForm = ({
  updateForm,
  initialValues,
  collapseForm,
  selectedProduct,
  fetchProducts,
}) => {
  const { register, handleSubmit, formState, clearErrors, reset } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const { errors } = formState;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const handleUpdateOnSave = async (values) => {
    const product = values;
    const productToUpdate = { _id: selectedProduct._id, ...product };
    const fetchOptions = getFetchOptions("PUT", productToUpdate, true, false);
    setLoading(true);
    await updateProduct(fetchOptions, selectedProduct._id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  };

  const onSubmit = (values) => {
    handleUpdateOnSave(values)
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
        <div className="flex-1 w-full overflow-auto flex flex-col items-center justify-around md:p-10 p-10 gap-2 md:gap-4 ">
          <LabeledInput
            register={register}
            disabled
            name="sku"
            customClass="disabled:cursor-not-allowed"
          />

          <LabeledInput
            register={register}
            disabled={loading ? true : false}
            name="name"
            onFocus={() => () => clearErrors("name")}
            customClass={`${errors.name && `ring-2 ring-red-100`}`}
            errors={errors.name}
          />

          <LabeledInput
            register={register}
            disabled={loading ? true : false}
            name="barcode"
            onFocus={() => () => clearErrors("barcode")}
            customClass={`${errors.name && `ring-2 ring-red-100`}`}
            errors={errors.barcode}
          />

          <LabeledInput
            register={register}
            disabled={loading ? true : false}
            name="description"
            onFocus={() => () => clearErrors("description")}
            errors={errors.description}
            type="textArea"
          />

          <div className="flex w-full justify-evenly h-full items-stretch gap-5">
            <LabeledInput
              register={register}
              disabled={updateForm ? true : loading ? true : false}
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
              disabled={loading ? true : false}
              name="price"
              onFocus={() => () => clearErrors("price")}
              customClass={`${errors.quantity && `ring-2 ring-red-100 `}`}
              errors={errors.price}
            />

            <LabeledInput
              register={register}
              disabled={loading ? true : false}
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
        <div className="flex md:justify-end justify-center p-3 gap-2 bg-background">
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
            disabled={loading ? true : false}
          >
            {updateForm ? (loading ? "Saving..." : "Save") : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
