export const createTableHandler = ({ state, fetchTableData }) => {
  const { page, sortBy, totalPages } = state;

  const searchItem = (keyword = "") => {
    fetchTableData({ searchKeyword: keyword });
  };

  const clearSearch = (searchRef) => {
    if (searchRef.current) {
      //clearInput is a function inside useImperativeHandle in searchBox Component
      searchRef.current.clearInput();
      fetchTableData();
    }
  };

  const handleSort = ({ key = "name", type = "asc", keyword = "" } = {}) => {
    if (key === "actions") {
      return;
    }
    fetchTableData({ searchKeyword: keyword, page, sortBy: { key, type } });
  };

  const pageNext = (keyword = "") => {
    if (page < totalPages) {
      const newPage = Number(page) + 1;
      fetchTableData({ searchKeyword: keyword, page: newPage, sortBy });
    }
  };

  const pagePrev = (keyword = "") => {
    if (page > 1) {
      const newPage = Number(page) - 1;
      fetchTableData({ searchKeyword: keyword, page: newPage, sortBy: state.sortBy });
    }
  };

  return {
    //table
    searchItem,
    clearSearch,
    handleSort,
    //pagination
    pageNext,
    pagePrev,
  };
};
