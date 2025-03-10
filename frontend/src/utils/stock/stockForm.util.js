import { getFetchOptions } from "@/services/options";
import { validateSku } from "@/services/api/products";
import { updateProduct, addProduct } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";

export const createStockFormHandler = ({
  isEditForm,
  selectedProduct,
  setUpdating,
  fetchProducts,
  hideForm,
}) => {
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

  const onFormSubmit = async ({ values = {}, setError, clearErrors, reset }) => {
    if (!setError || !clearErrors) throw new Error("SetError or ClearError must be a function");

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
      if (isEditForm) {
        const product = { _id: selectedProduct._id, ...values };
        const fetchOptions = getFetchOptions("PUT", product, true, false);
        data = await updateProduct(fetchOptions, product._id);
      } else {
        const fetchOptions = getFetchOptions("POST", values, true, false);
        data = await addProduct(fetchOptions);
      }

      //  await new Promise((resolve) => setTimeout(resolve, 500));
      notify(data.message);
      reset();
      fetchProducts();
    } catch (error) {
      console.error("Error on form submission ", error);
    } finally {
      setUpdating(false);
      hideForm();
    }
  };

  return { onFormSubmit };
};

export const getProductFormValues = (product = {}) => {
  return {
    sku: product.sku || "",
    name: product.name || "",
    barcode: product.barcode || "",
    description: product.description || "",
    unitOfMeasurement: product.unitOfMeasurement || "PCS",
    quantity: product.quantity || 0,
    price: product.price || 0,
  };
};

export const getProductFormInputs = (updating, updateForm) => {
  const formInputs = [
    {
      id: "sku",
      name: "sku",
      disabled: updating,
    },
    {
      id: "name",
      name: "name",
      disabled: updating,
    },
    {
      id: "barcode",
      name: "barcode",
      disabled: updating,
    },
    {
      id: "description",
      name: "description",
      disabled: updating,
      type: "textarea",
    },

    {
      id: "quantity",
      name: "quantity",
      disabled: updateForm ? true : updating,
      customclass: "disabled:cursor-not-allowed",
    },
    {
      id: "price",
      name: "price",
      disabled: updating,
    },
    {
      id: "unitOfMeasurement",
      name: "unitOfMeasurement",
      disabled: updating,
      type: "select",
      children: ["PCS", "PKT", "CTN", "OTR"],
    },
  ];

  return formInputs;
};
