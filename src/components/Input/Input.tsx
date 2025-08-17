import React, { ComponentProps, forwardRef } from "react";
import { InputProps, InputVariant, InputType } from "./Input.types";

const variantStyles: Record<
  InputVariant,
  {
    input: string;
    label: string;
  }
> = {
  default: {
    input: "px-3 py-2 text-base",
    label: "text-sm font-medium mb-2",
  },
  large: {
    input: "px-4 py-3 text-base ",
    label: "text-base font-semibold mb-3",
  },
};

const baseInputStyles = `
  w-full border rounded-sm
  focus:outline-none focus:ring-1 focus:ring-[#FFAF24]
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const inputStateStyles = {
  default: "border-gray-200 bg-white text-gray-700 focus:border-[#FFAF24]",
  error: "border-red-300 focus:border-red-500 focus:ring-red-500",
};

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      type = "text",
      variant = "default",
      label,
      error,
      required = false,
      className = "",
      rows = 4,
      ...props
    },
    ref
  ) => {
    const styles = variantStyles[variant];
    const stateStyle = error
      ? inputStateStyles.error
      : inputStateStyles.default;
    const inputClassName = `${baseInputStyles} ${styles.input} ${stateStyle} ${className}`;

    const renderInput = () => {
      if (type === "textarea") {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            className={inputClassName}
            {...(props as ComponentProps<"textarea">)}
          />
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          className={inputClassName}
          {...(props as ComponentProps<"input">)}
        />
      );
    };

    return (
      <div className="w-full">
        {label && (
          <label className={`block text-gray-800 ${styles.label}`}>
            {label}
            {required && <span className="text-[#FF0800] ml-1">*</span>}
          </label>
        )}

        {renderInput()}

        {error && <p className="text-[#FF0800] text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
