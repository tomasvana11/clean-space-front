import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Hero } from "@/components/Hero";
import { CareerBanner } from "@/components/CareerBanner";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Hero
        backgroundImage="/images/heroimage.png"
        title={t(locale, "services.title")}
        locale={locale}
        titleAs="h2"
        className="w-full"
      >
        <p className="text-white/85 mt-4">{t(locale, "services.desc")}</p>
      </Hero>

      <div className="px-4 -mt-[100px] md:-mt-[150px] z-50 relative">
        <ContentWrapper className="rounded-xl bg-white p-4 md:p-8 justify-center flex">
          <Title
            as="h3"
            className="text-center pb-6 text-[#372900] mb-4"
            locale={locale}
          >
            {t(locale, "services.title")}
          </Title>
          <div className="w-[1200px]"></div>
        </ContentWrapper>
        <CareerBanner locale={locale} buttonHref={`/${locale}/career`} />
      </div>
    </>
  );
}
