import { PricingSectionProps, PricingOption } from "./PricingSection.types";
import { ContentWrapperSmall } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";
import { t } from "@/utils/i18n";

export const PricingSection = ({
  locale,
  className = "",
}: PricingSectionProps) => {
  const pricingOptions: PricingOption[] = [
    {
      discount: "-20 %",
      period: t(locale, "pricing.weekly"),
      bgColor: "#FFAF01",
      textColor: "#372900",
      isPopular: true,
    },
    {
      discount: "-15 %",
      period: t(locale, "pricing.biweekly"),
      bgColor: "#FFDD79",
      textColor: "#372900",
    },
    {
      discount: "-10 %",
      period: t(locale, "pricing.monthly"),
      bgColor: "#FFDD79",
      textColor: "#372900",
    },
    {
      discount: "😊",
      period: t(locale, "pricing.oneTime"),
      bgColor: "#DDDDE3",
      textColor: "#372900",
    },
  ];

  return (
    <ContentWrapperSmall
      className={`rounded-xl py-8 md:py-12 px-6 bg-[#FFF5D7] ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <Title as="h3" locale={locale} className="mb-4 text-[#372900]">
          {t(locale, "pricing.title")}
        </Title>
        <p className="text-lg leading-relaxed" style={{ color: "#372900" }}>
          {t(locale, "pricing.subtitle")}
        </p>
      </div>

      {/* Pricing Options */}
      <div className="bg-white rounded-sm p-6 md:p-8 mb-6 flex justify-center max-w-[800px] mx-auto">
        <div className="grid grid-cols-2 md:flex  gap-8">
          {pricingOptions.map((option, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Circle with discount */}

              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: option.bgColor,
                  color: option.textColor,
                }}
              >
                <Title as="h4" locale={locale} className="!mb-0 text-[#372900]">
                  {option.discount}
                </Title>
              </div>

              {/* Period label */}
              <p
                className="font-semibold text-sm md:text-base"
                style={{ color: "#372900" }}
              >
                {option.period}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-center">
        <p className="text-sm italic" style={{ color: "#372900" }}>
          {t(locale, "pricing.disclaimer")}
        </p>
      </div>
    </ContentWrapperSmall>
  );
};
