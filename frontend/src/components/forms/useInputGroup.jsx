import React from "react";

const defaultClass =
  "p-2 text-sm rounded-lg focus:outline-none w-full focus:ring-2 focus:ring-blue-100 border border-gray-300";

const useInputGroup = ({
  register,
  handlers = [],
  errors,
  wrapperClassName,
}) => {
  const getEventHandlers = (target) => {
    return handlers.find((handler) => handler.accessor === target);
  };
  const renderInputs = (inputs) => {
    return inputs.map((input, index) => {
      const props = {
        ...register(input.name),
        ...input,
        id: input.name,
        className: `${defaultClass} ${
          errors[input.name] && `ring-2 ring-red-100`
        } ${input?.customclass} `,
      };

      const handler = getEventHandlers(input.name);

      if (handler) {
        props[handler.key] = handler.func;
      }

      let component = <></>;
      switch (input.type) {
        case "select":
          component = (
            <select {...props} type="text" autoComplete="off">
              {input.children.map((child, childIndex) => (
                <option key={childIndex} value={child}>
                  {child}
                </option>
              ))}
            </select>
          );
          break;

        case "textarea":
          component = <textarea {...props} autoComplete="off" />;
          break;
        default:
          component = <input {...props} autoComplete="off" />;
          break;
      }

      return (
        <div key={index} className={wrapperClassName}>
          <label className="text-sm" htmlFor={input.name}>
            {input.name === "sku"
              ? "SKU"
              : input.name === "unitOfMeasurement"
              ? "OUM"
              : input.name.charAt(0).toUpperCase() + input.name.slice(1)}
          </label>
          {component}
          {errors && errors[input.name] && (
            <p className="text-red-500 text-sm">
              {errors[input.name]?.message}
            </p>
          )}
        </div>
      );
    });
  };

  return { renderInputs };
};

export default useInputGroup;
