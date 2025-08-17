import { ComponentProps } from "react";

export type InputVariant = "default" | "large";
export type InputType = "text" | "email" | "tel" | "password" | "textarea";

export interface InputProps
  extends Omit<ComponentProps<"input">, "type" | "size"> {
  type?: InputType;
  variant?: InputVariant;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  rows?: number;
}
