import React, { Children } from "react";
import { MoonLoader } from "react-spinners";

const TableLayout = ({ children, loading }) => {
  const [info, table, pagination] = Children.toArray(children);

  return (
    <div className={`h-full w-full flex flex-col`}>
      <div className="w-full flex flex-col gap-1 shadow-sm ">{info}</div>
      <div className="flex-1 overflow-hidden">{table}</div>
      <div className="w-full">{pagination}</div>
    </div>
  );
};

export default TableLayout;
