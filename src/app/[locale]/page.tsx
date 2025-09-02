import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import { CareerBanner } from "@/components/CareerBanner";
import {
  ContentWrapper,
  ContentWrapperSmall,
} from "@/components/ContentWrapper";
import { Hero } from "@/components/Hero";
import { PricingSection } from "@/components/PricingSection";
import InteractiveImageTabs from "@/components/InteractiveImageTabs";
import { PricingCalculator } from "@/components/PriceCalculator";
import { Button } from "@/components/Button";
import { FeaturesSection } from "@/components/FeaturesSection";

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
        <p className="text-white/85 z-10 relative mt-4 max-w-[800px] mx-auto pb-6 md:pb-8">
          {t(locale, "home.heroDesc")}
        </p>
        <PricingCalculator
          locale={locale}
          buttonIcon="chevron-right-double.svg"
        />
        <div className="px-4">
          <FeaturesSection locale={locale} />
        </div>
      </Hero>
      <div className="px-4">
        <ContentWrapper className="bg-white rounded-b-xl pb-12">
          <PricingSection
            locale={locale}
            className="-mt-32 md:-mt-[180px] relative z-100"
          />
          <ContentWrapperSmall>
            <Title
              as="h3"
              className="text-center md:pt-8 pt-6 md:pb-6 pb-4 text-[#372900]"
              locale={locale}
            >
              {t(locale, "services.title")}
            </Title>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 pb-6">
              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/room.png"
                  alt=""
                  className="w-32 h-32 mx-auto"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800"
                >
                  {t(locale, "home.ms1")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/hallway2.png"
                  alt=""
                  className="w-32 h-32 mx-auto"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800"
                >
                  {t(locale, "home.ms2")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/kitchen.png"
                  alt=""
                  className="w-32 h-32 mx-auto"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800"
                >
                  {t(locale, "home.ms3")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/balcony_revised.png"
                  alt=""
                  className="w-32 h-32 mx-auto"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800"
                >
                  {t(locale, "home.ms4")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/bathtub.png"
                  alt=""
                  className="w-32 h-32 mx-auto"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800"
                >
                  {t(locale, "home.ms5")}
                </Title>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button
                as="a"
                type="button"
                variant="primary"
                size="lg"
                href={`/${locale}/services`}
                className="bg-gradient-to-r from-[#FFA001] to-[#FFBF01]  text-white font-semibold !rounded-lg md:!rounded-md px-5 sm:pl-8 sm-pr-7 py-5 flex items-center gap-3 w-full md:w-auto"
              >
                <span className="text-base">
                  {locale === "cs"
                    ? "Zobrazit všechny služby"
                    : locale === "ru"
                    ? "Посмотреть все услуги"
                    : "View all services"}
                </span>
                <img
                  src="/icons/chevron-right-double.svg"
                  alt=""
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </ContentWrapperSmall>
        </ContentWrapper>
        <ContentWrapperSmall>
          <InteractiveImageTabs locale={locale} className="pt-8" />
        </ContentWrapperSmall>
        <CareerBanner locale={locale} buttonHref={`/${locale}/career`} />
      </div>
    </>
  );
}
