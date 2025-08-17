import { ReactNode } from "react";
import { Locale } from "@/utils/i18n";

export interface HeroProps {
  backgroundImage: string; // cesta k obrázku
  title: string;
  locale: Locale;
  children?: ReactNode; // pro dodatečný obsah pod titulem
  className?: string;
  titleAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  minHeight?: string; // např. "min-h-screen" nebo "min-h-[500px]"
  overlay?: boolean; // tmavý overlay přes obrázek pro lepší čitelnost
}
