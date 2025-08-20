import { CareerBannerProps } from "./CareerBanner.types";
import { ContentWrapperSmall } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";
import Link from "next/link";
import { Button } from "@/components/Button";
import { t } from "@/utils/i18n";

export const CareerBanner = ({
  locale,
  className = "",
  backgroundImage = "/images/career_img.png",
  buttonHref = `/${locale}/career`,
}: CareerBannerProps) => {
  const overlayStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(255, 160, 0, 0.80) -8.91%, rgba(255, 160, 0, 0.20) 145.11%), url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <ContentWrapperSmall
      className={`rounded-xl py-6 md:py-12 text-white px-4 mb-8 relative overflow-hidden mt-8${className}`}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 rounded-xl" style={overlayStyle} />

      {/* Content */}
      <div className="relative z-10">
        <div className="text-center flex flex-col gap-2">
          <Title as="h3" locale={locale} className="text-white">
            {t(locale, "career.heroTitle")}
          </Title>
          <p className="opacity-85">{t(locale, "career.heroDesc")}</p>
        </div>

        <div className="flex justify-center pt-6">
          <Link href={buttonHref}>
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-[#372900] hover:bg-gray-100 font-semibold px-8"
            >
              {t(locale, "careerBanner.btnText") || "Contact us"}
            </Button>
          </Link>
        </div>
      </div>
    </ContentWrapperSmall>
  );
};

/*
export const CareerBanner = ({
  locale,
  className = "",
  backgroundImage = "/images/mujobrazek.png",
  buttonText,
  buttonHref = `/${locale}/career`,
}: CareerBannerProps) => {
  const overlayStyle = {
    background: `linear-gradient(180deg, rgba(255, 160, 0, 0.80) -8.91%, rgba(255, 160, 0, 0.20) 145.11%), url('${backgroundImage}') lightgray 0px -167.375px / 100% 196.193% no-repeat`,
  };

  return (
    <ContentWrapperSmall
      className={`rounded-xl py-6 md:py-12 text-white px-4 mb-8 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-xl" style={overlayStyle} />

      <div className="relative z-10">
        <div className="text-center flex flex-col gap-2">
          <Title as="h3" locale={locale} className="text-white">
            {t(locale, "careerBanner.title")}
          </Title>
          <p className="opacity-85">{t(locale, "careerBanner.subtitle")}</p>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            as="a"
            href={buttonHref}
            variant="primary"
            size="lg"
            className="bg-white text-[#372900] hover:bg-gray-100 font-semibold px-8"
          >
            {buttonText || t(locale, "careerBanner.buttonText")}
          </Button>
        </div>
      </div>
    </ContentWrapperSmall>
  );
};
*/
