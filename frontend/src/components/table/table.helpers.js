import React from "react";
import ActionButton from "./ActionButton";
import { EditIcon, DeleteIcon } from "@/components/icons/Icons";

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
      console.log("Error at getBody :", error);
    }
  };

  return { getHeader, getWidth, getBody };
};

export const getColumns = (keys, cellType, comparators) => {
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

const getActionComponent = (type, handler, className) => {
  try {
    switch (type) {
      case "edit":
        return (
          <ActionButton
            customClass={className}
            onClick={handler}
            icon={<EditIcon />}
          />
        );
      case "delete":
        return (
          <ActionButton
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
  const acts = actions.map((action) => {
    return {
      component: getActionComponent(
        action.type,
        action.handler,
        action.className
      ),
    };
  });

  return acts;
};
