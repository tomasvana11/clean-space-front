import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import { CareerBanner } from "@/components/CareerBanner";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Hero } from "@/components/Hero";
import { PricingSection } from "@/components/PricingSection";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Hero
        backgroundImage="/images/heroimage.png"
        title={t(locale, "home.heroTitle")}
        locale={locale}
        titleAs="h1"
        className="w-full"
        blurred={false}
      >
        <p className="text-white/85 mt-4">{t(locale, "home.heroDesc")}</p>
      </Hero>
      <ContentWrapper className="bg-white rounded-b-xl">
        <PricingSection locale={locale} />
      </ContentWrapper>
      <CareerBanner locale={locale} buttonHref={`/${locale}/career`} />
    </>
  );
}
