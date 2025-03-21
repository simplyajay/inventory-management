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
    sku: product.sku || null,
    name: product.name || null,
    barcode: product.barcode || null,
    description: product.description || null,
    unitOfMeasurement: product.unitOfMeasurement || "PCS",
    quantity: product.quantity || 0,
    price: product.price || 0,
  };
};

export const getProductComponents = (updateForm) => {
  const values = getProductFormValues();
  return Object.keys(values).map((key) => {
    let obj = { id: key, name: key };

    if (key === "description") {
      obj.type = "textarea";
    } else if (key === "quantity") {
      obj.disabled = updateForm ? true : false;
      obj.customclass = "disabled:cursor-not-allowed";
    } else if (key === "unitOfMeasurement") {
      obj.type = "select";
      obj.children = ["PCS", "PKT", "CTN", "OTR"];
    }
    return obj;
  });
};

export const productFormLabels = [
  { name: "sku", text: "SKU" },
  { name: "unitOfMeasurement", text: "OUM" },
];
