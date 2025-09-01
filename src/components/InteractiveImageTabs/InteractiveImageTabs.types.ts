import { Locale } from "@/utils/i18n";

export interface Tooltip {
  id: string;
  textKey: string; // klíč pro i18n překlad místo přímo textu
  x: number; // pozice v procentech (0-100)
  y: number; // pozice v procentech (0-100)
}

export interface TabData {
  id: string;
  titleKey: string; // klíč pro i18n překlad místo přímo textu
  imagePath: string;
  tooltips: Tooltip[];
}

export interface InteractiveImageTabsProps {
  locale: Locale;
  className?: string;
}
