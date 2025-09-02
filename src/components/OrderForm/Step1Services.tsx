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
  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, formData.rooms + change);
    updateFormData({ rooms: newRooms });
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, formData.bathrooms + change);
    updateFormData({ bathrooms: newBathrooms });
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

      <div className="grid md:grid-cols-2 gap-6 max-w-[500px]">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t(locale, "orderForm.rooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleRoomsChange(-1)}
              disabled={formData.rooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.rooms}</span>
            <button
              type="button"
              onClick={() => handleRoomsChange(1)}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t(locale, "orderForm.bathrooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleBathroomsChange(-1)}
              disabled={formData.bathrooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.bathrooms}</span>
            <button
              type="button"
              onClick={() => handleBathroomsChange(1)}
              className="w-8 h-12 pb-1 cursor-pointer rounded-xs bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>
        </div>
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

      {/* Rooms and Bathrooms */}
      <div className="grid md:grid-cols-2 gap-6 max-w-[500px]">
        {/* Rooms */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t(locale, "orderForm.rooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleRoomsChange(-1)}
              disabled={formData.rooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.rooms}</span>
            <button
              type="button"
              onClick={() => handleRoomsChange(1)}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t(locale, "orderForm.bathrooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleBathroomsChange(-1)}
              disabled={formData.bathrooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.bathrooms}</span>
            <button
              type="button"
              onClick={() => handleBathroomsChange(1)}
              className="w-8 h-12 pb-1 cursor-pointer rounded-xs bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* NOVÉ ECO-FRIENDLY CHECKBOX */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
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

      {/* Additional Services */}
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
