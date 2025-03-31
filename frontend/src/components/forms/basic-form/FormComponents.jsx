import React from "react";

//SELECT OPTION VALUES SHOULD BE AN OBJECT IDENTIFIED BY KEY AND VALUE
//DEFAULT VALUE KEY WILL ALWAYS BE 'default'

const FormComponents = ({ register, errors, clearErrors, components, labels, loading }) => {
  //handles instances where name has a dot in it.
  //if name has a dot, it indicates that that field is an object e.g. address.city
  const get = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-around gap-2 lg:gap-4 overflow-auto">
      {components.map((component, index) => {
        const props = {
          ...register(component.name),
          ...component, //spread component attributes defined in component props
          className: `input- text-responsive-xs ${
            errors[component.name] ? "ring-2 ring-red-100" : ""
          } ${component?.customclass || ""} `,
          disabled: component.disabled ? component.disabled : loading,
          onFocus: () => clearErrors(component.name),
        };

        let customComponent = <></>;
        switch (component.type) {
          case "select":
            customComponent = (
              <select {...props} type="text" autoComplete="off">
                <option value="default">
                  {component.default
                    ? component.default.value
                      ? component.default.value
                      : "-- Select --"
                    : "-- Select --"}
                </option>
                {component.children.map((child, childIndex) => (
                  <option key={childIndex} value={child.key ? child.key : child} className="p-5">
                    {child.value ? child.value : child}
                  </option>
                ))}
              </select>
            );
            break;

          case "textarea":
            customComponent = <textarea {...props} autoComplete="off" />;
            break;
          default:
            customComponent = (
              <input
                {...props}
                autoComplete="off"
                placeholder={component.placeholder || undefined}
              />
            );
            break;
        }

        return (
          <div key={index} className="flex flex-col gap-1 w-full">
            {labels && (
              <label className="text-sm" htmlFor={component.name}>
                {labels?.find((label) => label.name === component.name)
                  ? labels?.find((label) => label.name === component.name).text
                  : component.name.charAt(0).toUpperCase() + component.name.slice(1)}
              </label>
            )}
            {customComponent}
            {get(errors, component.name) && (
              <p className="text-red-500 text-sm">{get(errors, `${component.name}.message`)}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FormComponents;
