export type Locale = "en" | "cs" | "ru";

export const locales: Locale[] = ["en", "cs", "ru"];
export const defaultLocale: Locale = "en";

export const getLocaleFromPath = (pathname: string): Locale => {
  const segments = pathname.split("/");
  const localeFromPath = segments[1] as Locale;
  return locales.includes(localeFromPath) ? localeFromPath : defaultLocale;
};

export const translations = {
  en: {
    footer: {
      supportTitle: "Live support - No chatbots",
      supportSub:
        "Have a question or need quick advice? We’re here for you and happy to help – just click and write.",
      gdpr: "Privacy Policy",
      terms: "Terms & Conditions",
      copyright: "© 2025, CLEANSPACE Ltd. All rights reserved.",
      contactTitle: "Contact us",
      linksTitle: "Links",
      linkAbout: "About us",
      linkServices: "All services",
      linkCareer: "Career",
      linkContact: "Contact",
      companyName: "CLEANSPACE Ltd.",
      companyAddressLn1: "Charilaou Xylofrou 13, Agios Athanasios",
      companyAddressLn2: "4103, Limassol - Cyprus",
      companyId: "HE 472079",
    },
  },
  cs: {
    footer: {
      supportTitle: "Živá podpora - žádní chatboti",
      supportSub:
        "Máte dotaz nebo potřebujete rychlou radu? Jsme tu pro vás a rádi pomůžeme, stačí kliknout a napsat.",
      gdpr: "Zpracování osobních údajů",
      terms: "Obchodní podmínky",
      copyright: "© 2025, CLEANSPACE Ltd. Všechna práva vyhrazena.",
      contactTitle: "Kontaktujte nás",
      linksTitle: "Odkazy",
      linkAbout: "O nás",
      linkServices: "Všechny služby",
      linkCareer: "Kariéra",
      linkContact: "Kontakt",
      companyName: "CLEANSPACE Ltd.",
      companyAddressLn1: "Charilaou Xylofrou 13, Agios Athanasios",
      companyAddressLn2: "4103, Limassol - Kypr",
      companyId: "HE 472079",
    },
  },
  ru: {
    footer: {
      supportTitle: "Живая поддержка — никаких чат-ботов",
      supportSub:
        "Есть вопрос или нужен быстрый совет? Мы всегда рядом и рады помочь – просто нажмите и напишите.",
      gdpr: "Обработка персональных данных",
      terms: "Условия и положения",
      copyright: "© 2025, CLEANSPACE Ltd. Все права защищены.",
      contactTitle: "Живая поддержка",
      linksTitle: "Ссылки",
      linkAbout: "О нас",
      linkServices: "Все услуги",
      linkCareer: "Карьера",
      linkContact: "Контакты",
      companyName: "CLEANSPACE Ltd.",
      companyAddressLn1: "Харилау Ксилофру 13, Агиос Афанасиос",
      companyAddressLn2: "4103, Лимассол - Кипр",
      companyId: "HE 472079",
    },
  },
};

export const t = (locale: Locale, key: string): string => {
  const keys = key.split(".");
  let value: any = translations[locale];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};
