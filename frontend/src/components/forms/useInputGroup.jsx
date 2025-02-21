import React from "react";

const defaultClass =
  "p-2 text-md focus:outline-none min-h-[2.5rem] w-full focus:ring-2 focus:ring-blue-100 border border-gray-200";

const useInputGroup = ({ register, handlers = [], errors, wrapperClassName, setValue }) => {
  const getEventHandlers = (target) => {
    return handlers.find((handler) => handler.accessor === target);
  };
  const renderInputs = (inputs) => {
    return inputs.map((input, index) => {
      const handlers =
        input.name === "sku"
          ? {
              onChange: (e) => {
                const value = e.target.value.toUpperCase(); // Example: Capitalize input for 'sku'
                setValue(input.name, value, { shouldValidate: true }); // Update value in the form
              },
            }
          : {};
      const props = {
        ...register(input.name, handlers),
        ...input,
        id: input.name,
        className: `${defaultClass} ${errors[input.name] && `ring-2 ring-red-100`} ${
          input?.customclass
        } `,
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
                <option key={childIndex} value={child} className="p-5">
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
            <p className="text-red-500 text-sm">{errors[input.name]?.message}</p>
          )}
        </div>
      );
    });
  };

  return { renderInputs };
};

export default useInputGroup;
