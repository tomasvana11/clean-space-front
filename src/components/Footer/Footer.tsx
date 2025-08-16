import Link from "next/link";
import { FooterProps } from "./Footer.types";
import { t } from "@/utils/i18n";
import { ContentWrapper, ContentWrapperSmall } from "../ContentWrapper";
import { Title } from "../Title";
import { ContactBox } from "@/components/ContactBox";
import { Image } from "@/components/Image";
import { SocialButton } from "@/components/SocialButton";

export const Footer = ({ locale }: FooterProps) => {
  return (
    <footer className="px-4 mt-6 md:mt-10">
      <ContentWrapperSmall className="rounded-xl bg-[#372900] py-6 md:py-12 text-[#FFF5D7] px-4 mb-8">
        <div className="text-center flex flex-col gap-2">
          <Title as="h3" locale={locale}>
            {t(locale, "footer.supportTitle")}
          </Title>
          <p className="opacity-85">{t(locale, "footer.supportSub")}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-4 justify-center pt-6">
          <SocialButton
            href="https://t.me/cleanspacecy"
            icon="/icons/telegram.svg"
            label="Telegram"
          />
          <SocialButton
            href="https://m.me/cleanspace.cy"
            icon="/icons/messenger.svg"
            label="Messenger"
          />
          <SocialButton
            href="https://wa.me/35797741469"
            icon="/icons/whatsapp.svg"
            label="WhatsApp"
          />
        </div>
      </ContentWrapperSmall>
      <ContentWrapper className="bg-white rounded-t-xl">
        <ContentWrapperSmall>
          <div className="flex flex-col md:flex-row gap-6 xl:gap-16 py-8">
            <div className="w-full flex flex-row gap-6">
              <div className="w-full flex flex-col gap-4">
                <div className="relative h-8">
                  <Image
                    src="/images/cleanspace_logo.svg"
                    alt="Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <p>{t(locale, "footer.companyName")}</p>
                  <p>
                    {t(locale, "footer.companyAddressLn1")}
                    <br />
                    {t(locale, "footer.companyAddressLn2")}
                  </p>
                  <p>{t(locale, "footer.companyId")}</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4 max-[350px]:hidden">
                <div className="h-[32px] flex flex-col justify-end">
                  <p className="font-semibold text-gray-900">
                    {t(locale, "footer.linksTitle")}
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  <Link href="/about" className="hover:underline">
                    {t(locale, "footer.linkAbout")}
                  </Link>
                  <Link href="/services" className="hover:underline">
                    {t(locale, "footer.linkServices")}
                  </Link>
                  <Link href="/career" className="hover:underline">
                    {t(locale, "footer.linkCareer")}
                  </Link>
                  <Link href="/contact" className="hover:underline">
                    {t(locale, "footer.linkContact")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="px-5 py-4 text-white bg-[#FFAF00] rounded-t-xl ">
                <Title as="h5" locale={locale}>
                  {t(locale, "footer.contactTitle")}
                </Title>
              </div>
              <div className="py-2 px-2 bg-[#FFF5D7] rounded-b-xl flex flex-col gap-2">
                <ContactBox
                  variant="small"
                  icon="/icons/phone_duo.svg"
                  text="+357 97741469"
                  href="tel:+35797741469"
                  className="text-[#372900] px-3 py-2 rounded-lg hover:bg-white transition-colors"
                />
                <ContactBox
                  variant="small"
                  icon="/icons/email_duo.svg"
                  text="info@cleanspace.eu.com"
                  href="mailto:info@cleanspace.eu.com"
                  className="text-[#372900] px-3 py-2 rounded-lg hover:bg-white transition-colors"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="py-5 border-t border-gray-300 flex flex-row gap-4">
              <Link
                href={`/${locale}/gdpr`}
                className="text-gray-500 text-sm hover:underline"
              >
                {t(locale, "footer.gdpr")}
              </Link>
              <p className="text-gray-300 text-sm">|</p>
              <Link
                href={`/${locale}/terms`}
                className="text-gray-500 text-sm hover:underline"
              >
                {t(locale, "footer.terms")}
              </Link>
            </div>
            <div className="py-5 border-t border-gray-300">
              <p className="text-gray-500 text-sm">
                {t(locale, "footer.copyright")}
              </p>
            </div>
          </div>
        </ContentWrapperSmall>
      </ContentWrapper>
    </footer>
  );
};
