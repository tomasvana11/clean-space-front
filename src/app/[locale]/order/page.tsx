import { OrderForm } from "@/components/OrderForm/OrderForm";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";
import { Article } from "@/components/Article";
import { Locale, t } from "@/utils/i18n";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function OrderPage({ params }: Props) {
  console.log("OrderPage rendering...");
  const { locale } = await params;
  console.log("Locale:", locale);

  return (
    <ContentWrapper className="pt-[72px] lg:pt-[96px]">
      <Article>
        <Title as="h1" locale={locale} className="py-8 text-center">
          {t(locale, "navbar.orderCleaning")}
        </Title>
        <div className="p-4 bg-yellow-100 border border-yellow-400 rounded mb-4">
          <p>Debug: OrderPage is rendering for locale: {locale}</p>
        </div>
        <OrderForm locale={locale} />
      </Article>
    </ContentWrapper>
  );
}
