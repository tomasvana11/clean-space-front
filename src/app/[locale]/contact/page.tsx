import { Locale, t } from "@/utils/i18n";
import { Title } from "@/components/Title";
import {
  ContentWrapper,
  ContentWrapperSmall,
} from "@/components/ContentWrapper";
import { ContactBox } from "@/components/ContactBox";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <Hero
        backgroundImage="/images/heroimage.png"
        title={t(locale, "contact.heroTitle")}
        locale={locale}
        titleAs="h2"
        className="w-full"
      >
        <p className="text-white/85 mt-4">{t(locale, "contact.heroDesc")}</p>
      </Hero>
      <div className="px-4 -mt-[100px] md:-mt-[150px] z-50 relative">
        <ContentWrapper className="rounded-xl bg-white p-4 md:p-8 flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <div className="border-b border-gray-300">
              <ContactBox
                variant="big"
                icon="/icons/phone_duo.svg"
                text="+357 97741469"
                title={t(locale, "contact.engNumberTitle")}
                description={t(locale, "contact.engNumber")}
                href="tel:+35797741469"
                className="text-[#372900]"
                locale={locale}
              />
              <ContactBox
                variant="big"
                icon="/icons/phone_duo.svg"
                text="+357 99268665"
                title={t(locale, "contact.rusNumberTitle")}
                description={t(locale, "contact.rusNumber")}
                href="tel:+35799268665"
                className="text-[#372900]"
                locale={locale}
              />
              <ContactBox
                variant="big"
                icon="/icons/email_duo.svg"
                text="info@cleanspace.eu.com"
                title={t(locale, "contact.emailTitle")}
                //description={t(locale, "contact.email")}
                href="mailto:info@cleanspace.eu.com"
                className="text-[#372900]"
                locale={locale}
              />
            </div>
          </div>
          <div className="bg-gray-50 p-4 md:p-6 xl:p-10 rounded-md md:w-1/2">
            <Title as="h3" className="text-center pb-6" locale={locale}>
              {t(locale, "contactForm.formTitle")}
            </Title>
            <ContactForm locale={locale} />
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}
