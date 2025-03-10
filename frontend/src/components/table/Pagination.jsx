import React from "react";
import { ChevronLeft, ChevronRight } from "../icons/Icons";
import Skeleton from "react-loading-skeleton";

const Pagination = ({ onPrevPage, onNextPage, loading, initializing, currentPage, totalPages }) => {
  return (
    <div className="flex-1 flex justify-center items-center p-2 w-full border-t border-gray-200 gap-10 select-none">
      <button
        onClick={onPrevPage}
        disabled={initializing ? initializing : loading}
        className={` ${
          initializing ? "p-1" : "p-2"
        } rounded-full hover:bg-slate-100 disabled:cursor-default`}
      >
        <span>{initializing ? <Skeleton circle width={20} height={20} /> : <ChevronLeft />}</span>
      </button>
      {initializing ? (
        <Skeleton width={60} height={20} />
      ) : (
        <div className="flex items-center text-center gap-4">
          <strong>{currentPage ? currentPage : 1}</strong>
          <p>of</p>
          <strong>{totalPages ? totalPages : 1}</strong>
        </div>
      )}

      <button
        onClick={onNextPage}
        disabled={initializing ? initializing : loading}
        className={`${
          initializing ? "p-1" : "p-2"
        } rounded-full disabled:cursor-default disabled:bg-transparent disabled:hover:bg-transparent hover:bg-slate-100  `}
      >
        <span>{initializing ? <Skeleton circle width={20} height={20} /> : <ChevronRight />}</span>
      </button>
    </div>
  );
};

export default Pagination;
