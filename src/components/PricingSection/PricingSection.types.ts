import { Locale } from "@/utils/i18n";

export interface PricingOption {
  discount: string;
  period: string;
  bgColor: string;
  textColor: string;
  isPopular?: boolean;
}

export interface PricingSectionProps {
  locale: Locale;
  className?: string;
}
