import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Hero } from "@/components/Hero";
import { CareerForm } from "@/components/CareerForm";
import { FeaturesSection } from "@/components/FeaturesSection";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Hero
        backgroundImage="/images/heroimage.png"
        title={t(locale, "career.heroTitle")}
        locale={locale}
        titleAs="h2"
        className="w-full"
      >
        <p className="text-white/85 mt-4">{t(locale, "career.heroDesc")}</p>
      </Hero>

      <div className="px-4 -mt-[100px] md:-mt-[150px] z-50 relative">
        <ContentWrapper className="rounded-xl bg-white p-4 md:p-8 justify-center flex">
          <div className="bg-[#FFF5D7] rounded-sm py-8 md:py-16 px-4 md:px-8 lg:px-24 max-w-[700px] ">
            <div className="max-w-2xl mx-auto text-center ">
              <div className="border border-[#FFD149] bg-white text-base text-[#554926] py-2 px-3 mb-8 rounded-sm font-semibold inline-flex">
                {t(locale, "career.formLabel")}
              </div>
              <Title
                as="h3"
                className="text-center pb-6 text-[#372900] mb-4"
                locale={locale}
              >
                {t(locale, "careerForm.formTitle")}
              </Title>
              <CareerForm
                locale={locale}
                className="text-left p-6 bg-white rounded-sm"
              />
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}
