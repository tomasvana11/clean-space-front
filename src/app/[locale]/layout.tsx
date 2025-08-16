import { Layout } from "@/components/Layout";
import { Locale, locales } from "@/utils/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <Layout locale={locale}>{children}</Layout>;
}
