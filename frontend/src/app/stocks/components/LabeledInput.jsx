import React from "react";

const fieldClass =
  "p-2 text-sm rounded-lg focus:outline-none w-full focus:ring-2 focus:ring-blue-100 border border-gray-300";

const LabeledInput = (props) => {
  const {
    children,
    register,
    name,
    disabled,
    customClass,
    onFocus,
    errors,
    type,
  } = props;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm" htmlFor={name}>
        {name === "sku"
          ? "SKU"
          : name === "unitOfMeasurement"
          ? "OUM"
          : name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {type === "select" ? (
        <select
          {...register(name)}
          disabled={disabled}
          autoComplete="off"
          id={name}
          type="text"
          onFocus={onFocus}
          className={`${fieldClass} ${customClass}`}
        >
          {children}
        </select>
      ) : type === "textArea" ? (
        <textarea
          {...register(name)}
          disabled={disabled}
          autoComplete="off"
          id={name}
          type="text"
          onFocus={onFocus}
          className={`${fieldClass} ${customClass}`}
        />
      ) : (
        <input
          {...register(name)}
          disabled={disabled}
          autoComplete="off"
          id={name}
          type="text"
          onFocus={onFocus}
          className={`${fieldClass} ${customClass}`}
        />
      )}
      {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};

export default LabeledInput;
