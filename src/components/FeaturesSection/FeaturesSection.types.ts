import { Locale } from "@/utils/i18n";
export interface FeatureItem {
  emoji: string;
  title: string;
  description: string;
}

export interface FeaturesSectionProps {
  locale: Locale;
  className?: string;
  features?: FeatureItem[];
}
