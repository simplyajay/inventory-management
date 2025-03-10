import React, { Children } from "react";
import { MoonLoader } from "react-spinners";

const TableLayout = ({ children, loading }) => {
  const [head, table, pagination] = Children.toArray(children);

  return (
    <div className={`lg:h-full h-[50%] w-full flex-1 flex flex-col shadow-md bg-[white]`}>
      <div className="w-full flex flex-col gap-1 shadow-sm ">{head}</div>
      <div className="overflow-hidden h-full">{table}</div>
      <div className="w-full">{pagination}</div>
    </div>
  );
};

export default TableLayout;
