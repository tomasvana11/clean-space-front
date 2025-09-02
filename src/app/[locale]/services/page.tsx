/*
import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import {
  ContentWrapper,
  ContentWrapperSmall,
} from "@/components/ContentWrapper";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { CareerBanner } from "@/components/CareerBanner";
import InteractiveImageTabs from "@/components/InteractiveImageTabs";

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
          <ContentWrapperSmall>
            <Title
              as="h3"
              className="text-center md:pt-4 pt-2 md:pb-6 pb-4 text-[#372900]"
              locale={locale}
            >
              {t(locale, "services.includedTitle")}
            </Title>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
              <div className="bg-gray-50 w-full rounded-xl flex group justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/room.png"
                  alt=""
                  className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800 md:px-4"
                >
                  {t(locale, "home.ms1")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl flex group justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/hallway2.png"
                  alt=""
                  className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800 md:px-4"
                >
                  {t(locale, "home.ms2")}
                </Title>
              </div>
              <div className="bg-gray-50 w-full rounded-xl group flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                <img
                  src="/images/kitchen.png"
                  alt=""
                  className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800 md:px-4"
                >
                  {t(locale, "home.ms3")}
                </Title>
              </div>

              <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group">
                <img
                  src="/images/bathtub.png"
                  alt=""
                  className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                />
                <Title
                  as="h4"
                  locale={locale}
                  className="text-center pb-2 text-gray-800 md:px-4"
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
                href={`/${locale}/services#detail`}
                className="bg-gradient-to-r from-[#FFA001] to-[#FFBF01]  text-white font-semibold !rounded-lg md:!rounded-md px-5 sm:pl-8 sm-pr-7 py-5 flex items-center gap-3 w-auto"
              >
                <span className="text-base">
                  {locale === "cs"
                    ? "Co je součástí úklidu?"
                    : locale === "ru"
                    ? "Что мы убираем?"
                    : "What's covered in the service?"}
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
        <div id="detail">
          <ContentWrapperSmall>
            <InteractiveImageTabs locale={locale} className="pt-8" />
          </ContentWrapperSmall>
        </div>
        <CareerBanner locale={locale} buttonHref={`/${locale}/career`} />
      </div>
    </>
  );
}
*/

import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import {
  ContentWrapper,
  ContentWrapperSmall,
} from "@/components/ContentWrapper";
import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";
import { CareerBanner } from "@/components/CareerBanner";
import InteractiveImageTabs from "@/components/InteractiveImageTabs";
import { Service } from "@/lib/types/strapi"; // Import typu Service

interface Props {
  params: Promise<{ locale: Locale }>;
}

// Funkce pro načtení služeb ze Strapi
async function getServices(locale: Locale): Promise<Service[]> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
      }/api/services?populate=*&locale=${locale}`,
      {
        next: { revalidate: 60 }, // Cache na 60 sekund
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  // Načtení služeb ze Strapi
  const services = await getServices(locale);

  // Můžete si vybrat pouze hlavní služby (například první 4)
  const mainServices = services.slice(0, 4);

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
          <ContentWrapperSmall>
            <Title
              as="h3"
              className="text-center md:pt-4 pt-2 md:pb-6 pb-4 text-[#372900]"
              locale={locale}
            >
              {t(locale, "services.includedTitle")}
            </Title>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
              {mainServices.length > 0 ? (
                // Dynamické služby ze Strapi
                mainServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-gray-50 w-full rounded-xl flex group justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {service.image && (
                      <img
                        src={
                          service.image.url.startsWith("http")
                            ? service.image.url
                            : `${
                                process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"
                              }${service.image.url}`
                        }
                        alt={service.image.alternativeText || service.title}
                        className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105 object-cover rounded-lg"
                      />
                    )}
                    <Title
                      as="h4"
                      locale={locale}
                      className="text-center pb-2 text-gray-800 md:px-4"
                    >
                      {service.title}
                    </Title>
                    {service.price && (
                      <div className="text-center text-sm font-semibold text-[#FFA000]">
                        {service.price} EUR
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Fallback na statické služby, pokud se nepodaří načíst ze Strapi
                <>
                  <div className="bg-gray-50 w-full rounded-xl flex group justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src="/images/room.png"
                      alt=""
                      className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <Title
                      as="h4"
                      locale={locale}
                      className="text-center pb-2 text-gray-800 md:px-4"
                    >
                      {t(locale, "home.ms1")}
                    </Title>
                  </div>
                  <div className="bg-gray-50 w-full rounded-xl flex group justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src="/images/hallway2.png"
                      alt=""
                      className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <Title
                      as="h4"
                      locale={locale}
                      className="text-center pb-2 text-gray-800 md:px-4"
                    >
                      {t(locale, "home.ms2")}
                    </Title>
                  </div>
                  <div className="bg-gray-50 w-full rounded-xl group flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src="/images/kitchen.png"
                      alt=""
                      className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <Title
                      as="h4"
                      locale={locale}
                      className="text-center pb-2 text-gray-800 md:px-4"
                    >
                      {t(locale, "home.ms3")}
                    </Title>
                  </div>
                  <div className="bg-gray-50 w-full rounded-xl flex justify-center flex-col gap-4 p-3 border border-gray-200 hover:bg-gray-100 transition-colors duration-200 group">
                    <img
                      src="/images/bathtub.png"
                      alt=""
                      className="w-32 md:w-44 h-32 md:h-44 mx-auto transition-transform duration-300 group-hover:scale-105"
                    />
                    <Title
                      as="h4"
                      locale={locale}
                      className="text-center pb-2 text-gray-800 md:px-4"
                    >
                      {t(locale, "home.ms5")}
                    </Title>
                  </div>
                </>
              )}
            </div>

            <div className="w-full flex justify-center">
              <Button
                as="a"
                type="button"
                variant="primary"
                size="lg"
                href={`/${locale}/services#detail`}
                className="bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg md:!rounded-md px-5 sm:pl-8 sm-pr-7 py-5 flex items-center gap-3 w-auto"
              >
                <span className="text-base">
                  {locale === "cs"
                    ? "Co je součástí úklidu?"
                    : locale === "ru"
                    ? "Что мы убираем?"
                    : "What's covered in the service?"}
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

        <div id="detail">
          <ContentWrapperSmall>
            <InteractiveImageTabs locale={locale} className="pt-8" />
          </ContentWrapperSmall>
        </div>

        {/* Pokud chcete zobrazit všechny služby */}
        {services.length > 4 && (
          <ContentWrapper className="mt-8">
            <ContentWrapperSmall>
              <Title
                as="h3"
                className="text-center mb-6 text-[#372900]"
                locale={locale}
              >
                {locale === "cs"
                  ? "Všechny naše služby"
                  : locale === "ru"
                  ? "Все наши услуги"
                  : "All our services"}
              </Title>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#FFA000] transition-colors"
                  >
                    {service.image && (
                      <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden rounded-lg">
                        <img
                          src={
                            service.image.url.startsWith("http")
                              ? service.image.url
                              : `${
                                  process.env.NEXT_PUBLIC_STRAPI_URL ||
                                  "http://localhost:1337"
                                }${service.image.url}`
                          }
                          alt={service.image.alternativeText || service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Title
                      as="h4"
                      className="text-center text-[#372900] mb-2"
                      locale={locale}
                    >
                      {service.title}
                    </Title>
                    {service.price && (
                      <div className="text-center">
                        <span className="text-[#372900] font-semibold bg-[#FFD149] rounded-md px-2 py-1 text-sm">
                          {service.price} EUR
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ContentWrapperSmall>
          </ContentWrapper>
        )}

        <CareerBanner locale={locale} buttonHref={`/${locale}/career`} />
      </div>
    </>
  );
}
