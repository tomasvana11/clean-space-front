/*
"use client";

import React, { useState } from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";

interface Step4PaymentProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  locale: Locale;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function Step4Payment({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  locale,
  isLoading,
  setIsLoading,
}: Step4PaymentProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentMethods = [
    {
      value: "bankTransfer",
      label: t(locale, "orderForm.bankTransfer"),
      disabled: false,
    },
    { value: "card", label: t(locale, "orderForm.card"), disabled: true },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      // Clear form after 3 seconds
      setTimeout(() => {
        onSubmit();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      setError(t(locale, "orderForm.orderError"));
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {t(locale, "orderForm.orderSuccess")}
        </h2>
        <p className="text-gray-600">
          {locale === "cs"
            ? "Brzy se vám ozveme s dalšími informacemi."
            : locale === "ru"
            ? "Скоро мы свяжемся с вами для получения дополнительной информации."
            : "We will contact you soon with further information."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step4Title")}
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {locale === "cs"
            ? "Shrnutí objednávky"
            : locale === "ru"
            ? "Сводка заказа"
            : "Order Summary"}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t(locale, "orderForm.rooms")}:</span>
            <span>{formData.rooms}</span>
          </div>
          <div className="flex justify-between">
            <span>{t(locale, "orderForm.bathrooms")}:</span>
            <span>{formData.bathrooms}</span>
          </div>
          {formData.additionalServices.length > 0 && (
            <div className="flex justify-between">
              <span>{t(locale, "orderForm.additionalServices")}:</span>
              <span>
                {formData.additionalServices.map((s) => s.title).join(", ")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>
              {locale === "cs"
                ? "Místo:"
                : locale === "ru"
                ? "Место:"
                : "Location:"}
            </span>
            <span>{formData.location?.region}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {locale === "cs" ? "Datum:" : locale === "ru" ? "Дата:" : "Date:"}
            </span>
            <span>{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {locale === "cs" ? "Čas:" : locale === "ru" ? "Время:" : "Time:"}
            </span>
            <span>{t(locale, `orderForm.${formData.timeSlot}`)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>{t(locale, "orderForm.totalPrice")}</span>
            <span>{formData.totalPrice} EUR</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.paymentMethod")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              onClick={() =>
                !method.disabled &&
                updateFormData({ paymentMethod: method.value as any })
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                method.disabled
                  ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                  : formData.paymentMethod === method.value
                  ? "border-blue-600 bg-blue-50 cursor-pointer"
                  : "border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <span className="font-medium text-gray-800">{method.label}</span>
              {!method.disabled && formData.paymentMethod === method.value && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          disabled={isLoading}
          className="px-8"
        >
          {t(locale, "orderForm.back")}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          className="px-8"
        >
          {isLoading
            ? t(locale, "orderForm.submitting")
            : t(locale, "orderForm.submit")}
        </Button>
      </div>
    </div>
  );
}
*/

"use client";

import React, { useState } from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";

interface Step4PaymentProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  locale: Locale;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function Step4Payment({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  locale,
  isLoading,
  setIsLoading,
}: Step4PaymentProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentMethods = [
    {
      value: "bankTransfer",
      label: t(locale, "orderForm.bankTransfer"),
      disabled: false,
    },
    { value: "card", label: t(locale, "orderForm.card"), disabled: true },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      // Clear form after 3 seconds
      setTimeout(() => {
        onSubmit();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t(locale, "orderForm.orderError");

      // Speciální zpráva pro obsazený slot
      if (errorMessage.includes("already booked")) {
        setError(
          locale === "cs"
            ? "Tento termín je již obsazen. Prosím vyberte jiný čas nebo datum."
            : locale === "ru"
            ? "Это время уже занято. Пожалуйста, выберите другое время или дату."
            : "This time slot is already booked. Please choose a different time or date."
        );
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {t(locale, "orderForm.orderSuccess")}
        </h2>
        <p className="text-gray-600">
          {locale === "cs"
            ? "Brzy se vám ozveme s dalšími informacemi."
            : locale === "ru"
            ? "Скоро мы свяжемся с вами для получения дополнительной информации."
            : "We will contact you soon with further information."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {t(locale, "orderForm.step4Title")}
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {locale === "cs"
            ? "Shrnutí objednávky"
            : locale === "ru"
            ? "Сводка заказа"
            : "Order Summary"}
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{t(locale, "orderForm.rooms")}:</span>
            <span>{formData.rooms}</span>
          </div>
          <div className="flex justify-between">
            <span>{t(locale, "orderForm.bathrooms")}:</span>
            <span>{formData.bathrooms}</span>
          </div>
          {formData.additionalServices.length > 0 && (
            <div className="flex justify-between">
              <span>{t(locale, "orderForm.additionalServices")}:</span>
              <span>
                {formData.additionalServices.map((s) => s.title).join(", ")}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>
              {locale === "cs"
                ? "Místo:"
                : locale === "ru"
                ? "Место:"
                : "Location:"}
            </span>
            <span>{formData.location?.region}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {locale === "cs" ? "Datum:" : locale === "ru" ? "Дата:" : "Date:"}
            </span>
            <span>{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {locale === "cs" ? "Čas:" : locale === "ru" ? "Время:" : "Time:"}
            </span>
            <span>{t(locale, `orderForm.${formData.timeSlot}`)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-semibold text-lg">
            <span>{t(locale, "orderForm.totalPrice")}</span>
            <span>{formData.totalPrice} EUR</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t(locale, "orderForm.paymentMethod")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              onClick={() =>
                !method.disabled &&
                updateFormData({ paymentMethod: method.value as any })
              }
              className={`p-4 rounded-lg border-2 transition-all ${
                method.disabled
                  ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                  : formData.paymentMethod === method.value
                  ? "border-blue-600 bg-blue-50 cursor-pointer"
                  : "border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <span className="font-medium text-gray-800">{method.label}</span>
              {!method.disabled && formData.paymentMethod === method.value && (
                <div className="mt-2 text-sm text-blue-600">
                  ✓ {t(locale, "orderForm.selected")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={onBack}
          disabled={isLoading}
          className="px-8"
        >
          {t(locale, "orderForm.back")}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={isLoading}
          loading={isLoading}
          className="px-8"
        >
          {isLoading
            ? t(locale, "orderForm.submitting")
            : t(locale, "orderForm.submit")}
        </Button>
      </div>
    </div>
  );
}
