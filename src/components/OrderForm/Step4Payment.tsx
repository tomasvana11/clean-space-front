
/*
"use client";

import React from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";

interface Step4PaymentProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locale: Locale;
}

export function Step4Payment({
  formData,
  updateFormData,
  locale,
}: Step4PaymentProps) {
  const paymentMethods = [
    {
      value: "bankTransfer",
      label: t(locale, "orderForm.bankTransfer"),
      icon: "/icons/bank.svg",
      disabled: false,
    },
    {
      value: "card",
      label: t(locale, "orderForm.card"),
      icon: "/icons/credit-card.svg",
      disabled: true,
    },
  ];

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <div>
        <div className="flex flex-col md:flex-row gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              onClick={() =>
                !method.disabled &&
                updateFormData({ paymentMethod: method.value as any })
              }
              className={`p-4 rounded-md transition-all w-full flex flex-col gap-2 py-16 items-center ${
                method.disabled
                  ? "bg-[#FFF5D7] cursor-not-allowed opacity-50"
                  : formData.paymentMethod === method.value
                  ? "outline-2 outline-[#FFA301] bg-[#FFF5D7] cursor-pointer"
                  : "hover:bg-[#FFECB5] bg-[#FFF5D7] cursor-pointer"
              }`}
            >
              <img src={method.icon} alt={method.label} className="w-10 h-10" />
              <Title
                as="h4"
                className="text-[#372900] !text-[20px] lg:!text-[24px]"
              >
                {method.label}
              </Title>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
*/

"use client";

import React, { useState, useEffect } from "react";
import { OrderFormData } from "@/lib/types/order";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";
import { StripePaymentForm } from "@/components/StripePaymentForm";

interface Step4PaymentProps {
  formData: OrderFormData;
  updateFormData: (updates: Partial<OrderFormData>) => void;
  locale: Locale;
  onStripePaymentSuccess?: (paymentIntentId: string) => void;
  onStripePaymentError?: (error: string) => void;
  isLoading?: boolean;
}

export function Step4Payment({
  formData,
  updateFormData,
  locale,
  onStripePaymentSuccess,
  onStripePaymentError,
  isLoading = false,
}: Step4PaymentProps) {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntentLoading, setPaymentIntentLoading] = useState(false);

  const paymentMethods = [
    {
      value: "bankTransfer",
      label: t(locale, "orderForm.bankTransfer"),
      icon: "/icons/bank.svg",
      disabled: false,
    },
    {
      value: "card",
      label: t(locale, "orderForm.card"),
      icon: "/icons/credit-card.svg",
      disabled: false, // Nyní povoleno
    },
  ];

  // Vytvoření Payment Intent když je vybrána karta
  useEffect(() => {
    const createPaymentIntent = async () => {
      if (formData.paymentMethod === 'card' && formData.totalPrice && !clientSecret) {
        setPaymentIntentLoading(true);
        
        try {
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: formData.totalPrice,
              currency: 'eur',
              orderData: {
                email: formData.email,
                totalPrice: formData.totalPrice,
              },
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }

          const { clientSecret: newClientSecret } = await response.json();
          setClientSecret(newClientSecret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
          onStripePaymentError?.(
            locale === 'cs'
              ? 'Nepodařilo se připravit platbu. Zkuste to prosím znovu.'
              : locale === 'ru'
              ? 'Не удалось подготовить платеж. Пожалуйста, попробуйте еще раз.'
              : 'Failed to prepare payment. Please try again.'
          );
        } finally {
          setPaymentIntentLoading(false);
        }
      }
    };

    createPaymentIntent();
  }, [formData.paymentMethod, formData.totalPrice, clientSecret, locale, onStripePaymentError]);

  const handlePaymentMethodChange = (method: string) => {
    updateFormData({ paymentMethod: method as any });
    
    // Reset client secret když se změní metoda platby
    if (method !== 'card') {
      setClientSecret("");
    }
  };

  const handleStripeSuccess = (paymentIntentId: string) => {
    updateFormData({ stripePaymentIntentId: paymentIntentId });
    onStripePaymentSuccess?.(paymentIntentId);
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6 w-full">
      <div>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              onClick={() =>
                !method.disabled && handlePaymentMethodChange(method.value)
              }
              className={`p-4 rounded-md transition-all w-full flex flex-col gap-2 py-16 items-center ${
                method.disabled
                  ? "bg-[#FFF5D7] cursor-not-allowed opacity-50"
                  : formData.paymentMethod === method.value
                  ? "outline-2 outline-[#FFA301] bg-[#FFF5D7] cursor-pointer"
                  : "hover:bg-[#FFECB5] bg-[#FFF5D7] cursor-pointer"
              }`}
            >
              <img src={method.icon} alt={method.label} className="w-10 h-10" />
              <Title
                as="h4"
                className="text-[#372900] !text-[20px] lg:!text-[24px]"
                locale={locale}
              >
                {method.label}
              </Title>
            </div>
          ))}
        </div>

        {/* Zobrazení informací o bankovním převodu */}
        {formData.paymentMethod === 'bankTransfer' && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">
              {locale === 'cs'
                ? 'Informace o bankovním převodu'
                : locale === 'ru'
                ? 'Информация о банковском переводе'
                : 'Bank Transfer Information'}
            </h4>
            <p className="text-blue-700 text-sm">
              {locale === 'cs'
                ? 'Po odeslání objednávky obdržíte e-mail s údaji pro bankovní převod.'
                : locale === 'ru'
                ? 'После отправки заказа вы получите электронное письмо с банковскими реквизитами.'
                : 'After submitting your order, you will receive an email with bank transfer details.'}
            </p>
          </div>
        )}

        {/* Stripe platební formulář */}
        {formData.paymentMethod === 'card' && (
          <div className="space-y-4">
            {paymentIntentLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFA001] mx-auto mb-2"></div>
                  <p className="text-gray-600">
                    {locale === 'cs'
                      ? 'Připravuji platbu...'
                      : locale === 'ru'
                      ? 'Подготовка платежа...'
                      : 'Preparing payment...'}
                  </p>
                </div>
              </div>
            ) : clientSecret ? (
              <>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-1">
                    {locale === 'cs'
                      ? 'Platba kartou'
                      : locale === 'ru'
                      ? 'Оплата картой'
                      : 'Card Payment'}
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    {locale === 'cs'
                      ? 'Vyplňte údaje své karty pro dokončení platby.'
                      : locale === 'ru'
                      ? 'Заполните данные вашей карты для завершения платежа.'
                      : 'Fill in your card details to complete the payment.'}
                  </p>
                </div>
                
                <StripePaymentForm
                  clientSecret={clientSecret}
                  locale={locale}
                  onPaymentSuccess={handleStripeSuccess}
                  onPaymentError={onStripePaymentError || (() => {})}
                  isLoading={isLoading}
                />
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}