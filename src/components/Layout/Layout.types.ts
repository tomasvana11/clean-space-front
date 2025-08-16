import { ReactNode } from 'react';
import { Locale } from '@/utils/i18n';

export interface LayoutProps {
  children: ReactNode;
  locale: Locale;
  className?: string;
}