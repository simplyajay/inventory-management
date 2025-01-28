import React from "react";
import { MoonLoader } from "react-spinners";

const Table = ({ headers, bodies, actions, loading, messageWhenEmpty }) => {
  if (!headers || !bodies) throw new Error("Headers or bodies not found");

  if (!Array.isArray(headers) || !Array.isArray(bodies))
    throw new Error("Invalid Headers or bodies");

  return (
    <div className="w-full h-full overflow-auto">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <MoonLoader color="#29b8ea" size={60} />
        </div>
      ) : (
        <table
          className={`${bodies.length === 0 ? "h-full" : ""} w-full table-auto`}
        >
          <thead className="top-0 sticky z-10 bg-background">
            <tr className="shadow-sm">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-2 text-md font-thin overflow-clip"
                >
                  {header.name}
                </th>
              ))}
              {actions?.header && (
                <th className="px-3 py-2 text-md font-thin overflow-clip">
                  {actions.header}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="w-full">
            {bodies.length >= 1 ? (
              <>
                {bodies.map((body, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="text-center hover:bg-blue-50 border-b-2 px-2"
                  >
                    {headers.map((header, colIndex) => (
                      <td key={colIndex} className="py-2">
                        {body[header.key]}
                      </td>
                    ))}
                    {actions?.components && (
                      <td>
                        {actions.components.map((component, index) => (
                          <span key={index} className="py-2">
                            {React.cloneElement(component, { target: body })}
                          </span>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={headers.length}>
                  <div className="flex justify-center items-center h-full italic text-2xl">
                    <p className="text-gray-500 select-none">
                      {messageWhenEmpty}
                    </p>
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
