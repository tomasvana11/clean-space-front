/*

"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Location } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";

interface Step2LocationTimeProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locations: Location[];
  locale: Locale;
}

export function Step2LocationTime({
  formData,
  updateFormData,
  locations,
  locale,
}: Step2LocationTimeProps) {
  const timeSlots = [
    { value: "morning", label: t(locale, "orderForm.morning") },
    { value: "noon", label: t(locale, "orderForm.noon") },
    { value: "afternoon", label: t(locale, "orderForm.afternoon") },
    { value: "unsure", label: t(locale, "orderForm.unsure") },
  ];

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step2Title")}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.selectLocation")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid gap-3">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => updateFormData({ location })}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.location?.id === location.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">
                  {location.region}
                </span>
              </div>
              {formData.location?.id === location.id && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          {t(locale, "orderForm.selectDate")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={(e) => updateFormData({ date: e.target.value })}
          min={getTomorrowDate()}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.selectTime")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.value}
              onClick={() => updateFormData({ timeSlot: slot.value as any })}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.timeSlot === slot.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-medium text-gray-800">{slot.label}</span>
              {formData.timeSlot === slot.value && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
*/

/*
"use client";

import React, { useState } from "react";
import { OrderFormData } from "@/lib/types/order";
import { Location } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { CustomCalendar } from "@/components/CustomCalendar";

interface Step2LocationTimeProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locations: Location[];
  locale: Locale;
}

export function Step2LocationTime({
  formData,
  updateFormData,
  locations,
  locale,
}: Step2LocationTimeProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const timeSlots = [
    { value: "morning", label: t(locale, "orderForm.morning") },
    { value: "noon", label: t(locale, "orderForm.noon") },
    { value: "afternoon", label: t(locale, "orderForm.afternoon") },
    { value: "unsure", label: t(locale, "orderForm.unsure") },
  ];

  const handleDateSelect = (date: string) => {
    updateFormData({ date });
    setShowCalendar(false);
  };

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString(
      locale === "cs" ? "cs-CZ" : locale === "ru" ? "ru-RU" : "en-US",
      options
    );
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step2Title")}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.selectLocation")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid gap-3">
          {locations.map((location) => (
            <div
              key={location.id}
              onClick={() => updateFormData({ location })}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.location?.id === location.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">
                  {location.region}
                </span>
              </div>
              {formData.location?.id === location.id && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.selectDate")}{" "}
          <span className="text-red-500">*</span>
        </label>

        <button
          type="button"
          onClick={() => setShowCalendar(!showCalendar)}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex items-center justify-between transition-all ${
            formData.date ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <span>
            {formData.date
              ? formatDisplayDate(formData.date)
              : locale === "cs"
              ? "Vyberte datum"
              : locale === "ru"
              ? "Выберите дату"
              : "Select date"}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {showCalendar && (
          <div className="absolute top-full left-0 right-0 mt-2 z-10">
            <CustomCalendar
              selectedDate={formData.date}
              onDateSelect={handleDateSelect}
              locale={locale}
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.selectTime")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <div
              key={slot.value}
              onClick={() => updateFormData({ timeSlot: slot.value as any })}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.timeSlot === slot.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span className="font-medium text-gray-800">{slot.label}</span>
              {formData.timeSlot === slot.value && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showCalendar && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
}
*/

/*
"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Location } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { CustomCalendar } from "@/components/CustomCalendar";

interface Step2LocationTimeProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locations: Location[];
  locale: Locale;
}

export function Step2LocationTime({
  formData,
  updateFormData,
  locations,
  locale,
}: Step2LocationTimeProps) {
  const timeSlots = [
    { value: "morning", label: t(locale, "orderForm.morning") },
    { value: "noon", label: t(locale, "orderForm.noon") },
    { value: "afternoon", label: t(locale, "orderForm.afternoon") },
    { value: "unsure", label: t(locale, "orderForm.unsure") },
  ];

  const handleDateSelect = (date: string) => {
    updateFormData({ date });
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="w-full max-w-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t(locale, "orderForm.selectDate")}{" "}
            <span className="text-red-500">*</span>
          </h3>
          <CustomCalendar
            selectedDate={formData.date}
            onDateSelect={handleDateSelect}
            locale={locale}
          />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              {t(locale, "orderForm.selectLocation")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.location?.id || ""}
                onChange={(e) => {
                  const selectedLocation = locations.find(
                    (loc) => loc.id.toString() === e.target.value
                  );
                  updateFormData({ location: selectedLocation || null });
                }}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800 font-medium appearance-none cursor-pointer bg-white"
              >
                <option value="">
                  {locale === "cs"
                    ? "Vyberte lokaci"
                    : locale === "ru"
                    ? "Выберите местоположение"
                    : "Select location"}
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.region}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-4">
              {t(locale, "orderForm.selectTime")}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.value}
                  onClick={() =>
                    updateFormData({ timeSlot: slot.value as any })
                  }
                  style={{
                    backgroundColor:
                      formData.timeSlot === slot.value ? "#FFA000" : "#FFF5D7",
                    borderColor:
                      formData.timeSlot === slot.value ? "#FFA000" : "#FFE8B3",
                    color:
                      formData.timeSlot === slot.value ? "white" : "#FFA000",
                  }}
                  className="w-full p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{slot.label}</span>
                    {formData.timeSlot === slot.value && (
                      <svg
                        className="w-6 h-6"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Location } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { CustomCalendar } from "@/components/CustomCalendar";

interface Step2LocationTimeProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locations: Location[];
  locale: Locale;
}

export function Step2LocationTime({
  formData,
  updateFormData,
  locations,
  locale,
}: Step2LocationTimeProps) {
  const timeSlots = [
    { value: "morning", label: t(locale, "orderForm.morning") },
    { value: "noon", label: t(locale, "orderForm.noon") },
    { value: "afternoon", label: t(locale, "orderForm.afternoon") },
    { value: "unsure", label: t(locale, "orderForm.unsure") },
  ];

  const handleDateSelect = (date: string) => {
    updateFormData({ date });
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEVÁ STRANA - Čtvercový kalendář */}
        <div className="w-full max-w-sm">
          <CustomCalendar
            selectedDate={formData.date}
            onDateSelect={handleDateSelect}
            locale={locale}
          />
        </div>

        {/* PRAVÁ STRANA - Dropdown lokace + 4 dlaždice pod sebou */}
        <div className="space-y-6">
          {/* Dropdown lokace - bez labelu */}
          <div>
            <div className="relative">
              <select
                value={formData.location?.id || ""}
                onChange={(e) => {
                  const selectedLocation = locations.find(
                    (loc) => loc.id.toString() === e.target.value
                  );
                  updateFormData({ location: selectedLocation || null });
                }}
                className="w-full px-4 py-4 border-1 border-gray-300 rounded-md focus:ring-1 focus:ring-[#FFA000] focus:border-[#FFA000] text-gray-700 font-normal text-base appearance-none cursor-pointer bg-white"
              >
                <option value="">
                  {locale === "cs"
                    ? "Vyberte lokaci"
                    : locale === "ru"
                    ? "Выберите местоположение"
                    : "Select location"}
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.region}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* 4 dlaždice pro čas - pod sebou, bez labelu */}
          <div>
            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <div
                  key={slot.value}
                  onClick={() =>
                    updateFormData({ timeSlot: slot.value as any })
                  }
                  className={`w-full p-4 rounded-md border-1 cursor-pointer transition-all  ${
                    formData.timeSlot === slot.value
                      ? "bg-yellow-[#FFF5D7] text-[#372900] border-[#FFA000]"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      formData.timeSlot === slot.value ? "#FFF5D7" : undefined,
                    color:
                      formData.timeSlot === slot.value ? "#372900" : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-normal text-base">{slot.label}</span>
                    {formData.timeSlot === slot.value && (
                      <svg
                        className="w-6 h-6"
                        fill="#FFA000"
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
