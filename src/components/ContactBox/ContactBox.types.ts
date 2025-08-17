import { ReactNode } from "react";
import { Locale } from "@/utils/i18n";

export type ContactBoxVariant = "big" | "small";

export interface ContactBoxProps {
  variant: ContactBoxVariant;
  icon: string;
  text: string;
  href: string;
  className?: string;
  description?: string;
  title?: string;
  locale: Locale;
}
