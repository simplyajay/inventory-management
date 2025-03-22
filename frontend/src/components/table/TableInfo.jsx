import React from "react";
import Skeleton from "react-loading-skeleton";
import SearchBox from "../searchbox/SearchBox";
import { ButtonConfirmBlueLight } from "../button/CustomButtons";
import { Close } from "../icons/Icons";

const TableInfo = ({
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
    <div className="w-full flex flex-col items-end center py-1 px-2 gap-1">
      <div className="w-full flex md:flex-row flex-col justify-between items-center gap-1">
        <div className="w-full md:w-auto py-2 ">
          <h1 className="text-xl font-sans select-none">{title}</h1>
        </div>

        <div className="w-full flex-1 flex flex-row justify-between md:justify-end items-center gap-2">
          {searchRef && (
            <div className="w-[35%] md:w-[20%] ">
              <div className="flex md:justify-end justify-start w-full">
                <SearchBox ref={searchRef} onSearch={handleSearch} />
              </div>
            </div>
          )}
          <ButtonConfirmBlueLight onClick={onButtonClick} text={buttonText} />
        </div>
      </div>
      <div className="w-full flex flex-col gap-1 md:flex-row justify-start items-start md:items-center">
        {searchKeyword && (
          <div className="italic p-2 shadow-sm bg-[#dbe9ef] ">
            <div className="flex gap-4">
              <p>{`Showing results for keyword '${searchKeyword}'`}</p>
              <button onClick={() => handleSearchClear(searchRef)}>
                <Close />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableInfo;
