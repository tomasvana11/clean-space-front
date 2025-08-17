import { Locale } from "@/utils/i18n";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactFormProps {
  locale: Locale; // Přidáno
  className?: string;
}

export interface ContactFormState {
  data: ContactFormData;
  loading: boolean;
  success: boolean;
  error: string | null;
}
