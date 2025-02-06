import { getFetchOptions } from "../../services/options";
import { deleteProduct } from "@/services/api/products";
import { getProducts } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";
import { EditIcon, DeleteIcon } from "@/components/icons/Icons";
import ActionButton from "@/components/table/ActionButton";

export const createPageHandler = ({ totalPages, state, updateState }) => {
  const { page, sortBy } = state;

  const fetchProducts = async ({ page = 1, searchKeyword = "", sortBy = {} } = {}) => {
    try {
      updateState({ loading: true });
      const fetchOptions = getFetchOptions("GET", null, true, false);
      fetchOptions.params = { page, sortBy: JSON.stringify(sortBy), searchKeyword };
      const data = await getProducts(fetchOptions);
      //  await new Promise((resolve) => setTimeout(resolve, 500)); // testing purposes only
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

  const deleteItem = async (selectedProduct) => {
    const fetchOptions = getFetchOptions("DELETE", null, true, false);
    updateState({ deleting: true });
    const data = await deleteProduct(fetchOptions, selectedProduct._id);
    //  await new Promise((resolve) => setTimeout(resolve, 500)); // testing purposes only
    notify(data.message);
    updateState({
      pageInfoVisible: false,
      deleting: false,
      showConfirmDialog: false,
      searchKeyword: "",
    });
    fetchProducts();
  };

  const searchItem = (keyword = "") => {
    if (keyword) {
      updateState({ searchKeyword: keyword });
      fetchProducts({ searchKeyword: keyword });
    }
  };

  const clearSearch = (searchRef) => {
    if (searchRef.current) {
      //clearInput is a function inside useImperativeHandle in searchBox Component
      searchRef.current.clearInput();
      updateState({ searchKeyword: "" });
      fetchProducts();
    }
  };

  const handleSort = ({ key = "name", type = "asc", keyword = "" } = {}) => {
    if (keyword) {
      fetchProducts({ searchKeyword: keyword, page, sortBy: { key, type } });
    } else {
      fetchProducts({ page, sortBy: { key, type } });
    }
    updateState({ sortBy: { key, type } });
  };

  const pageNext = (keyword = "") => {
    if (page < totalPages) {
      const newPage = Number(page) + 1;
      if (keyword) {
        fetchProducts({ searchKeyword: keyword, page: newPage, sortBy });
      } else {
        fetchProducts({ page: newPage, sortBy });
      }
    }
  };

  const pagePrev = (keyword = "") => {
    if (page > 1) {
      const newPage = Number(page) - 1;
      if (keyword) {
        fetchProducts({ searchKeyword: keyword, page: newPage, sortBy: state.sortBy });
      } else {
        fetchProducts({ page: newPage, sortBy: state.sortBy });
      }
    }
  };

  return {
    //table
    fetchProducts,
    deleteItem,
    searchItem,
    clearSearch,
    handleSort,

    //pagination
    pageNext,
    pagePrev,
  };
};

export const tableHeaders = [
  { name: "SKU", key: "sku" },
  { name: "NAME", key: "name" },
  { name: "DESCRIPTION", key: "description" },
  { name: "UNIT", key: "unitOfMeasurement" },
  { name: "QTY", key: "quantity" },
];

export const getTableActions = (handler) => {
  if (!handler) throw new Error("Missing handler");
  const tableActions = {
    header: "ACTIONS",
    components: [
      <ActionButton
        key={"edit"}
        onClick={(prod) =>
          handler({
            isEditForm: true,
            pageInfoVisible: true,
            selectedProduct: prod,
          })
        }
        icon={<EditIcon />}
      />,
      <ActionButton
        key={"delete"}
        onClick={(prod) => {
          handler({ showConfirmDialog: true, selectedProduct: prod });
        }}
        icon={<DeleteIcon />}
      />,
    ],
  };

  return tableActions;
};
