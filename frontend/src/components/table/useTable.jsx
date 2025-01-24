import { useEffect, useState } from "react";
import ActionButton from "./ActionButton";
import { DeleteIcon, EditIcon } from "../icons/Icons";

const comparators = [
  { key: "sku", header: "SKU", width: 50 },
  { key: "unitOfMeasurement", header: "UNIT", width: 50 },
  { key: "quantity", header: "QTY", width: 50 },
];

const getValues = (key, comparators) => {
  const comparator = comparators.find((comparator) => comparator.key === key);

  return comparator && comparator["key"] === key
    ? comparator["header"]
    : key.toUpperCase();
};

export const getColumns = (keys, comparators) => {
  const columns = keys.map((key) => {
    return {
      accessor: key,
      header: getValues(key, comparators),
      width: getValues(key, comparators),
      body: ({ getValue }) => getValue(),
    };
  });

  return columns;
};

const getActionComponent = (key, type, handler, className) => {
  try {
    switch (type) {
      case "edit":
        return (
          <ActionButton
            key={key}
            customClass={className}
            onClick={handler}
            icon={<EditIcon />}
          />
        );
      case "delete":
        return (
          <ActionButton
            key={key}
            customClass={className}
            onClick={handler}
            icon={<DeleteIcon />}
          />
        );
      default:
        return;
    }
  } catch (error) {
    console.error("Error at getActionComponent :", error);
  }
};

export const getActions = (actions) => {
  const acts = actions.map((action, index) => {
    return {
      component: getActionComponent(
        index,
        action.type,
        action.handler,
        action.className
      ),
    };
  });

  return acts;
};

const useTable = ({ keys = [], tableActions = [], initialData = [] }) => {
  const [columns, setColumns] = useState([]);
  const [actions, setActions] = useState(tableActions);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let cols = getColumns(keys, comparators);

    if (actions.length > 0) {
      cols = [...cols, { accessor: "actions", header: "ACTIONS", width: 100 }];
      const acts = getActions(tableActions);
      setActions(acts);
    }

    setColumns(cols);
  }, [keys]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  return { columns, actions, data };
};

export default useTable;
