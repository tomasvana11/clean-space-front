import { getSingleType } from "@/lib/strapi";
import { TermsContent } from "@/lib/types/strapi";
import { Locale } from "@/utils/i18n";
import { renderStrapiContent } from "@/utils/content";
import { Title } from "@/components/Title";
import { ContentWrapper } from "@/components/ContentWrapper";
import { notFound } from "next/navigation";
import { Article } from "@/components/Article";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function GdprPage({ params }: Props) {
  const { locale } = await params;

  const termsData = await getSingleType<TermsContent>(
    "terms-of-service",
    locale
  );

  if (!termsData) {
    return notFound();
  }

  const contentElements = renderStrapiContent(termsData.content, locale);

  return (
    <ContentWrapper className="pt-[72px] lg:pt-[96px]">
      <Article>
        <Title as="h3" locale={locale} className="py-8 text-center">
          {termsData.title}
        </Title>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          {contentElements}
        </div>
      </Article>
    </ContentWrapper>
  );
}
