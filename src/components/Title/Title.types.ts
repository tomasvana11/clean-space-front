import { ReactNode } from "react";

export type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps {
  as: TitleLevel;
  children: ReactNode;
  locale?: string; // Přidáno
  className?: string;
}
