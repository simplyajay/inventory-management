import React from "react";
import Skeleton from "react-loading-skeleton";
import SearchBox from "../searchbox/SearchBox";
import { ButtonConfirmBlue } from "../buttons/Buttons";
import { Close } from "../icons/Icons";

const TableHead = ({
  title,
  searchRef,
  handleSearch,
  handleSearchClear,
  onButtonClick,
  buttonIcon,
  buttonText,
  searchKeyword,
}) => {
  return (
    <div className="w-full gap-4 flex md:flex-row flex-col items-endcenter p-3">
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-sans select-none">{title}</h1>
      </div>
      <div className="flex-1 md:gap-5 w-full flex md:justify-end justify-between ">
        {searchKeyword && (
          <div className="italic inline-block p-2 shadow-sm bg-[#dbe9ef]">
            <div className="flex gap-4">
              <p>{`Showing results for keyword '${searchKeyword}'`}</p>
              <button onClick={() => handleSearchClear(searchRef)}>
                <Close />
              </button>
            </div>
          </div>
        )}
        {searchRef && (
          <div className="w-[35%] md:w-[20%]">
            <div className="flex md:justify-end justify-start w-full">
              <SearchBox ref={searchRef} onSearch={handleSearch} />
            </div>
          </div>
        )}
        <div className="w-auto">
          <ButtonConfirmBlue
            onClick={onButtonClick}
            className="w-full bg-blue-50 hover:bg-blue-100 rounded-sm p-2 select-none text-gray-800"
            text={buttonText}
          />
        </div>
      </div>
    </div>
  );
};

export default TableHead;
