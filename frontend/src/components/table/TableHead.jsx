import React from "react";
import Skeleton from "react-loading-skeleton";
import SearchBox from "../searchbox/SearchBox";

const TableHead = ({
  initializing,
  title,
  searchRef,
  handleSearch,
  onButtonClick,
  buttonIcon,
  buttonText,
}) => {
  return (
    <div className="w-full gap-4 flex md:flex-row flex-col items-endcenter ">
      <div className="flex justify-center items-center">
        {initializing ? (
          <div className="w-[15%] lg:w-[7%]">
            <Skeleton height={30} />
          </div>
        ) : (
          <h1 className="text-xl font-sans select-none">{title}</h1>
        )}
      </div>
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
              <span className="flex items-center gap-2 justify-center">
                {buttonIcon && <i>{buttonIcon}</i>} <p>{buttonText}</p>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableHead;
