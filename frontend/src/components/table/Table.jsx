"use client";
import React, { useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import { CaretDown, CaretUp } from "../icons/Icons";

const Table = ({
  headers,
  bodies,
  actions,
  loading,
  messageWhenEmpty,
  handleSort,
  sortSetting,
}) => {
  if (!headers || !bodies) throw new Error("Headers or bodies not found");
  if (!Array.isArray(headers) || !Array.isArray(bodies))
    throw new Error("Invalid Headers or bodies");

  const [columnWidths, setColumnWidths] = useState(
    headers.map(() => 150) // Default width for each column
  );

  const headingClass =
    "px-3 py-2 text-md font-extralight border border-dotted border-gray-300 bg-background shadow-sm relative";

  const bodyClass = "w-full p-2 border border-dotted border-gray-300 select-text overflow-hidden";

  const handleHeaderclick = (header) => {
    if (handleSort && sortSetting) {
      const type =
        sortSetting.key === header.key ? (sortSetting.type === "asc" ? "desc" : "asc") : "asc";
      handleSort({
        key: header.key,
        type,
        keyword: sortSetting.searchKeyword,
      });
    }
  };

  const handleMouseDown = (index, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidths = [...columnWidths];

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidths = [...startWidths];
      newWidths[index] = Math.max(80, startWidths[index] + deltaX);
      newWidths[index + 1] = Math.max(80, startWidths[index + 1] - deltaX);
      setColumnWidths(newWidths);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div id="wrapper" className="w-full h-full overflow-auto select-none">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <MoonLoader color="#29b8ea" size={60} />
        </div>
      ) : (
        <div
          id="table"
          className={`${
            bodies.length === 0 ? "h-full" : ""
          } flex flex-col w-full h-full scroll-smooth`}
        >
          <div className="flex flex-col">
            {/* header row */}
            <div id="head" className="flex w-full ">
              {headers.map((header, index) => (
                <div
                  key={index}
                  style={{ width: `${columnWidths[index]}px` }}
                  className={`${headingClass}`}
                  onClick={() => handleHeaderclick(header)}
                >
                  <div className="flex w-full gap-2 items-center">
                    <span>{header.name}</span>
                    {sortSetting && sortSetting.key === header.key ? (
                      <span>{sortSetting.type === "asc" ? <CaretUp /> : <CaretDown />}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                  {index < headers.length && (
                    <div
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-gray-400 hover:bg-gray-600"
                      onMouseDown={(event) => handleMouseDown(index, event)}
                    ></div>
                  )}
                </div>
              ))}
              {actions?.header && <th className={headingClass}>{actions.header}</th>}
            </div>
            {/* body row */}
            <div id="body" className="w-full">
              {bodies.length >= 1 ? (
                <>
                  {bodies.map((body, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {headers.map((header, colIndex) => (
                        <div
                          key={colIndex}
                          style={{ width: `${columnWidths[colIndex]}px` }}
                          className={`${
                            isNaN(body[header.key]) ? "text-start" : "text-end"
                          } ${bodyClass}`}
                        >
                          <span className="block w-full h-full pr-2 whitespace-nowrap overflow-hidden">
                            {body[header.key]}
                          </span>
                        </div>
                      ))}
                      {actions?.components && (
                        <div className={`${bodyClass} flex gap-1 justify-center`}>
                          {actions.components.map((component, index) => (
                            <div key={index}>{React.cloneElement(component, { target: body })}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <div colSpan={actions ? headers.length + 1 : headers.length}>
                    <div className="flex justify-center items-center h-full italic text-2xl">
                      <p className="text-gray-500 select-none">{messageWhenEmpty}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
