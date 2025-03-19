import React from "react";

const defaultClass =
  "p-2 text-md focus:outline-none min-h-[2.5rem] w-full focus:ring-2 focus:ring-blue-100 border border-gray-200";

const FormInputs = ({ register, errors, clearErrors, inputs, labels }) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-around lg:p-10 p-10 gap-2 lg:gap-4 overflow-auto">
      {inputs.map((input, index) => {
        const props = {
          ...register(input.name),
          ...input, //spread input attributes defined in stockForm.utils
          className: `${defaultClass} ${errors[input.name] ? "ring-2 ring-red-100" : ""} ${
            input?.customclass || ""
          } `,
          onFocus: () => clearErrors(input.name),
        };

        let component = <></>;
        switch (input.type) {
          case "select":
            component = (
              <select {...props} type="text" autoComplete="off">
                <option disabled value={input.default ? input.default : "Select"}>
                  {input.default ? input.default : "Select"}
                </option>
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
          <div key={index} className="flex flex-col gap-1 w-full">
            <label className="text-sm" htmlFor={input.name}>
              {labels?.find((label) => label.name === input.name)
                ? labels?.find((label) => label.name === input.name).text
                : input.name.charAt(0).toUpperCase() + input.name.slice(1)}
            </label>
            {component}
            {errors && errors[input.name] && (
              <p className="text-red-500 text-sm">{errors[input.name]?.message}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormInputs;
