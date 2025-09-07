/*
"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Input } from "@/components/Input";

interface Step3CustomerInfoProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locale: Locale;
}

export function Step3CustomerInfo({
  formData,
  updateFormData,
  locale,
}: Step3CustomerInfoProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <div className="space-y-6">
        <Input
          name="name"
          type="text"
          label={t(locale, "orderForm.name")}
          required
          value={formData.name}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.namePlaceholder")}
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
        />

        <Input
          name="email"
          type="email"
          label={t(locale, "orderForm.email")}
          required
          value={formData.email}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.emailPlaceholder")}
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
        />

        <Input
          name="phone"
          type="tel"
          label={t(locale, "orderForm.phone")}
          required
          value={formData.phone}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.phonePlaceholder")}
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
        />

        <Input
          name="address"
          type="textarea"
          label={t(locale, "orderForm.address")}
          required
          value={formData.address}
          variant="large"
          onChange={handleInputChange}
          placeholder={t(locale, "orderForm.addressPlaceholder")}
          rows={1}
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
        />
      </div>

      <div>
        <span className="text-red-500 mr-1">*</span>
        <span className="text-gray-700 text-sm">
          {t(locale, "orderForm.required")}
        </span>
      </div>
    </div>
  );
}
*/

"use client";
import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Input } from "@/components/Input";
import { Title } from "../Title";

interface Step3CustomerInfoProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locale: Locale;
}

export function Step3CustomerInfo({
  formData,
  updateFormData,
  locale,
}: Step3CustomerInfoProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const frequencyOptions = [
    {
      id: "one-time",
      label: locale === "cs" ? "Jednorázově" : locale === "ru" ? "Одноразово" : "One-time",
      discount: 0,
      description: locale === "cs" ? "Bez slevy" : locale === "ru" ? "Без скидки" : "No discount"
    },
    {
      id: "weekly",
      label: locale === "cs" ? "Týdně" : locale === "ru" ? "Еженедельно" : "Weekly", 
      discount: 20,
      description: locale === "cs" ? "20% sleva" : locale === "ru" ? "Скидка 20%" : "20% discount"
    },
    {
      id: "bi-weekly",
      label: locale === "cs" ? "Každé 2 týdny" : locale === "ru" ? "Каждые 2 недели" : "Every 2 weeks",
      discount: 15,
      description: locale === "cs" ? "15% sleva" : locale === "ru" ? "Скидка 15%" : "15% discount"
    },
    {
      id: "monthly",
      label: locale === "cs" ? "Měsíčně" : locale === "ru" ? "Ежемесячно" : "Monthly",
      discount: 10,
      description: locale === "cs" ? "10% sleva" : locale === "ru" ? "Скидка 10%" : "10% discount"
    }
  ];

  const handleFrequencyChange = (frequencyId: string) => {
    const selectedFrequency = frequencyOptions.find(opt => opt.id === frequencyId);
    if (selectedFrequency) {
      updateFormData({ 
        frequency: frequencyId as "one-time" | "weekly" | "bi-weekly" | "monthly",
        discountPercentage: selectedFrequency.discount
      });
    }
  };

  const selectedFrequency = formData.frequency || "one-time";

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      {/* Frequency Selection */}
      <div className="space-y-4">
        <Title as="h4" className="text-[#372900] !text-[18px] font-semibold" locale={locale}>
          {locale === "cs" ? "Frekvence úklidu" : locale === "ru" ? "Частота уборки" : "Cleaning Frequency"}
        </Title>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {frequencyOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleFrequencyChange(option.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedFrequency === option.id
                  ? "border-[#FFA000] bg-[#FFF5D7]"
                  : "border-gray-200 bg-white hover:border-[#FFA000]/50 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedFrequency === option.id
                        ? "border-[#FFA000] bg-[#FFA000]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedFrequency === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[#372900]">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600">
                      {option.description}
                    </div>
                  </div>
                </div>
                {option.discount > 0 && (
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-sm font-semibold">
                    -{option.discount}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
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
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
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
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
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
          rows={1}
          className="border !border-gray-300 !bg-gray-50 !text-gray-900"
        />
      </div>

      <div>
        <span className="text-red-500 mr-1">*</span>
        <span className="text-gray-700 text-sm">
          {t(locale, "orderForm.required")}
        </span>
      </div>
    </div>
  );
}