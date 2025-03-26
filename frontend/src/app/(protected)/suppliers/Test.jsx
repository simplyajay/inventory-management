import React from "react";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/table/TableSkeleton";

const Test = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="md:h-[13%] w-full flex flex-col md:flex-row gap-2 justify-around items-start md:items-center p-3 border-b border-gray-300 bg-white">
        <div className="h-full flex-1 flex items-center justify-start  ">
          <div className="h-full w-full">
            <Skeleton width={70} height={15} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
        <div className="h-full flex-1 flex flex-col items-center justify-start ">
          <div className="h-full w-full">
            <Skeleton width={70} height={15} />
            <Skeleton width={140} height={20} />
          </div>
        </div>
        <div className="h-full flex-1 flex flex-col items-center justify-start ">
          <div className="h-full w-full">
            <Skeleton width={70} height={15} />
            <Skeleton width={130} height={20} />
          </div>
        </div>
      </div>
      <div className="flex-1 w-full">
        <TableSkeleton />
      </div>
    </div>
  );
};

export default Test;
