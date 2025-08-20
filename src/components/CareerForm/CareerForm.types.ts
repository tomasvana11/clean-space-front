import { Locale } from "@/utils/i18n";

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
}

export interface CareerFormProps {
  locale: Locale;
  className?: string;
}

export interface CareerFormState {
  data: CareerFormData;
  loading: boolean;
  success: boolean;
  error: string | null;
}
