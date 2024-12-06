import React, { useEffect, useState } from "react";

const getValues = (key, comparators) => {
  const getHeader = () => {
    const comparator = comparators.find((comparator) => comparator.key === key);
    return comparator && comparator.header
      ? comparator.header
      : key.toUpperCase();
  };

  const getWidth = () => {
    const comparator = comparators.find((comparator) => comparator.key === key);
    return comparator && comparator.width ? comparator.width : 50;
  };

  const getBody = (props, cellType) => {
    const body = props.getValue();
    try {
      switch (cellType) {
        case "text":
          return <p>{body}</p>;
        case "input":
          return (
            <input
              className="bg-transparent p-1"
              spellCheck={false}
              type="text"
              value={body}
            />
          );
        case "select":
          return <select value={body}>{body}</select>;
        default:
          return null;
      }
    } catch (error) {
      console.log("Error at useTable :", error);
    }
  };

  return { getHeader, getWidth, getBody };
};

const getColumns = (keys, cellType, comparators) => {
  const columns = keys.map((key) => {
    const values = getValues(key, comparators);
    return {
      accessor: key,
      header: values.getHeader(),
      width: values.getWidth(),
      body: (props) => values.getBody(props, cellType),
    };
  });

  return columns;
};

const useTable = ({
  initialData = [],
  keys = [],
  cellType = "text",
  comparators = [],
}) => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const cols = getColumns(keys, cellType, comparators);
    setColumns(cols);
  }, [keys, , cellType]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const addRow = (newRow) => {
    setData((prev) => [...prev, newRow]);
  };

  return { columns, data, addRow };
};

export default useTable;
