import { getFetchOptions } from "../../services/options";
import { deleteProduct } from "@/services/api/products";
import { getProducts } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";

export const createStockPageHandler = ({
  page,
  totalPages,
  state,
  updateState,
}) => {
  const fetchProducts = async ({ page = 1, searchKeyword = "" } = {}) => {
    const { sortBy } = state;
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy, searchKeyword };
      const data = await getProducts(fetchOptions);
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateState({
        products: data.products,
        totalPages: data.totalPages,
        loading: false,
        page: data.page,
        initializing: false,
      });
    } catch (error) {
      console.error("Error on fetchProducts at Layout ", error);
      updateState({ loading: true });
    }
  };

  return {
    //table
    fetchProducts,

    deleteItem: async (selectedProduct) => {
      const fetchOptions = getFetchOptions("DELETE", null, true, false);
      updateState({ deleting: true });
      const data = await deleteProduct(fetchOptions, selectedProduct._id);
      await new Promise((resolve) => setTimeout(resolve, 500)); // testing purposes only
      notify(data.message);
      updateState({
        pageInfoVisible: false,
        deleting: false,
        showConfirmDialog: false,
      });
      fetchProducts();
    },

    searchItem: (keyword = "") => {
      if (keyword) {
        updateState({ searchKeyword: keyword });
        fetchProducts({ searchKeyword: keyword });
      }
    },

    clearSearch: (searchRef) => {
      if (searchRef.current) {
        //clearInput is a function inside useImperativeHandle in searchBox Component
        searchRef.current.clearInput();
        updateState({ searchKeyword: "" });
        fetchProducts();
      }
    },

    //pagination
    pageNext: () => {
      if (page < totalPages) {
        const newPage = Number(page) + 1;
        fetchProducts({ page: newPage });
      }
    },

    pagePrev: () => {
      if (page > 1) {
        const newPage = Number(page) - 1;
        fetchProducts({ page: newPage });
      }
    },
  };
};

export const getProductValues = (product) => {
  return {
    sku: product.sku,
    name: product.name,
    barcode: product.barcode,
    description: product.description,
    unitOfMeasurement: product.unitOfMeasurement,
    quantity: product.quantity,
    price: product.price,
  };
};

export const getProductMetaData = (updating, updateForm) => {
  const metaData1 = [
    {
      name: "sku",
      disabled: updating,
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

  const metaData2 = [
    {
      name: "quantity",
      disabled: updateForm ? true : updating,
      customclass: "disabled:cursor-not-allowed",
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

  const combinedMetaDatas = [...metaData1, ...metaData2];

  return { metaData1, metaData2, combinedMetaDatas };
};
