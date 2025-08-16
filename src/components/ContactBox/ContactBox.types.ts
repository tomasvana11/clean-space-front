import { ReactNode } from "react";

export type ContactBoxVariant = "big" | "small";

export interface ContactBoxProps {
  variant: ContactBoxVariant;
  icon: string; // cesta k SVG v /public (např. "/icons/phone.svg")
  text: string;
  href: string;
  className?: string;
}
