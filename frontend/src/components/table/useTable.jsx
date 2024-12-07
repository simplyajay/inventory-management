import { useEffect, useState } from "react";
import { getActions, getColumns } from "./table.helpers";

const useTable = ({
  initialData = [],
  keys = [],
  cellType = "text",
  comparators = [],
  tableActions = [],
}) => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState([]);
  const [actions, setActions] = useState(tableActions);

  useEffect(() => {
    let cols = getColumns(keys, cellType, comparators);

    if (actions.length > 0) {
      cols = [...cols, { accessor: "actions", header: "ACTIONS", width: 100 }];
      const acts = getActions(tableActions);
      setActions(acts);
    }

    setColumns(cols);
  }, [keys, cellType]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const addRow = (newRow) => {
    setData((prev) => [...prev, newRow]);
  };

  return { columns, data, addRow, actions };
};

export default useTable;
