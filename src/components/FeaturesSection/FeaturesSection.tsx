import React from "react";
import { Locale } from "@/utils/i18n";
import { Title } from "../Title";

interface FeatureItem {
  emoji: string;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  locale: Locale;
  className?: string;
  features?: FeatureItem[];
}

// Překlady
const translations: Record<Locale, FeatureItem[]> = {
  cs: [
    {
      emoji: "🧹",
      title: "Ověřený a proškolený personál",
      description:
        "Všichni naši uklízeči jsou prověřeni a profesionálně vyškoleni. Důvěra a bezpečnost jsou na prvním místě.",
    },
    {
      emoji: "💻",
      title: "Flexibilní online rezervace",
      description:
        "Zákazníci si mohou úklid rezervovat rychle a snadno prostřednictvím našich stránek – kdykoliv a bez starostí.",
    },
    {
      emoji: "⏰",
      title: "Spolehlivý a pečlivý servis",
      description:
        "Přijdeme včas a dbáme na poskytování kvalitního a důkladného úklidu.",
    },
    {
      emoji: "🌍",
      title: "Vícejazyčná komunikace",
      description:
        "Mluvíme česky, anglicky i rusky, takže jsme přístupní široké škále klientů na Kypru.",
    },
  ],
  en: [
    {
      emoji: "🧹",
      title: "Vetted and trained staff",
      description:
        "All our cleaners are background-checked and professionally trained. Trust and safety come first.",
    },
    {
      emoji: "💻",
      title: "Flexible online booking",
      description:
        "Clients can book their cleaning quickly and easily through our website – anytime, without hassle.",
    },
    {
      emoji: "⏰",
      title: "Reliable and detail-oriented service",
      description:
        "We show up on time and take pride in delivering high-quality, thorough cleaning.",
    },
    {
      emoji: "🌍",
      title: "Multilingual communication",
      description:
        "We speak English, Czech, and Russian, so we’re accessible to a wide range of clients in Cyprus.",
    },
  ],
  ru: [
    {
      emoji: "🧹",
      title: "Проверенный и обученный персонал",
      description:
        "Все наши клинеры прошли проверку и профессиональное обучение. Доверие и безопасность превыше всего.",
    },
    {
      emoji: "💻",
      title: "Гибкое онлайн-бронирование",
      description:
        "Клиенты могут быстро и удобно забронировать уборку через наш сайт – в любое время и без лишних хлопот.",
    },
    {
      emoji: "⏰",
      title: "Надежный и тщательный сервис",
      description:
        "Мы приходим вовремя и гордимся тем, что предоставляем качественную и тщательную уборку.",
    },
    {
      emoji: "🌍",
      title: "Многоязычное общение",
      description:
        "Мы говорим на английском, чешском и русском, поэтому доступны для широкого круга клиентов на Кипре.",
    },
  ],
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  locale,
  className = "",
  features,
}) => {
  const defaultFeatures = translations[locale] || translations["en"];
  const displayFeatures = features || defaultFeatures;

  return (
    <div className={`w-full ${className}`}>
      {/* Grid karet - 4 na desktopu, 2 na mobilu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 md:pt-12 px-4">
        {displayFeatures.map((feature, index) => (
          <div
            key={index}
            className="p-6 text-white rounded-lg"
            style={{
              border: "1px solid rgba(255, 235, 176, 0.25)",
              background: "rgba(26, 26, 26, 0.50)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Ikona */}
            <div className="text-4xl mb-4 text-center">{feature.emoji}</div>

            {/* Nadpis */}
            <Title
              as="h4"
              className="text-lg font-semibold mb-3 text-center text-white"
            >
              {feature.title}
            </Title>

            {/* Popis */}
            <p className="text-sm text-gray-300 text-center leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FeaturesSection };
export type { FeaturesSectionProps, FeatureItem };
