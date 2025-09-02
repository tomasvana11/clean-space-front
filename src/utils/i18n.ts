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
    cleaningTabs: {
      title: "What is included in the services?",
      bathroom: {
        title: "Bathroom cleaning",
        shower: "Cleaning of bathtub, shower, and sinks",
        paper: "Refilling toilet paper (if available)",
        toilet: "Disinfection of toilets and taps",
        floor: "Mopping the floor",
        mirror: "Wiping tiles and mirrors",
        things: "Arranging items",
      },
      kitchen: {
        title: "Kitchen cleaning",
        workspace: "Wiping all work surfaces",
        drawer: "Wiping kitchen cabinets from the outside",
        bin: "Taking out the trash and replacing the bag",
        floor: "Mopping the floor",
        things: "Arranging chairs and general tidying",
      },
      hallway: {
        title: "Hallway cleaning",
        floor: "Mopping the floor",
        clothes: "Arranging shoes and clothes",
        flat: "Wiping accessible surfaces (shoe racks, mirrors, cabinets)",
        doors: "Wiping fingerprints from handles and switches",
      },
      room: {
        title: "Room cleaning",
        floor: "Vacuuming or mopping the floor",
        flat: "Dusting and wiping vertical surfaces (windowsills, shelves, cabinets, tables)",
        handle:
          "Wiping handles, switches, railings, and other accessible surfaces",
        pillow: "Arranging items (e.g., pillows, throws, blankets)",
      },
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

      mainPhone: "+357 97741469",
      mainPhoneHref: "tel:+35797741469",
    },
    about: {
      title: "About us",
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
      formTitle: "Leave us a message",
    },
    career: {
      heroTitle:
        "Join us and secure above-average earnings with a flexible work schedule!",
      heroDesc:
        "Build a career tailored to you – with transparent earnings, a flexible schedule, and growth opportunities.",
      formLabel: "💸 Start today!",
    },
    careerForm: {
      formTitle: "Fill out a short questionnaire and we will contact you!",
      name: "Full Name",
      namePlaceholder: "Your full name",
      email: "E-mail",
      emailPlaceholder: "Your e-mail address",
      phone: "Phone",
      phonePlaceholder: "Your phone number",
      submitButton: "I'm interested in a job",
    },
    careerBanner: {
      btnText: "Fill out the form",
    },
    forms: {
      submitting: "Submitting...",
      errorMessage: "There was an issues sending your message.",
      successMessage: "Message sent successfully!",
    },
    services: {
      title: "All our services",
      desc: "From everyday cleaning to special care – services built around your space.",
      link: "What's included in the base price?",
    },
    home: {
      heroTitle: "Professional cleaning services",
      heroDesc:
        "Because every space deserves to shine – we deliver trusted cleaning services that adapt to your needs, schedule, and expectations.",
      ms1: "We will clean the living room",
      ms2: "We will clean the hallways",
      ms3: "We will clean the kitchen",
      ms4: "We will clean the balcony / terrace",
      ms5: "We will clean the bathroom",
    },
    navbar: {
      about: "About us",
      services: "All services",
      career: "Career",
      contact: "Contact",
      orderCleaning: "Order cleaning",
    },
    pricing: {
      title: "Choose your cleaning frequency and get a discount!",
      subtitle:
        "Cleaning regularly pays off – enjoy a spotless space with a pleasant discount.",
      weekly: "Weekly",
      biweekly: "Twice a month",
      monthly: "Monthly",
      oneTime: "One-time",
      disclaimer:
        "*You can modify or cancel your regular cleaning plan anytime.",
    },
    orderForm: {
      // Steps
      step1Title: "Select Services",
      step1Subtitle: "How big is the apartment we will be cleaning?",
      step2Title: "Location & Time",
      step3Title: "Contact Info",
      step4Title: "Payment",

      stepStep: "Step",
      stepOf: "from",

      step1: "Choose the services you need",
      step2: "Select the time that suits you",
      step3: "Enter your personal information",
      step4: "How will you pay?",

      // Step 1
      rooms: "Rooms",
      bathrooms: "Bathrooms",
      basePrice: "Base price (1 room + 1 bathroom):",
      additionalRooms: "Additional rooms",
      additionalBathrooms: "Additional bathrooms",
      additionalServices: "Additional services",
      noAdditionalServices: "No additional services available",
      selected: "Selected",

      // Step 2
      selectLocation: "Select location",
      selectDate: "Select date",
      selectTime: "Select time",
      morning: "Morning (8:00 - 12:00)",
      noon: "Noon (12:00 - 16:00)",
      afternoon: "Afternoon (16:00 - 20:00)",
      unsure: "We'll arrange later",

      // Step 3
      name: "Full name",
      namePlaceholder: "Enter your full name",
      email: "E-mail",
      emailPlaceholder: "Enter your e-mail address",
      phone: "Phone",
      phonePlaceholder: "Enter your phone number",
      address: "Cleaning address",
      addressPlaceholder: "Enter the address where we'll clean",

      // Step 4
      paymentMethod: "Payment method",
      bankTransfer: "Bank transfer",
      card: "Card payment (coming soon)",

      // Common
      next: "Continue",
      back: "Back",
      submit: "Submit order",
      totalPrice: "Total price:",
      submitting: "Submitting order...",
      required: "Required field",

      // Success/Error
      orderSuccess: "Order submitted successfully!",
      orderError: "Failed to submit order. Please try again.",
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
    cleaningTabs: {
      title: "Co je ve službách zahrnuto?",
      bathroom: {
        title: "Úklid koupelny",
        shower: "Vyčištění vany, sprchy a umyvadel",
        paper: "Doplňování toaletního papíru (pokud je k dispozici)",
        toilet: "Dezinfekce toalet a baterií",
        floor: "Vytření podlahy",
        mirror: "Otření obkladů a zrcadel",
        things: "Uspořádání věcí",
      },
      kitchen: {
        title: "Úklid kuchyně",
        workspace: "Otření všech pracovních ploch",
        drawer: "Otření kuchyňských skříněk zvenku",
        bin: "Vynesení odpadků a výměna sáčku",
        floor: "Vytření podlahy",
        things: "Urovnání židlí a běžné uspořádání věcí",
      },
      hallway: {
        title: "Úklid chodby",
        floor: "Vytření podlahy",
        clothes: "Urovnání obuvi a oděvů",
        flat: "Otření dostupných ploch (botníky, zrcadla, skříňky)",
        doors: "Setření otisků z klik a vypínačů",
      },
      room: {
        title: "Úklid pokoje",
        floor: "Vysátí nebo vytření podlah",
        flat: "Otření prachu a svislých ploch (parapety, police, skříně, stoly)",
        handle: "Otření klik, vypínačů, madel a dalších dostupných ploch",
        pillow: "Urovnání věcí (např. polštáře, přehozy, deky)",
      },
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
      mainPhone: "+357 97741469",
      mainPhoneHref: "tel:+35797741469",
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
      formTitle: "Zanechte nám zprávu",
    },
    about: {
      title: "O nás",
    },
    career: {
      heroTitle:
        "Přidejte se k nám a zajistěte si nadstandartní výdělek a flexibilní pracovní dobu!",
      heroDesc:
        "Vytvořte si kariéru ušitou na míru - s transparentním výdělkem, flexibilním rozvrhem a možností růstu.",
      formLabel: "💸 Začněte již dnes!",
    },
    careerForm: {
      formTitle: "Vyplňte krátký dotazník a my se vám ozveme!",
      name: "Celé jméno",
      namePlaceholder: "Vaše celé jméno",
      email: "E-mail",
      emailPlaceholder: "Vaše e-mailová adresa",
      phone: "Telefon",
      phonePlaceholder: "Vaše telefonní číslo",
      submitButton: "Mám zájem o práci",
    },
    careerBanner: {
      btnText: "Vyplnit formulář",
    },
    forms: {
      submitting: "Odesílání...",
      errorMessage: "Při odesílání zprávy došlo k chybě.",
      successMessage: "Zpráva byla úspěšně odeslána!",
    },
    services: {
      title: "Všechny naše služby",
      desc: "Od každodenního úklidu po speciální péči – služby šité na míru vašemu prostoru.",
      link: "Co je zahrnuto v základní ceně?",
    },
    home: {
      heroTitle: "Profesionální úklidové služby",
      heroDesc:
        "Protože každý prostor si zaslouží zářit – poskytujeme spolehlivé úklidové služby, které se přizpůsobí vašim potřebám, rozvrhu i očekáváním.",
      ms1: "Uklidíme v obývacím pokoji",
      ms2: "Uklidíme chodby, haly",
      ms3: "Uklidíme v kuchyni",
      ms4: "Uklidíme na balkóně / terase",
      ms5: "Uklidíme v koupelně",
    },
    navbar: {
      about: "O nás",
      services: "Všechny naše služby",
      career: "Kariéra",
      contact: "Kontakty",
      orderCleaning: "Objednat úklid",
    },
    pricing: {
      title: "Zvolte si frekvenci úklidu a získejte slevu!",
      subtitle:
        "Uklízet pravidelně se vyplatí – užijte si čistotu a k tomu příjemnou slevu.",
      weekly: "Jednou týdně",
      biweekly: "Dvakrát měsíčně",
      monthly: "Jednou měsíčně",
      oneTime: "Jednorázově",
      disclaimer:
        "*Váš pravidelný úklidový plán můžete kdykoli upravit či zrušit.",
    },
    orderForm: {
      step1Title: "Výběr služby",
      step1Subtitle: "Jak velký byt budeme uklízet?",
      step2Title: "Datum a čas",
      step3Title: "Adresa a kontakt",
      step4Title: "Platba",

      step1: "Zvolte si, jaké služby potřebujete",
      step2: "Zvolte si, jaký čas vám vyhovuje",
      step3: "Doplňte vaše osobní údaje",
      step4: "Jak zaplatíte?",

      stepStep: "Krok",
      stepOf: "z",

      rooms: "Pokoje",
      bathrooms: "Koupelny",
      basePrice: "Základní cena (1 pokoj + 1 koupelna):",
      additionalRooms: "Další pokoje",
      additionalBathrooms: "Další koupelny",
      additionalServices: "Jaké služby navíc se vám budou hodit?",
      noAdditionalServices: "Žádné dodatečné služby nejsou k dispozici",
      selected: "Vybráno",

      selectLocation: "Vyberte místo",
      selectDate: "Vyberte datum",
      selectTime: "Vyberte čas",
      morning: "Dopoledne (8:00 - 12:00)",
      noon: "Poledne (12:00 - 16:00)",
      afternoon: "Odpoledne (16:00 - 20:00)",
      unsure: "Domluvíme se později",

      name: "Celé jméno",
      namePlaceholder: "Zadejte své celé jméno",
      email: "E-mail",
      emailPlaceholder: "Zadejte svou e-mailovou adresu",
      phone: "Telefon",
      phonePlaceholder: "Zadejte své telefonní číslo",
      address: "Adresa úklidu",
      addressPlaceholder: "Zadejte adresu, kde budeme uklízet",

      paymentMethod: "Způsob platby",
      bankTransfer: "Bankovní převod",
      card: "Platba kartou (připravujeme)",

      next: "Pokračovat",
      back: "Zpět",
      submit: "Odeslat objednávku",
      totalPrice: "Celková cena:",
      submitting: "Odesílání objednávky...",
      required: "Povinné pole",

      orderSuccess: "Objednávka byla úspěšně odeslána!",
      orderError: "Nepodařilo se odeslat objednávku. Zkuste to prosím znovu.",
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
    cleaningTabs: {
      title: "Что включено в услуги?",
      bathroom: {
        title: "Уборка ванной комнаты",
        shower: "Чистка ванны, душа и раковин",
        paper: "Пополнение туалетной бумаги (если есть)",
        toilet: "Дезинфекция унитазов и смесителей",
        floor: "Мытьё пола",
        mirror: "Протирание плитки и зеркал",
        things: "Приведение вещей в порядок",
      },
      kitchen: {
        title: "Уборка кухни",
        workspace: "Протирание всех рабочих поверхностей",
        drawer: "Протирание кухонных шкафов снаружи",
        bin: "Вынос мусора и замена пакета",
        floor: "Мытьё пола",
        things: "Приведение стульев и вещей в порядок",
      },
      hallway: {
        title: "Уборка прихожей",
        floor: "Мытьё пола",
        clothes: "Приведение обуви и одежды в порядок",
        flat: "Протирание доступных поверхностей (обувницы, зеркала, шкафы)",
        doors: "Протирание следов от ручек и выключателей",
      },
      room: {
        title: "Уборка комнаты",
        floor: "Пылесос или мытьё пола",
        flat: "Протирание пыли и вертикальных поверхностей (подоконники, полки, шкафы, столы)",
        handle:
          "Протирание ручек, выключателей, перил и других доступных поверхностей",
        pillow: "Приведение вещей в порядок (например, подушки, пледы, одеяла)",
      },
    },
    about: {
      title: "О нас",
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
      mainPhone: "+357 99268665",
      mainPhoneHref: "tel:+35799268665",
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
      formTitle: "оставьте нам сообщение",
    },
    career: {
      heroTitle:
        "Присоединяйтесь к нам и обеспечьте себе высокий доход и гибкий график работы!",
      heroDesc:
        "Создайте карьеру по индивидуальному плану – с прозрачной оплатой, гибким графиком и возможностью карьерного роста.",
      formLabel: "💸 Начните уже сегодня!",
    },
    careerForm: {
      formTitle: "Заполните короткую анкету, и мы свяжемся с вами!",
      name: "Полное имя",
      namePlaceholder: "Ваше полное имя",
      email: "Электронная почта",
      emailPlaceholder: "Ваш e-mail адрес",
      phone: "Телефон",
      phonePlaceholder: "Ваш номер телефона",
      submitButton: "Я заинтересован в работе",
    },
    careerBanner: {
      btnText: "Заполнить форму",
    },

    forms: {
      submitting: "Отправка...",
      errorMessage: "Произошла ошибка при отправке сообщения.",
      successMessage: "Сообщение успешно отправлено!",
    },
    services: {
      title: "все наши услуги",
      desc: "От ежедневной уборки до особого ухода — услуги, созданные для вашего пространства.",
      link: "Что включено в базовую цену?",
    },
    home: {
      heroTitle: "Профессиональные клининговые услуги",
      heroDesc:
        "Каждое пространство заслуживает сиять — мы предоставляем надежные услуги по уборке, которые адаптируются к вашим потребностям, графику и ожиданиям.",
      ms1: "Мы уберём в гостиной",
      ms2: "Мы уберём в коридорах, холлах",
      ms3: "Мы уберём на кухне",
      ms4: "Мы уберём на балконе / террасе",
      ms5: "Мы уберём в ванной комнате",
    },
    navbar: {
      about: "О нас",
      services: "Все услуги",
      career: "Карьера",
      contact: "Контакты",
      orderCleaning: "Заказать уборку",
    },
    pricing: {
      title: "Выберите частоту уборки и получите скидку!",
      subtitle:
        "Регулярная уборка всегда выгодна — наслаждайтесь чистотой и приятной скидкой.",
      weekly: "Раз в неделю",
      biweekly: "Два раза в месяц",
      monthly: "Раз в месяц",
      oneTime: "Разово",
      disclaimer:
        "*Вы можете изменить или отменить план регулярной уборки в любое время.",
    },
    orderForm: {
      step1Title: "Выбор услуг",
      step1Subtitle: "Какой площади квартира, которую мы будем убирать?",
      step2Title: "Место и время",
      step3Title: "Контактные данные",
      step4Title: "Оплата",

      stepStep: "Шаг",
      stepOf: "из",

      step1: "Выберите нужные вам услуги",
      step2: "Выберите удобное для вас время",
      step3: "Введите ваши персональные данные",
      step4: "Как вы будете платить?",
      rooms: "Комнаты",
      bathrooms: "Ванные",
      basePrice: "Базовая цена (1 комната + 1 ванная):",
      additionalRooms: "Дополнительные комнаты",
      additionalBathrooms: "Дополнительные ванные",
      additionalServices: "Дополнительные услуги",
      noAdditionalServices: "Дополнительные услуги недоступны",
      selected: "Выбрано",

      selectLocation: "Выберите место",
      selectDate: "Выберите дату",
      selectTime: "Выберите время",
      morning: "Утром (8:00 - 12:00)",
      noon: "Днем (12:00 - 16:00)",
      afternoon: "Вечером (16:00 - 20:00)",
      unsure: "Договоримся позже",

      name: "Полное имя",
      namePlaceholder: "Введите ваше полное имя",
      email: "Электронная почта",
      emailPlaceholder: "Введите ваш e-mail адрес",
      phone: "Телефон",
      phonePlaceholder: "Введите ваш номер телефона",
      address: "Адрес уборки",
      addressPlaceholder: "Введите адрес, где мы будем убирать",

      paymentMethod: "Способ оплаты",
      bankTransfer: "Банковский перевод",
      card: "Оплата картой (скоро)",

      next: "Далее",
      back: "Назад",
      submit: "Отправить заказ",
      totalPrice: "Общая стоимость:",
      submitting: "Отправка заказа...",
      required: "Обязательное поле",

      orderSuccess: "Заказ успешно отправлен!",
      orderError: "Не удалось отправить заказ. Попробуйте еще раз.",
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
