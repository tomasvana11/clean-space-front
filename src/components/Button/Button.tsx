import React, { ComponentProps } from "react";
import { ButtonProps, ButtonVariant, ButtonSize } from "./Button.types";

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ComponentProps<"button">, keyof BaseButtonProps> {
  as?: "button";
  href?: never;
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<ComponentProps<"a">, keyof BaseButtonProps> {
  as: "a";
  href: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#FFA000] hover:bg-[#ED9600] focus:ring-[#FFAF24] hover:cursor-pointer",
  secondary:
    "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 hover:cursor-pointer",
  outline:
    "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500 hover:cursor-pointer",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:cursor-pointer",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-5 text-lg",
};

const baseStyles = `
  font-medium rounded-sm
  focus:outline-none focus:ring-2 focus:ring-offset-2
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
  inline-flex items-center justify-center
`;
/*
export const Button = ({
  variant = "primary",
  size = "md",
  href,
  as = "button",
  loading = false,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const widthClass = fullWidth ? "w-full" : "";

  const buttonClassName = `
    ${baseStyles} 
    ${variantClass} 
    ${sizeClass} 
    ${widthClass} 
    ${className}
  `.trim();

  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};*/

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  children,
  as = "button",
  ...props
}: ButtonProps) => {
  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const widthClass = fullWidth ? "w-full" : "";

  const buttonClassName = `
    ${baseStyles} 
    ${variantClass} 
    ${sizeClass} 
    ${widthClass} 
    ${className}
  `.trim();

  const loadingSpinner = (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (as === "a") {
    const { href, ...linkProps } = props as ButtonAsLink;
    return (
      <a href={href} className={buttonClassName} {...linkProps}>
        {loading && loadingSpinner}
        {children}
      </a>
    );
  }

  const { disabled, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      className={buttonClassName}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {loading && loadingSpinner}
      {children}
    </button>
  );
};
