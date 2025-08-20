import { Locale } from "@/utils/i18n";

export interface NavBarProps {
  locale: Locale;
}

export interface NavItem {
  label: string;
  href: string;
}
