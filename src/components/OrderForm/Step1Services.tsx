/*
"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  services,
  locale,
}: Step1ServicesProps) {
  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
  };

  // NOVÁ FUNKCE pro eco-friendly
  const handleEcoToggle = () => {
    updateFormData({ eco: !formData.eco });
  };

  const handleServiceToggle = (service: Service) => {
    if (!service.price) {
      return;
    }

    const isSelected = formData.additionalServices.some(
      (s) => s.id === service.id
    );
    if (isSelected) {
      updateFormData({
        additionalServices: formData.additionalServices.filter(
          (s) => s.id !== service.id
        ),
      });
    } else {
      updateFormData({
        additionalServices: [...formData.additionalServices, service],
      });
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <Title
        as="h4"
        className="text-[#372900] !text-[20px] lg:!text-[24px]"
        locale={locale}
      >
        {t(locale, "orderForm.step1Subtitle")}
      </Title>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto ">
            <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  disabled={formData.rooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.rooms} {getRoomText(formData.rooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>

              <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(-1)}
                  disabled={formData.bathrooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.bathrooms} {getBathroomText(formData.bathrooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`/${locale}/services`}
          className="text-sm text-gray-500 hover:underline inline-flex transition-colors font-medium cursor-pointer duration-200"
        >
          {t(locale, "services.link")}
        </a>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.eco}
            onChange={handleEcoToggle}
            className="sr-only"
          />
          <div
            className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
              formData.eco
                ? "bg-[#FFA000] border-[#FFA000]"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.eco && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">♻️ </span>
            <span className="text-sm font-semibold text-gray-700">
              {locale === "cs"
                ? "Chci úklid pouze pomocí ekologických prostředků"
                : locale === "ru"
                ? "Я хочу уборку только экологически чистыми средствами"
                : "I want to get my place cleaned with eco-friendly only products"}
            </span>
            <div className="text-xs text-gray-500 mt-1">+50 EUR</div>
          </div>
        </label>
      </div>

      <div>
        <Title
          as="h4"
          className="text-[#372900] !text-[20px] lg:!text-[24px] pb-6"
          locale={locale}
        >
          {t(locale, "orderForm.additionalServices")}
        </Title>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = formData.additionalServices.some(
                (s) => s.id === service.id
              );
              const hasPrice = service.price && service.price > 0;

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceToggle(service)}
                  className={`p-4 rounded-lg bg-[#FFF5D7] border-1 border-transparent transition-all ${
                    !hasPrice
                      ? " cursor-not-allowed opacity-60"
                      : isSelected
                      ? "!border-[#FFA000] cursor-pointer"
                      : "cursor-pointer"
                  }`}
                >
                  {service.image && (
                    <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden">
                      <img
                        src={
                          service.image.url.startsWith("http")
                            ? service.image.url
                            : `${
                                process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"
                              }${service.image.url}`
                        }
                        alt={service.image.alternativeText || service.title}
                        className="w-full h-full object-cover h-24 w-24"
                      />
                    </div>
                  )}
                  <Title
                    as="h4"
                    className="font-semibold text-center text-[#372900] mb-2"
                    locale={locale}
                  >
                    {service.title}
                  </Title>
                  <div className="flex w-full justify-center">
                    <Title
                      as="h5"
                      className="text-[#372900] text-center font-semibold bg-[#FFD149] rounded-md p-2 inline-block"
                      locale={locale}
                    >
                      {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                    </Title>
                  </div>

                  {!hasPrice && (
                    <div className="mt-2 text-sm text-gray-500">
                      {locale === "cs"
                        ? "Kontaktujte nás"
                        : locale === "ru"
                        ? "Свяжитесь с нами"
                        : "Contact us"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
*/


/*

"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  services,
  locale,
}: Step1ServicesProps) {
  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
  };

  // Property type selection handler
  const handlePropertyTypeChange = (propertyType: "flat" | "house") => {
    updateFormData({ property: propertyType });
  };

  // NOVÁ FUNKCE pro eco-friendly
  const handleEcoToggle = () => {
    updateFormData({ eco: !formData.eco });
  };

  const handleServiceToggle = (service: Service) => {
    if (!service.price) {
      return;
    }

    const isSelected = formData.additionalServices.some(
      (s) => s.id === service.id
    );
    if (isSelected) {
      updateFormData({
        additionalServices: formData.additionalServices.filter(
          (s) => s.id !== service.id
        ),
      });
    } else {
      updateFormData({
        additionalServices: [...formData.additionalServices, service],
      });
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <Title
        as="h4"
        className="text-[#372900] !text-[20px] lg:!text-[24px]"
        locale={locale}
      >
        {t(locale, "orderForm.step1Subtitle")}
      </Title>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => handlePropertyTypeChange("flat")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "flat"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏬</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs"
                  ? "Byt"
                  : locale === "ru"
                  ? "Квартира"
                  : "Flat"}
              </div>
            </div>
          </div>

          <div
            onClick={() => handlePropertyTypeChange("house")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "house"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏡</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs" ? "Dům" : locale === "ru" ? "Дом" : "House"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto ">
            <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  disabled={formData.rooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.rooms} {getRoomText(formData.rooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>

              <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(-1)}
                  disabled={formData.bathrooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.bathrooms} {getBathroomText(formData.bathrooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`/${locale}/services`}
          className="text-sm text-gray-500 hover:underline inline-flex transition-colors font-medium cursor-pointer duration-200"
        >
          {t(locale, "services.link")}
        </a>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.eco}
            onChange={handleEcoToggle}
            className="sr-only"
          />
          <div
            className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
              formData.eco
                ? "bg-[#FFA000] border-[#FFA000]"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.eco && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">♻️ </span>
            <span className="text-sm font-semibold text-gray-700">
              {locale === "cs"
                ? "Chci úklid pouze pomocí ekologických prostředků"
                : locale === "ru"
                ? "Я хочу уборку только экологически чистыми средствами"
                : "I want to get my place cleaned with eco-friendly only products"}
            </span>
            <div className="text-xs text-gray-500 mt-1">+50 EUR</div>
          </div>
        </label>
      </div>

      <div>
        <Title
          as="h4"
          className="text-[#372900] !text-[20px] lg:!text-[24px] pb-6"
          locale={locale}
        >
          {t(locale, "orderForm.additionalServices")}
        </Title>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = formData.additionalServices.some(
                (s) => s.id === service.id
              );
              const hasPrice = service.price && service.price > 0;

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceToggle(service)}
                  className={`p-4 rounded-lg bg-[#FFF5D7] border-1 border-transparent transition-all ${
                    !hasPrice
                      ? " cursor-not-allowed opacity-60"
                      : isSelected
                      ? "!border-[#FFA000] cursor-pointer"
                      : "cursor-pointer"
                  }`}
                >
                  {service.image && (
                    <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden">
                      <img
                        src={
                          service.image.url.startsWith("http")
                            ? service.image.url
                            : `${
                                process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"
                              }${service.image.url}`
                        }
                        alt={service.image.alternativeText || service.title}
                        className="w-full h-full object-cover h-24 w-24"
                      />
                    </div>
                  )}
                  <Title
                    as="h4"
                    className="font-semibold text-center text-[#372900] mb-2"
                    locale={locale}
                  >
                    {service.title}
                  </Title>
                  <div className="flex w-full justify-center">
                    <Title
                      as="h5"
                      className="text-[#372900] text-center font-semibold bg-[#FFD149] rounded-md p-2 inline-block"
                      locale={locale}
                    >
                      {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                    </Title>
                  </div>

                  {!hasPrice && (
                    <div className="mt-2 text-sm text-gray-500">
                      {locale === "cs"
                        ? "Kontaktujte nás"
                        : locale === "ru"
                        ? "Свяжитесь с нами"
                        : "Contact us"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
*/


/*
"use client";

import React from "react";
import { OrderFormData, ServiceWithQuantity } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  services,
  locale,
}: Step1ServicesProps) {
  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
  };

  // Property type selection handler
  const handlePropertyTypeChange = (propertyType: "flat" | "house") => {
    updateFormData({ property: propertyType });
  };

  // NOVÁ FUNKCE pro eco-friendly
  const handleEcoToggle = () => {
    updateFormData({ eco: !formData.eco });
  };

  // UPRAVENÁ FUNKCE pro toggle služby s quantity podporou
  const handleServiceToggle = (service: Service) => {
    if (!service.price) {
      return;
    }

    const existingServiceIndex = formData.additionalServices.findIndex(
      (s) => s.service.id === service.id
    );

    if (existingServiceIndex >= 0) {
      // Služba už je vybraná - odebereme ji
      const newServices = formData.additionalServices.filter(
        (s) => s.service.id !== service.id
      );
      updateFormData({ additionalServices: newServices });
    } else {
      // Služba není vybraná - přidáme ji s quantity 1
      const newServiceWithQuantity: ServiceWithQuantity = {
        service: service,
        quantity: 1
      };
      updateFormData({
        additionalServices: [...formData.additionalServices, newServiceWithQuantity],
      });
    }
  };

  // NOVÁ FUNKCE pro změnu quantity
  const handleQuantityChange = (serviceId: number, change: number) => {
    const updatedServices = formData.additionalServices.map(item => {
      if (item.service.id === serviceId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateFormData({ additionalServices: updatedServices });
  };

  // POMOCNÁ FUNKCE pro získání quantity služby
  const getServiceQuantity = (serviceId: number): number => {
    const serviceItem = formData.additionalServices.find(
      item => item.service.id === serviceId
    );
    return serviceItem?.quantity || 0;
  };

  // POMOCNÁ FUNKCE pro kontrolu, zda je služba vybraná
  const isServiceSelected = (serviceId: number): boolean => {
    return formData.additionalServices.some(item => item.service.id === serviceId);
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <Title
        as="h4"
        className="text-[#372900] !text-[20px] lg:!text-[24px]"
        locale={locale}
      >
        {t(locale, "orderForm.step1Subtitle")}
      </Title>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => handlePropertyTypeChange("flat")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "flat"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏬</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs"
                  ? "Byt"
                  : locale === "ru"
                  ? "Квартира"
                  : "Flat"}
              </div>
            </div>
          </div>

          <div
            onClick={() => handlePropertyTypeChange("house")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "house"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏡</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs" ? "Dům" : locale === "ru" ? "Дом" : "House"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto ">
            <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  disabled={formData.rooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.rooms} {getRoomText(formData.rooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>

              <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(-1)}
                  disabled={formData.bathrooms <= 1}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.bathrooms} {getBathroomText(formData.bathrooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(1)}
                  className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`/${locale}/services`}
          className="text-sm text-gray-500 hover:underline inline-flex transition-colors font-medium cursor-pointer duration-200"
        >
          {t(locale, "services.link")}
        </a>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.eco}
            onChange={handleEcoToggle}
            className="sr-only"
          />
          <div
            className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
              formData.eco
                ? "bg-[#FFA000] border-[#FFA000]"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.eco && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">♻️ </span>
            <span className="text-sm font-semibold text-gray-700">
              {locale === "cs"
                ? "Chci úklid pouze pomocí ekologických prostředků"
                : locale === "ru"
                ? "Я хочу уборку только экологически чистыми средствами"
                : "I want to get my place cleaned with eco-friendly only products"}
            </span>
            <div className="text-xs text-gray-500 mt-1">+50 EUR</div>
          </div>
        </label>
      </div>

      <div>
        <Title
          as="h4"
          className="text-[#372900] !text-[20px] lg:!text-[24px] pb-6"
          locale={locale}
        >
          {t(locale, "orderForm.additionalServices")}
        </Title>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const quantity = getServiceQuantity(service.id);
              const hasPrice = service.price && service.price > 0;

              return (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg bg-[#FFF5D7] border-1 border-transparent transition-all ${
                    !hasPrice
                      ? " cursor-not-allowed opacity-60"
                      : isSelected
                      ? "!border-[#FFA000]"
                      : ""
                  }`}
                >
                  {service.image && (
                    <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden">
                      <img
                        src={
                          service.image.url.startsWith("http")
                            ? service.image.url
                            : `${
                                process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"
                              }${service.image.url}`
                        }
                        alt={service.image.alternativeText || service.title}
                        className="w-full h-full object-cover h-24 w-24"
                      />
                    </div>
                  )}
                  <Title
                    as="h4"
                    className="font-semibold text-center text-[#372900] mb-2"
                    locale={locale}
                  >
                    {service.title}
                  </Title>
                  
                  <div className="flex w-full justify-center mb-3">
                    <Title
                      as="h5"
                      className="text-[#372900] text-center font-semibold bg-[#FFD149] rounded-md p-2 inline-block"
                      locale={locale}
                    >
                      {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                    </Title>
                  </div>

                  {hasPrice && (
                    <div className="space-y-3">
                      {!isSelected ? (
                        <button
                          onClick={() => handleServiceToggle(service)}
                          className="w-full bg-[#FFA000] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#FF8F00] transition-colors"
                        >
                          {locale === "cs"
                            ? "Přidat"
                            : locale === "ru"
                            ? "Добавить"
                            : "Add"}
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(service.id, -1)}
                              disabled={quantity <= 1}
                              className="w-8 h-8 rounded-full bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg text-[#372900] font-semibold"
                            >
                              −
                            </button>
                            <span className="text-lg font-semibold text-[#372900] min-w-[2rem] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(service.id, 1)}
                              className="w-8 h-8 rounded-full bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 flex items-center justify-center text-lg text-[#372900] font-semibold"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleServiceToggle(service)}
                            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                          >
                            {locale === "cs"
                              ? "Odebrat"
                              : locale === "ru"
                              ? "Удалить"
                              : "Remove"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasPrice && (
                    <div className="mt-2 text-sm text-gray-500">
                      {locale === "cs"
                        ? "Kontaktujte nás"
                        : locale === "ru"
                        ? "Свяжитесь с нами"
                        : "Contact us"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
  */

/*
"use client";

import React from "react";
import { OrderFormData, ServiceWithQuantity } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  services,
  locale,
}: Step1ServicesProps) {
  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
  };

  // Property type selection handler
  const handlePropertyTypeChange = (propertyType: "flat" | "house") => {
    updateFormData({ property: propertyType });
  };

  // Eco-friendly toggle
  const handleEcoToggle = () => {
    updateFormData({ eco: !formData.eco });
  };

  // Přidání služby po kliknutí (bez tlačítka Add/Remove)
  const handleServiceClick = (service: Service) => {
    if (!service.price) {
      return;
    }

    const existingServiceIndex = formData.additionalServices.findIndex(
      (s) => s.service.id === service.id
    );

    if (existingServiceIndex >= 0) {
      // Služba už je vybraná - nepřidáváme další, jen ukážeme quantity ovládání
      return;
    } else {
      // Služba není vybraná - přidáme ji s quantity 1
      const newServiceWithQuantity: ServiceWithQuantity = {
        service: service,
        quantity: 1
      };
      updateFormData({
        additionalServices: [...formData.additionalServices, newServiceWithQuantity],
      });
    }
  };

  // Změna quantity - když je 1 a klikne se minus, služba se odebere
  const handleQuantityChange = (serviceId: number, change: number) => {
    const existingService = formData.additionalServices.find(
      item => item.service.id === serviceId
    );

    if (!existingService) return;

    const newQuantity = existingService.quantity + change;

    if (newQuantity <= 0) {
      // Odebrat službu úplně
      const newServices = formData.additionalServices.filter(
        item => item.service.id !== serviceId
      );
      updateFormData({ additionalServices: newServices });
    } else {
      // Změnit quantity
      const updatedServices = formData.additionalServices.map(item => {
        if (item.service.id === serviceId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateFormData({ additionalServices: updatedServices });
    }
  };

  // Získání quantity služby
  const getServiceQuantity = (serviceId: number): number => {
    const serviceItem = formData.additionalServices.find(
      item => item.service.id === serviceId
    );
    return serviceItem?.quantity || 0;
  };

  // Kontrola, zda je služba vybraná
  const isServiceSelected = (serviceId: number): boolean => {
    return formData.additionalServices.some(item => item.service.id === serviceId);
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <Title
        as="h4"
        className="text-[#372900] !text-[20px] lg:!text-[24px]"
        locale={locale}
      >
        {t(locale, "orderForm.step1Subtitle")}
      </Title>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => handlePropertyTypeChange("flat")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "flat"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏬</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs"
                  ? "Byt"
                  : locale === "ru"
                  ? "Квартира"
                  : "Flat"}
              </div>
            </div>
          </div>

          <div
            onClick={() => handlePropertyTypeChange("house")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "house"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏡</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs" ? "Dům" : locale === "ru" ? "Дом" : "House"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto ">
            <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  disabled={formData.rooms <= 1}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.rooms} {getRoomText(formData.rooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>

              <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(-1)}
                  disabled={formData.bathrooms <= 1}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.bathrooms} {getBathroomText(formData.bathrooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(1)}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`/${locale}/services`}
          className="text-sm text-gray-500 hover:underline inline-flex transition-colors font-medium cursor-pointer duration-200"
        >
          {t(locale, "services.link")}
        </a>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.eco}
            onChange={handleEcoToggle}
            className="sr-only"
          />
          <div
            className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
              formData.eco
                ? "bg-[#FFA000] border-[#FFA000]"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.eco && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">♻️ </span>
            <span className="text-sm font-semibold text-gray-700">
              {locale === "cs"
                ? "Chci úklid pouze pomocí ekologických prostředků"
                : locale === "ru"
                ? "Я хочу уборку только экологически чистыми средствами"
                : "I want to get my place cleaned with eco-friendly only products"}
            </span>
            <div className="text-xs text-gray-500 mt-1">+50 EUR</div>
          </div>
        </label>
      </div>

      <div>
        <Title
          as="h4"
          className="text-[#372900] !text-[20px] lg:!text-[24px] pb-6"
          locale={locale}
        >
          {t(locale, "orderForm.additionalServices")}
        </Title>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const quantity = getServiceQuantity(service.id);
              const hasPrice = service.price && service.price > 0;
              const showQuantityControls = hasPrice && isSelected;

              return (
                <div
                  key={service.id}
                  onClick={() => !isSelected && handleServiceClick(service)}
                  className={`rounded-lg bg-[#FFF5D7] flex flex-col space-between border-1 border-transparent transition-all ${
                    showQuantityControls 
                      ? "" 
                      : "flex justify-center items-center"
                  } ${
                    !hasPrice
                      ? "cursor-not-allowed opacity-60"
                      : isSelected
                      ? "!border-[#FFA000]"
                      : "cursor-pointer hover:border-[#FFA000]/50"
                  }`}
                >
                  <div className="p-4 flex flex-col h-full justify-center">
                  {service.image && (
                    <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden">
                      <img
                        src={
                          service.image.url.startsWith("http")
                            ? service.image.url
                            : `${
                                process.env.NEXT_PUBLIC_STRAPI_URL ||
                                "http://localhost:1337"
                              }${service.image.url}`
                        }
                        alt={service.image.alternativeText || service.title}
                        className="w-full h-full object-cover h-24 w-24"
                      />
                    </div>
                  )}
                  <Title
                    as="h4"
                    className="font-semibold text-center text-[#372900] mb-2"
                    locale={locale}
                  >
                    {service.title}
                  </Title>
                  
                  <div className="flex w-full justify-center">
                    <Title
                      as="h5"
                      className="text-[#372900] text-center font-semibold bg-[#FFD149] rounded-md p-2 inline-block"
                      locale={locale}
                    >
                      {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                    </Title>
                  </div>
                  </div>

                  {hasPrice && isSelected && (
                    <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-b-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(service.id, -1);
                        }}
                        className={`w-12 md:w-8 h-12 rounded-xs cursor-pointer transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold ${
                          quantity === 1 
                            ? "bg-red-100 hover:bg-red-200" 
                            : "bg-[#FFEBB0] hover:bg-[#FFE494]"
                        }`}
                        //className="w-12 md:w-8 h-12 rounded-xs cursor-pointer bg-red-100 hover:bg-red-200 transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                      >
                        {quantity === 1 ? (
                          <img 
                            src="/icons/trash-01.svg" 
                            alt="Remove" 
                            className="w-4 h-4"
                          />
                        ) : (
                          <span className="text-lg text-red-600 font-semibold mb-1 !text-[#372900]">−</span>
                        )}
                      </button>
                      <span className="text-lg font-semibold text-[#372900] min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(service.id, 1);
                        }}
                        className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"

                        //className="w-8 h-8 cursor-pointer rounded-full bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 flex items-center justify-center text-lg text-[#372900] font-semibold"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {!hasPrice && (
                    <div className="mt-2 text-sm text-gray-500">
                      {locale === "cs"
                        ? "Kontaktujte nás"
                        : locale === "ru"
                        ? "Свяжитесь с нами"
                        : "Contact us"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
  */

"use client";

import React from "react";
import { OrderFormData, ServiceWithQuantity } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  services,
  locale,
}: Step1ServicesProps) {
  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
  };

  // Property type selection handler
  const handlePropertyTypeChange = (propertyType: "flat" | "house") => {
    updateFormData({ property: propertyType });
  };

  // Eco-friendly toggle
  const handleEcoToggle = () => {
    updateFormData({ eco: !formData.eco });
  };

  // Přidání služby po kliknutí
  const handleServiceClick = (service: Service) => {
    if (!service.price) {
      return;
    }

    const existingServiceIndex = formData.additionalServices.findIndex(
      (s) => s.service.id === service.id
    );

    if (existingServiceIndex >= 0) {
      // Služba už je vybraná - pokud nemá quantity support, odebrat ji
      if (!service.quantity) {
        const newServices = formData.additionalServices.filter(
          item => item.service.id !== service.id
        );
        updateFormData({ additionalServices: newServices });
      }
      return;
    } else {
      // Služba není vybraná - přidáme ji s quantity 1
      const newServiceWithQuantity: ServiceWithQuantity = {
        service: service,
        quantity: 1
      };
      updateFormData({
        additionalServices: [...formData.additionalServices, newServiceWithQuantity],
      });
    }
  };

  // Změna quantity - pouze pro služby s quantity support
  const handleQuantityChange = (serviceId: number, change: number) => {
    const existingService = formData.additionalServices.find(
      item => item.service.id === serviceId
    );

    if (!existingService || !existingService.service.quantity) return;

    const newQuantity = existingService.quantity + change;

    if (newQuantity <= 0) {
      // Odebrat službu úplně
      const newServices = formData.additionalServices.filter(
        item => item.service.id !== serviceId
      );
      updateFormData({ additionalServices: newServices });
    } else {
      // Změnit quantity
      const updatedServices = formData.additionalServices.map(item => {
        if (item.service.id === serviceId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateFormData({ additionalServices: updatedServices });
    }
  };

  // Získání quantity služby
  const getServiceQuantity = (serviceId: number): number => {
    const serviceItem = formData.additionalServices.find(
      item => item.service.id === serviceId
    );
    return serviceItem?.quantity || 0;
  };

  // Kontrola, zda je služba vybraná
  const isServiceSelected = (serviceId: number): boolean => {
    return formData.additionalServices.some(item => item.service.id === serviceId);
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <Title
        as="h4"
        className="text-[#372900] !text-[20px] lg:!text-[24px]"
        locale={locale}
      >
        {t(locale, "orderForm.step1Subtitle")}
      </Title>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => handlePropertyTypeChange("flat")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "flat"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏬</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs"
                  ? "Byt"
                  : locale === "ru"
                  ? "Квартира"
                  : "Flat"}
              </div>
            </div>
          </div>

          <div
            onClick={() => handlePropertyTypeChange("house")}
            className={`p-4 rounded-lg border-1 cursor-pointer transition-colors duration-200 ${
              formData.property === "house"
                ? "border-[#FFA000] bg-[#FFF5D7]"
                : "border-gray-200 bg-white hover:bg-gray-100"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">🏡</div>
              <div className="font-semibold text-[#372900]">
                {locale === "cs" ? "Dům" : locale === "ru" ? "Дом" : "House"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto ">
            <div className="flex w-full flex-col md:flex-row items-center justify-between gap-4 md:gap-2 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => handleRoomsChange(-1)}
                  disabled={formData.rooms <= 1}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.rooms} {getRoomText(formData.rooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRoomsChange(1)}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>

              <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(-1)}
                  disabled={formData.bathrooms <= 1}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  −
                </button>
                <div className="text-center min-w-[80px] w-[128px] sm:min-w-[100px]">
                  <span className="text-base sm:text-lg font-semibold text-gray-700">
                    {formData.bathrooms} {getBathroomText(formData.bathrooms)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleBathroomsChange(1)}
                  className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <a
          href={`/${locale}/services`}
          className="text-sm text-gray-500 hover:underline inline-flex transition-colors font-medium cursor-pointer duration-200"
        >
          {t(locale, "services.link")}
        </a>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.eco}
            onChange={handleEcoToggle}
            className="sr-only"
          />
          <div
            className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-colors ${
              formData.eco
                ? "bg-[#FFA000] border-[#FFA000]"
                : "border-gray-300 bg-white"
            }`}
          >
            {formData.eco && (
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-semibold">♻️ </span>
            <span className="text-sm font-semibold text-gray-700">
              {locale === "cs"
                ? "Chci úklid pouze pomocí ekologických prostředků"
                : locale === "ru"
                ? "Я хочу уборку только экологически чистыми средствами"
                : "I want to get my place cleaned with eco-friendly only products"}
            </span>
            <div className="text-xs text-gray-500 mt-1">+50 EUR</div>
          </div>
        </label>
      </div>

      <div>
        <Title
          as="h4"
          className="text-[#372900] !text-[20px] lg:!text-[24px] pb-6"
          locale={locale}
        >
          {t(locale, "orderForm.additionalServices")}
        </Title>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = isServiceSelected(service.id);
              const quantity = getServiceQuantity(service.id);
              const hasPrice = service.price && service.price > 0;
              const hasQuantitySupport = service.quantity === true;
              const showQuantityControls = hasPrice && isSelected && hasQuantitySupport;

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`rounded-lg bg-[#FFF5D7] flex flex-col border-1 border-transparent transition-all ${
                    showQuantityControls 
                      ? "" 
                      : "justify-center items-center"
                  } ${
                    !hasPrice
                      ? "cursor-not-allowed opacity-60"
                      : isSelected
                      ? "!border-[#FFA000]"
                      : "cursor-pointer hover:border-[#FFA000]/50"
                  }`}
                >
                  <div className="p-4 flex flex-col h-full justify-center">
                    {service.image && (
                      <div className="relative mx-auto h-24 w-24 mb-3 overflow-hidden">
                        <img
                          src={
                            service.image.url.startsWith("http")
                              ? service.image.url
                              : `${
                                  process.env.NEXT_PUBLIC_STRAPI_URL ||
                                  "http://localhost:1337"
                                }${service.image.url}`
                          }
                          alt={service.image.alternativeText || service.title}
                          className="w-full h-full object-cover h-24 w-24"
                        />
                      </div>
                    )}
                    <Title
                      as="h4"
                      className="font-semibold text-center text-[#372900] mb-2"
                      locale={locale}
                    >
                      {service.title}
                    </Title>
                    
                    <div className="flex w-full justify-center">
                      <Title
                        as="h5"
                        className="text-[#372900] text-center font-semibold bg-[#FFD149] rounded-md p-2 inline-block"
                        locale={locale}
                      >
                        {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                      </Title>
                    </div>
                  </div>

                  {/* Quantity ovládání se zobrazí jen když má služba quantity support */}
                  {showQuantityControls && (
                    <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-b-lg">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(service.id, -1);
                        }}
                        className={`w-12 md:w-8 h-12 rounded-xs cursor-pointer transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold ${
                          quantity === 1 
                            ? "bg-red-100 hover:bg-red-200" 
                            : "bg-[#FFEBB0] hover:bg-[#FFE494]"
                        }`}
                      >
                        {quantity === 1 ? (
                          <img 
                            src="/icons/trash-01.svg" 
                            alt="Remove" 
                            className="w-4 h-4"
                          />
                        ) : (
                          <span className="text-lg font-semibold mb-1 !text-[#372900]">−</span>
                        )}
                      </button>
                      <span className="text-lg font-semibold text-[#372900] min-w-[2rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuantityChange(service.id, 1);
                        }}
                        className="w-12 md:w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFEBB0] hover:bg-[#FFE494] transition-colors duration-200 text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
                      >
                        +
                      </button>
                    </div>
                  )}

                  {!hasPrice && (
                    <div className="mt-2 text-sm text-gray-500">
                      {locale === "cs"
                        ? "Kontaktujte nás"
                        : locale === "ru"
                        ? "Свяжитесь с нами"
                        : "Contact us"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}