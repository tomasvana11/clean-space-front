import { Locale } from "@/utils/i18n";
import { Title } from "@/components/Title";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className="text-center">
      <Title as="h1" locale={locale} className="text-gray-800 mb-8">
        Welcome to Your Multilingual App
      </Title>
      <Title as="h3" locale={locale} className="text-gray-600">
        Current locale: {locale}
      </Title>
      <a href="/en">English</a>
      <a href="/cs">Czech</a>
      <a href="/ru">Russian</a>
    </div>
  );
}
