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
    contact: {
      heroTitle: "Contact us",
      heroDesc:
        "Have a question or need quick advice? We’re here for you and happy to help – just click and write.",
      engNumberTitle: "Phone - English",
      engNumber: "Every day 8:00 - 20:00",
      rusNumberTitle: "Phone - Russian",
      rusNumber: "Every day 8:00 - 20:00",
      emailTitle: "E-mail",
    },
    contactForm: {
      name: "Name",
      namePlaceholder: "Enter your full name",
      email: "E-mail",
      emailPlaceholder: "Enter your e-mail address",
      phone: "Phone",
      phonePlaceholder: "Enter your phone number",
      message: "Message",
      messagePlaceholder: "What would you like to tell us?",
      submitButton: "Send",
      requiredHelper: "Required field",
      errorMessage: "There was an issues sending your message.",
      successMessage: "Message sent successfully!",
      formTitle: "Leave us a message",
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
    contact: {
      heroTitle: "Kontaktujte nás",
      heroDesc:
        "Máte dotaz nebo potřebujete rychlou radu? Jsme tu pro vás a rádi pomůžeme, stačí kliknout a napsat.",
      engNumberTitle: "Telefon - angličtina",
      engNumber: "Každý den 8:00 - 20:00",
      rusNumberTitle: "Telefon - ruština",
      rusNumber: "Každý den 8:00 - 20:00",
      emailTitle: "E-mail",
    },
    contactForm: {
      name: "Jméno",
      namePlaceholder: "Zadejte své celé jméno",
      email: "E-mail",
      emailPlaceholder: "Zadejte svou e-mailovou adresu",
      phone: "Telefon",
      phonePlaceholder: "Zadejte své telefonní číslo",
      message: "Zpráva",
      messagePlaceholder: "Co byste nám chtěli sdělit?",
      submitButton: "Odeslat",
      requiredHelper: "Povinné pole",
      errorMessage: "Při odesílání zprávy došlo k chybě.",
      successMessage: "Zpráva byla úspěšně odeslána!",
      formTitle: "Zanechte nám zprávu",
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
    contact: {
      heroTitle: "Живая поддержка",
      heroDesc:
        "Есть вопрос или нужен быстрый совет? Мы всегда рядом и рады помочь – просто нажмите и напишите.",
      engNumberTitle: "Телефон - английский язык",
      engNumber: "Каждый день 8:00 - 20:00",
      rusNumberTitle: "Телефон - русский язык",
      rusNumber: "Каждый день 8:00 - 20:00",
      emailTitle: "Электронная почта",
    },
    contactForm: {
      name: "Имя",
      namePlaceholder: "Введите ваше полное имя",
      email: "Электронная почта",
      emailPlaceholder: "Введите ваш e-mail адрес",
      phone: "Телефон",
      phonePlaceholder: "Введите ваш номер телефона",
      message: "Сообщение",
      messagePlaceholder: "Что бы вы хотели нам сообщить?",
      submitButton: "Отправить",
      requiredHelper: "Обязательное поле",
      errorMessage: "Произошла ошибка при отправке сообщения.",
      successMessage: "Сообщение успешно отправлено!",
      formTitle: "оставьте нам сообщение",
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
