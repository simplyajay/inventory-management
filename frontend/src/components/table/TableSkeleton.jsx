import React from "react";
import Skeleton from "react-loading-skeleton";

const heads = [40, 60, 50, 60, 60];
const bodies = [
  [150, 150, 80, 130, 120],
  [120, 140, 110, 90, 150],
  [90, 124, 100, 130, 90],
  [130, 180, 70, 150, 130],
  [122, 144, 100, 87, 140],
];
const TableSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col  bg-white">
      <div className="flex h-[10%] items-center justify-between border-b border-gray-300 p-3">
        <Skeleton width={120} height={30} />
        <Skeleton width={120} height={30} />
      </div>
      <div className="flex-1 w-full overflow-auto">
        <table className="w-full table-fixed border-separate">
          <thead>
            <tr className="bg-white">
              {heads.map((head, rowIndex) => (
                <th key={rowIndex} className="p-3 text-start">
                  <Skeleton width={head} height={20} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodies.map((body, rowIndex) => (
              <tr key={rowIndex}>
                {body.map((content, colIndex) => (
                  <td key={colIndex} className="p-3">
                    <div className="pr-2 overflow-hidden whitespace-nowrap">
                      <Skeleton width={content} height={20} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex self-end justify-center items-center p-3 gap-8">
        <Skeleton width={15} height={15} />
        <Skeleton width={40} height={20} />
        <Skeleton width={15} height={15} />
      </div>
    </div>
  );
};

export default TableSkeleton;
