// components/StripePaymentForm.tsx
"use client";

import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Locale, t } from '@/utils/i18n';
import { Button } from '@/components/Button';

// Nahraď svým Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripePaymentFormProps {
  clientSecret: string;
  locale: Locale;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
}

function PaymentForm({ 
  locale, 
  onPaymentSuccess, 
  onPaymentError, 
  isLoading: externalLoading 
}: Omit<StripePaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || externalLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        console.error('Payment error:', error);
        onPaymentError(
          error.message || 
          (locale === 'cs' 
            ? 'Nastala chyba při zpracování platby' 
            : locale === 'ru'
            ? 'Произошла ошибка при обработке платежа'
            : 'An error occurred while processing the payment')
        );
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);
      onPaymentError(
        locale === 'cs' 
          ? 'Nastala neočekávaná chyba'
          : locale === 'ru'
          ? 'Произошла неожиданная ошибка'
          : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <PaymentElement 
          options={{
            layout: 'tabs',
          }}
        />
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={!stripe || !elements || isLoading || externalLoading}
        className="w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg"
      >
        {isLoading || externalLoading
          ? (locale === 'cs' 
              ? 'Zpracovávám platbu...' 
              : locale === 'ru'
              ? 'Обработка платежа...'
              : 'Processing payment...')
          : (locale === 'cs' 
              ? 'Zaplatit kartou' 
              : locale === 'ru'
              ? 'Оплатить картой'
              : 'Pay with card')
        }
      </Button>
    </form>
  );
}

export function StripePaymentForm({ 
  clientSecret, 
  locale, 
  onPaymentSuccess, 
  onPaymentError, 
  isLoading 
}: StripePaymentFormProps) {
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#FFA001',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="space-y-4">
      <Elements options={options} stripe={stripePromise}>
        <PaymentForm
          locale={locale}
          onPaymentSuccess={onPaymentSuccess}
          onPaymentError={onPaymentError}
          isLoading={isLoading}
        />
      </Elements>
    </div>
  );
}