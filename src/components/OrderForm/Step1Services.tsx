"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Button } from "@/components/Button";

interface Step1ServicesProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  onNext: () => void;
  services: Service[];
  locale: Locale;
}

export function Step1Services({
  formData,
  updateFormData,
  onNext,
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
    // Nepovol vybrat služby bez ceny
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
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step1Title")}
      </h2>

      {/* Rooms and Bathrooms */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Rooms */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t(locale, "orderForm.rooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleRoomsChange(-1)}
              disabled={formData.rooms <= 1}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.rooms}</span>
            <button
              type="button"
              onClick={() => handleRoomsChange(1)}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t(locale, "orderForm.bathrooms")}
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleBathroomsChange(-1)}
              disabled={formData.bathrooms <= 1}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg font-semibold"
            >
              −
            </button>
            <span className="text-xl font-semibold">{formData.bathrooms}</span>
            <button
              type="button"
              onClick={() => handleBathroomsChange(1)}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-lg font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t(locale, "orderForm.additionalServices")}
        </h3>

        {services.length === 0 ? (
          <p className="text-gray-600">
            {t(locale, "orderForm.noAdditionalServices")}
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const isSelected = formData.additionalServices.some(
                (s) => s.id === service.id
              );
              const hasPrice = service.price && service.price > 0;

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceToggle(service)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    !hasPrice
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-60"
                      : isSelected
                      ? "border-blue-600 bg-blue-50 cursor-pointer"
                      : "border-gray-200 hover:border-gray-300 cursor-pointer"
                  }`}
                >
                  {service.image && (
                    <div className="relative w-full h-32 mb-3 rounded-md overflow-hidden">
                      <img
                        src={`${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${service.image.url}`}
                        alt={service.image.alternativeText || service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-blue-600 font-semibold">
                    {service.price ? `${service.price} EUR` : "Cena na dotaz"}
                  </p>
                  {isSelected && hasPrice && (
                    <div className="mt-2 text-sm text-blue-600">
                      ✓ {t(locale, "orderForm.selected")}
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

      {/* Next Button */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onNext}
          className="px-8"
        >
          {t(locale, "orderForm.next")}
        </Button>
      </div>
    </div>
  );
}
