"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Location } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Button } from "@/components/Button";

interface Step2LocationTimeProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  locations: Location[];
  locale: Locale;
}

export function Step2LocationTime({
  formData,
  updateFormData,
  onNext,
  onBack,
  locations,
  locale,
}: Step2LocationTimeProps) {
  const timeSlots = [
    { value: "morning", label: t(locale, "orderForm.morning") },
    { value: "noon", label: t(locale, "orderForm.noon") },
    { value: "afternoon", label: t(locale, "orderForm.afternoon") },
    { value: "unsure", label: t(locale, "orderForm.unsure") },
  ];

  const isFormValid = formData.location && formData.date && formData.timeSlot;

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step2Title")}
      </h2>

      {/* Location Selection */}
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
                <span className="text-sm text-gray-600">
                  {location.employee_count}{" "}
                  {locale === "cs"
                    ? "zaměstnanců"
                    : locale === "ru"
                    ? "сотрудников"
                    : "employees"}
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

      {/* Date Selection */}
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

      {/* Time Selection */}
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

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          className="px-8"
        >
          {t(locale, "orderForm.back")}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!isFormValid}
          className="px-8"
        >
          {t(locale, "orderForm.next")}
        </Button>
      </div>
    </div>
  );
}
