"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import { CaretDown, CaretUp } from "../icons/Icons";

const Table = ({
  loading,
  headers,
  bodies,
  actions,
  messageWhenEmpty,
  sortSetting,
  handleSort,
  handleRowClick,
}) => {
  if (!headers || !bodies) throw new Error("Headers or bodies not found");

  if (!Array.isArray(headers) || !Array.isArray(bodies))
    throw new Error("Invalid Headers or bodies");

  const headingClass =
    "px-3 py-2 text-md font-extralight sticky top-0 bg-white shadow-sm border border-dotted";

  const bodyClass = "p-2 border border-dotted border-gray-300 ";

  const tableRef = useRef(null);
  const headerRefs = useRef([]);
  const resizeRef = useRef(false);

  //default width is determined by the column count including actions ( by percentage )
  const [columns, setColumns] = useState(() => {
    const newColumns = [...headers];

    if (actions) {
      newColumns.push({
        name: actions.name,
        key: actions.key,
        width: 10,
      });
    }

    let totalWidth = 0;

    newColumns.forEach((header) => {
      if (header.width !== undefined) {
        totalWidth += parseInt(header.width);
      }
    });

    const defaultWidth = (100 - totalWidth) / headers.length;

    return newColumns.map((header) => ({
      ...header,
      width: header.width !== undefined ? header.width : defaultWidth,
    }));
  });

  let startX, startWidth;
  const offset = 15;

  const handleMouseMove = useCallback((e) => {
    //these are the table columns not including the action column
    headerRefs.current.forEach((header) => {
      const rect = header.getBoundingClientRect();

      if (e.pageX > rect.right - offset) {
        header.style.cursor = "col-resize";
      } else {
        header.style.cursor = "pointer";
      }
    });
  });

  const handleMouseDown = useCallback(
    (e) => {
      const header = e.currentTarget;
      const index = headerRefs.current.indexOf(header);

      if (index === -1 || index === columns.length - 1) return; //ignore last column

      const rect = header.getBoundingClientRect();

      if (e.pageX > rect.right - offset) {
        resizeRef.current = true;
        startX = e.pageX;

        // startwidth; starting width of the current column.
        // nextWidth; starting width of the column after the current column
        // newWdith;  width after resize of the current column.
        // newNextWidth; width after resize of the column after the current column.
        startWidth = columns[index].width;
        const nextWidth = columns[index + 1]?.width || 0;

        let newWidth, newNextWidth, percentChange;

        const handleResize = (moveEvent) => {
          if (!resizeRef.current) return;

          const diffX = moveEvent.pageX - startX; // change in X pos from start to end of drag
          const tableWidth = tableRef.current.getBoundingClientRect().width;
          percentChange = Math.abs(diffX / tableWidth) * 100; // pixel to percentage of x pos change ( conver to absolute value )

          const isDraggingToRight = moveEvent.pageX > startX;

          if (isDraggingToRight) {
            newWidth = Math.max(10, parseFloat(startWidth) + parseFloat(percentChange)); //add the change to the width of current column.
            newNextWidth = Math.max(10, parseFloat(nextWidth) - parseFloat(percentChange)); // deduct the change to the width of the next column.
          } else {
            newWidth = Math.max(10, parseFloat(startWidth) - parseFloat(percentChange)); //deduct the change to the width of current column.
            if (newWidth === 10) return;
            newNextWidth = Math.max(10, parseFloat(nextWidth) + parseFloat(percentChange)); // add the change to the width of the next column.
          }
        };

        const stopResize = () => {
          const tableWidth = tableRef.current.getBoundingClientRect().width;
          const columnWidthInPixels = (parseFloat(columns[index].width) / 100) * tableWidth;

          setColumns((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], width: newWidth }; //set newWidth to this column
            updated[index + 1] = {
              ...updated[index + 1],
              width:
                updated[index + 1]?.width !== undefined ? updated[index + 1].width : newNextWidth,
            }; //set new width to this column
            return updated;
          });

          setTimeout(() => {
            resizeRef.current = false; // Delay to allow click event to process
          }, 50);
          document.removeEventListener("mousemove", handleResize);
          document.removeEventListener("mouseup", stopResize);
        };

        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", stopResize);
      }
    },
    [columns]
  );

  useEffect(() => {
    headerRefs.current.forEach((headerRef) => {
      if (!headerRef) return;

      headerRef.addEventListener("mousemove", handleMouseMove);
      headerRef.addEventListener("mousedown", handleMouseDown);
    });

    return () => {
      headerRefs.current.forEach((headerRef) => {
        if (!headerRef) return;

        headerRef.removeEventListener("mousemove", handleMouseMove);
        headerRef.removeEventListener("mousedown", handleMouseDown);
      });
    };
  }, [handleMouseDown, handleMouseMove]);

  const handleHeaderclick = (header) => {
    if (resizeRef.current) return;

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

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full w-full overflow-auto select-none">
        <table
          ref={tableRef}
          className={`w-full border-collapse border-spacing-0 scroll-smooth table-fixed ${
            loading ? "h-full" : bodies.length === 0 ? "h-full" : "" // when loading or if bodies' length is 0, table should have full height
          }`}
        >
          <thead>
            <tr>
              {columns.map((header, index) => (
                <th
                  ref={(el) => (headerRefs.current[index] = el)}
                  key={index}
                  style={{ width: `${header.width}%` }} // width from headers in percentage
                  className={`${headingClass} hidden lg:table-cell`}
                  onClick={() => handleHeaderclick(header)}
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
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="flex h-full w-full items-center justify-center">
                    <MoonLoader color="#29b8ea" size={60} />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {bodies.length >= 1 ? (
                <>
                  {bodies.map((body, rowIndex) => (
                    <tr key={rowIndex} onClick={() => handleRowClick && handleRowClick(body)}>
                      {columns.map((header, colIndex) => {
                        const isLast = colIndex === columns.length - 1;
                        return (
                          <td
                            key={colIndex}
                            className={`${
                              isNaN(body[header.key]) ? "text-start" : "text-end"
                            } ${bodyClass} select-text block lg:table-cell `}
                          >
                            {/* if last index, check if actions is truthy. if so, render action components  */}
                            {isLast && actions?.components ? (
                              <div className="flex gap-1 justify-center">
                                {actions.components.map((component, index) => (
                                  <div key={index}>
                                    {React.cloneElement(component, { target: body })}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="pr-2 overflow-hidden whitespace-nowrap">
                                {header.object && body[header.object]
                                  ? body[header.object][header.key]
                                  : body[header.key]}
                              </div>
                            )}
                          </td>
                        );
                      })}
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
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
