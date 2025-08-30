import { ComponentProps } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "blank";
export type ButtonSize = "sm" | "md" | "lg";

// Základní props
interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

// Button jako button
interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ComponentProps<"button">, keyof BaseButtonProps> {
  as?: "button";
  href?: never;
}

// Button jako link
interface ButtonAsLink
  extends BaseButtonProps,
    Omit<ComponentProps<"a">, keyof BaseButtonProps> {
  as: "a";
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;
