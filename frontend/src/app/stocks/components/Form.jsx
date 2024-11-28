"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { useSelector, useDispatch } from "react-redux";
import { updateProductById, fetchProducts } from "@/store/slices/productSlice";

const fieldClass =
  "p-2 text-sm rounded-lg focus:outline-none w-full focus:ring-2 focus:ring-blue-100 border border-gray-300";

const ProductForm = ({
  updateForm,
  initialValues,
  collapse,
  selectedProduct,
}) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, clearErrors, reset } = useForm({
    mode: "onBlur", //validate on blur
    resolver: yupResolver(validationSchema), // use Yup schema for validation
    defaultValues: initialValues,
    shouldFocusError: false,
  });
  const { errors } = formState;

  const { loading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onSubmit = (values) => {
    dispatch(
      updateProductById({ productId: selectedProduct._id, product: values })
    ).then(() => {
      let targetId = user._orgId ? user._orgId : user._id;
      dispatch(fetchProducts(targetId));
    });

    collapse();
  };

  return (
    <div className="h-full">
      <form
        name="add-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex-1 w-full overflow-auto flex flex-col items-center justify-around md:p-10 p-10 gap-2 md:gap-4 ">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm" htmlFor="sku">
              SKU
            </label>
            <input
              {...register("sku")}
              disabled
              autoComplete="off"
              id="sku"
              type="text"
              className={`${fieldClass} disabled:cursor-not-allowed`}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm" htmlFor="productname">
              Product Name
            </label>
            <input
              {...register("name")}
              disabled={loading ? true : false}
              autoComplete="off"
              id="productname"
              type="text"
              onFocus={() => clearErrors("name")}
              className={`${fieldClass}  ${
                errors.name && "ring-2 ring-red-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm" htmlFor="barcode">
              Barcode
            </label>
            <input
              {...register("barcode")}
              disabled={loading ? true : false}
              autoComplete="off"
              id="barcode"
              type="text"
              onFocus={() => clearErrors("barcode")}
              className={`${fieldClass}  ${
                errors.barcode && "ring-2 ring-red-100"
              }`}
            />
            {errors.barcode && (
              <p className="text-red-500 text-sm">{errors.barcode.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              disabled={loading ? true : false}
              autoComplete="off"
              id="description"
              name="description"
              className={fieldClass}
            ></textarea>
          </div>

          <div className="flex w-full justify-evenly h-full items-stretch gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm" htmlFor="quantity">
                {updateForm ? "Quantity" : "Initial Quantity"}
              </label>
              <input
                {...register("quantity")}
                id="quantity"
                autoComplete="off"
                type="text"
                disabled={updateForm ? true : loading ? true : false}
                onFocus={() => clearErrors("quantity")}
                className={`${fieldClass}  ${
                  errors.quantity && "ring-2 ring-red-100"
                } disabled:cursor-not-allowed`}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm" htmlFor="price">
                Price
              </label>
              <input
                {...register("price")}
                disabled={loading ? true : false}
                autoComplete="off"
                id="price"
                type="text"
                onFocus={() => clearErrors("price")}
                className={`${fieldClass}  ${
                  errors.price && "ring-2 ring-red-100"
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm" htmlFor="price">
                OUM
              </label>
              <select
                {...register("unitOfMeasurement")}
                name="unitOfMeasurement"
                id="unitOfMeasurement"
                onFocus={() => clearErrors("unitOfMeasurement")}
                className={`${fieldClass}  ${
                  errors.unitOfMeasurement && "ring-2 ring-red-100"
                }`}
              >
                <option>PC</option>
                <option>PKT</option>
                <option>CTN</option>
              </select>
              {errors.unitOfMeasurement && (
                <p className="text-red-500 text-sm">
                  {errors.unitOfMeasurement.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex md:justify-end justify-center p-3 gap-2 bg-background">
          <button
            type="button"
            onClick={() => {
              collapse();
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
