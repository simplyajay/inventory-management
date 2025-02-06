"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
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

  const tableRef = useRef(null);
  const headerRefs = useRef([]);
  const resizeRef = useRef(false);
  const [columnWidths, setColumnWidths] = useState({});

  let startX, startWidth;
  const offset = 10;

  const handleMouseMove = useCallback((e) => {
    headerRefs.current.forEach((header) => {
      const rect = header.getBoundingClientRect();

      if (e.pageX > rect.right - offset) {
        header.style.cursor = "col-resize";
      } else {
        header.style.cursor = "pointer";
      }
    });
  });

  const handleMouseDown = useCallback((e) => {
    const header = e.currentTarget;
    const rect = header.getBoundingClientRect();
    const index = headerRefs.current.indexOf(header);

    if (e.pageX > rect.right - offset) {
      resizeRef.current = true;
      startX = e.pageX;
      startWidth = header.offsetWidth;
      let newWidth;

      const handleResize = (x) => {
        if (!resizeRef.current) return;

        const tableRect = tableRef.current.getBoundingClientRect();
        const clampedX = Math.min(x.pageX, tableRect.right);
        newWidth = Math.max(50, startWidth + (clampedX - startX));
      };

      const stopResize = () => {
        setColumnWidths((prev) => ({ ...prev, [index]: newWidth }));
        setTimeout(() => {
          resizeRef.current = false; // Delay to allow click event to process
        }, 50);
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", stopResize);
      };

      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResize);
    }
  });

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
    <div className="w-full h-full overflow-auto select-none">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <MoonLoader color="#29b8ea" size={60} />
        </div>
      ) : (
        <table
          ref={tableRef}
          className={`${
            bodies.length === 0 ? "h-full" : ""
          } w-full table-auto border-collapse border-spacing-0 scroll-smooth`}
        >
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  ref={(el) => (headerRefs.current[index] = el)}
                  key={index}
                  style={{ width: columnWidths[index] ? `${columnWidths[index]}px` : "auto" }}
                  className={`${headingClass}`}
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
