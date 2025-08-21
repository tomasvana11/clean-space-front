"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

interface Step3CustomerInfoProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  locale: Locale;
}

export function Step3CustomerInfo({
  formData,
  updateFormData,
  onNext,
  onBack,
  locale,
}: Step3CustomerInfoProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const isFormValid =
    formData.name && formData.email && formData.phone && formData.address;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step3Title")}
      </h2>

      <div className="space-y-6">
        {/* Name */}
        <Input
          name="name"
          type="text"
          label={t(locale, "orderForm.name")}
          required
          value={formData.name}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.namePlaceholder")}
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          label={t(locale, "orderForm.email")}
          required
          value={formData.email}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.emailPlaceholder")}
        />

        {/* Phone */}
        <Input
          name="phone"
          type="tel"
          label={t(locale, "orderForm.phone")}
          required
          value={formData.phone}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.phonePlaceholder")}
        />

        {/* Address */}
        <Input
          name="address"
          type="textarea"
          label={t(locale, "orderForm.address")}
          required
          value={formData.address}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.addressPlaceholder")}
          rows={3}
        />
      </div>

      <div>
        <span className="text-red-500 mr-1">*</span>
        <span className="text-gray-700 text-sm">
          {t(locale, "orderForm.required")}
        </span>
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
