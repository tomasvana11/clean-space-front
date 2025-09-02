/*
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
    <ContentWrapper className="pt-[72px] lg:pt-[96px]">
      <Title as="h3" locale={locale} className="pt-8 text-center">
        {t(locale, "about.title")}
      </Title>
      <FeaturesSection locale={locale} variant="light" />
    </ContentWrapper>
  );
}
*/

import { getSingleType } from "@/lib/strapi";
import { AboutContent } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { renderStrapiContent } from "@/utils/content";
import { Title } from "@/components/Title";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Hero } from "@/components/Hero";
import { CareerForm } from "@/components/CareerForm";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Article } from "@/components/Article";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;

  // Načtení dat ze Strapi
  const aboutData = await getSingleType<AboutContent>("about", locale);

  if (!aboutData) {
    return notFound();
  }

  // Vykreslení obsahu ze Strapi
  const contentElements = renderStrapiContent(aboutData.content, locale);

  return (
    <ContentWrapper className="pt-[72px] lg:pt-[96px]">
      <Title as="h3" locale={locale} className="pt-8 text-center">
        {aboutData.title || t(locale, "about.title")}
      </Title>
      <FeaturesSection locale={locale} variant="light" />

      <Article>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed pt-8">
          {contentElements}
        </div>
      </Article>
    </ContentWrapper>
  );
}
