import React from "react";
import SearchBox from "@/components/searchbox/SearchBox";
import Skeleton from "react-loading-skeleton";
import { Close } from "@/components/icons/Icons";

const TableLayout = ({
  children,
  title,
  onButtonClick,
  handleSearch,
  handleSearchClear,
  searchKeyword,
  initializing,
  loading,
  searchRef,
}) => {
  return (
    <div
      className={`lg:h-full h-[50%] w-full flex-1 flex flex-col rounded-lg shadow-md bg-[white]`}
    >
      <div className="w-full flex flex-col gap-1 rounded-t-lg p-3 border-gray-300 shadow-sm bg-background">
        {/*HEADER ROW 1*/}
        <div className="w-full gap-4 flex md:flex-row flex-col items-endcenter ">
          {/*TITLE */}
          <div className="flex justify-center items-center">
            {initializing ? (
              <div className="w-[15%] lg:w-[7%]">
                <Skeleton height={30} />
              </div>
            ) : (
              <h1 className="text-xl font-sans select-none">{title}</h1>
            )}
          </div>

          {/*ULITITIES */}
          <div className="flex-1 md:gap-5 w-full flex md:justify-end justify-between ">
            {searchRef && (
              <div className="w-[35%] md:w-[20%]">
                {initializing ? (
                  <div className="w-full">
                    <Skeleton height={30} />
                  </div>
                ) : (
                  <div className="flex md:justify-end justify-start w-full">
                    <SearchBox ref={searchRef} onSearch={handleSearch} />
                  </div>
                )}
              </div>
            )}

            <div className="w-auto">
              {initializing ? (
                <Skeleton height={30} width={100} />
              ) : (
                <button
                  id="addButton"
                  type="button"
                  onClick={onButtonClick}
                  className="w-full border border-gray-500 rounded-lg p-2 select-none"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>

        {/*HEADER ROW 2*/}
        <div>
          {loading ? (
            <></>
          ) : (
            <div
              className={`italic inline-block p-2 rounded-lg shadow-sm bg-[#dbe9ef] ${
                searchKeyword.length >= 1 ? "inline-block" : "hidden"
              }`}
            >
              <div className="flex gap-4">
                <span>{`Showing results for keyword '${searchKeyword}'`}</span>
                <button onClick={() => handleSearchClear(searchRef)}>
                  <Close />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-hidden h-full">{children}</div>
    </div>
  );
};

export default TableLayout;
