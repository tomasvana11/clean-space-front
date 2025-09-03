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
import { ServiceCardsGrid } from "@/components/ServiceCardsGrid";
import { Service, StrapiResponse } from "@/lib/types/strapi";

interface Props {
  params: Promise<{ locale: Locale }>;
}

async function getServices(locale: Locale): Promise<Service[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/services?populate[includes][populate]=*&populate=image&locale=${locale}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    console.error("Failed to fetch services:", await res.text());
    return [];
  }

  const json = await res.json();

  return (json.data || []).map((item: any) => {
    let image;
    if (item.image) {
      const imgData = item.image?.attributes || item.image;
      image = {
        id: item.image.id,
        url: imgData?.url || "",
        alternativeText: imgData?.alternativeText || "",
      };
    }

    const includes = item.includes || null;

    return {
      id: item.id,
      documentId: item.documentId || "",
      title: item.title || "",
      price: item.price || 0,
      duration: item.duration || 0,
      slug: item.slug || "",
      locale: item.locale || locale,
      includes,
      image,
    };
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;

  const services = await getServices(locale);

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

            <Title
              as="h3"
              className="text-center mt-12 mb-6 text-[#372900]"
              locale={locale}
            >
              {t(locale, "orderForm.additionalServices")}
            </Title>

            <ServiceCardsGrid services={services} locale={locale} />
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
