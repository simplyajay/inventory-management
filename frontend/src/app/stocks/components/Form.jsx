"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../utils/schema/product.validationSchema";
import { useSelector, useDispatch } from "react-redux";
import { updateProductById, fetchProducts } from "@/store/slices/productSlice";
import LabeledInput from "./LabeledInput";

const ProductForm = ({
  updateForm,
  initialValues,
  collapseForm,
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

  const { updating } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.authentication);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  const onSubmit = (values) => {
    dispatch(
      updateProductById({ productId: selectedProduct._id, product: values })
    )
      .then(() => {
        collapseForm();
      })
      .finally(() => {
        let targetId = user._orgId ? user._orgId : user._id;
        dispatch(fetchProducts(targetId));
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

          <div className="flex w-full justify-evenly h-full items-stretch gap-5">
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
            disabled={updating ? true : false}
          >
            {updateForm ? (updating ? "Saving..." : "Save") : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
