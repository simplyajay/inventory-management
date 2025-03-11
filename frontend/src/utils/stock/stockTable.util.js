import { getFetchOptions } from "../../services/options";
import { deleteProduct } from "@/services/api/products";
import { getProducts } from "@/services/api/products";
import { notify } from "@/components/toast/ToastProvider";
import { EditIcon, DeleteIcon } from "@/components/icons/Icons";
import ActionButton from "@/components/table/TableAction";

export const createStockTableHandler = ({ state, updateState, fetchProducts }) => {
  const { page, sortBy, totalPages } = state;

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
    });
    fetchProducts();
  };

  const searchItem = (keyword = "") => {
    if (keyword) {
      fetchProducts({ searchKeyword: keyword });
    }
  };

  const clearSearch = (searchRef) => {
    if (searchRef.current) {
      //clearInput is a function inside useImperativeHandle in searchBox Component
      searchRef.current.clearInput();
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

//widths in percentage; can be optional
export const tableHeaders = [
  { name: "SKU", key: "sku" },
  { name: "NAME", key: "name", width: 50 },
  { name: "DESCRIPTION", key: "description" },
  { name: "UNIT", key: "unitOfMeasurement" },
  { name: "QTY", key: "quantity" },
];

export const getTableActions = (handler) => {
  if (!handler) throw new Error("Missing handler");
  const tableActions = {
    name: "ACTIONS",
    key: "actions",
    components: [
      <ActionButton
        key={"edit"}
        onClick={(prod) => {
          handler({
            isEditForm: true,
            pageInfoVisible: true,
            selectedProduct: prod,
          });
        }}
        icon={<EditIcon />}
      />,
      <ActionButton
        key={"delete"}
        onClick={(prod) => {
          handler({
            showConfirmDialog: true,
            selectedProduct: prod,
            isEditForm: false,
            pageInfoVisible: false,
          });
        }}
        icon={<DeleteIcon />}
      />,
    ],
  };

  return tableActions;
};
