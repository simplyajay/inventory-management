import React, { Children } from "react";
import { Close } from "@/components/icons/Icons";

const TableLayout = ({
  children,
  handleSearchClear,
  searchKeyword,
  loading,
  searchRef,
}) => {
  const [child1, child2] = Children.toArray(children);

  return (
    <div
      className={`lg:h-full h-[50%] w-full flex-1 flex flex-col rounded-lg shadow-md bg-[white]`}
    >
      <div className="w-full flex flex-col gap-1 rounded-t-lg p-3 border-gray-300 shadow-sm bg-background">
        <>{child1}</>
        <>
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
        </>
      </div>
      <div className="overflow-hidden h-full">{child2}</div>
    </div>
  );
};

export default TableLayout;
