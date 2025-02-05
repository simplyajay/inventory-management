"use client";
import React, { use, useEffect, useState } from "react";
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

  const headingClass =
    "px-3 py-2 text-md font-extralight border border-dotted border-gray-300 sticky top-0 bg-background shadow-sm";

  const bodyClass = "p-2 border border-dotted border-gray-300 whitespace-nowrap ";

  return (
    <div className="w-full h-full overflow-auto">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <MoonLoader color="#29b8ea" size={60} />
        </div>
      ) : (
        <table
          className={`${
            bodies.length === 0 ? "h-full" : ""
          } w-full table-auto border-separate border-spacing-0 antialiased scroll-smooth select-none`}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`${headingClass} cursor-pointer absolute resizer`}
                  onClick={() => {
                    if (handleSort && sortSetting) {
                      const type =
                        sortSetting.key === header.key
                          ? sortSetting.type === "asc"
                            ? "desc"
                            : "asc"
                          : "asc";
                      handleSort({
                        key: header.key,
                        type,
                        keyword: sortSetting.searchKeyword,
                      });
                    }
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <span>{header.name}</span>
                    {sortSetting && sortSetting.key === header.key ? (
                      <span>{sortSetting.type === "asc" ? <CaretUp /> : <CaretDown />}</span>
                    ) : (
                      <></>
                    )}
                  </div>
                </th>
              ))}
              {actions?.header && <th className={headingClass}>{actions.header}</th>}
            </tr>
          </thead>
          <tbody className="w-full">
            {bodies.length >= 1 ? (
              <>
                {bodies.map((body, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className={`${
                          isNaN(body[header.key]) ? "text-start" : "text-end"
                        } ${bodyClass}select-text`}
                      >
                        {body[header.key]}
                      </td>
                    ))}
                    {actions?.components && (
                      <td className={`${bodyClass} flex gap-1 justify-center`}>
                        {actions.components.map((component, index) => (
                          <div key={index}>{React.cloneElement(component, { target: body })}</div>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={actions ? headers.length + 1 : headers.length}>
                  <div className="flex justify-center items-center h-full italic text-2xl">
                    <p className="text-gray-500 select-none">{messageWhenEmpty}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
