"use client";

import React, { useEffect, useState } from "react";
import { useOrderForm } from "@/hooks/useOrderForm";
import { Step1Services } from "./Step1Services";
import { Step2LocationTime } from "./Step2LocationTime";
import { Step3CustomerInfo } from "./Step3CustomerInfo";
import { Step4Payment } from "./Step4Payment";
import { Service, Location } from "@/lib/types/strapi";
import { getStrapiData } from "@/lib/strapi";
import { Locale, t } from "@/utils/i18n";

interface OrderFormProps {
  locale: Locale;
}

export function OrderForm({ locale }: OrderFormProps) {
  const {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    clearForm,
    isLoading,
    setIsLoading,
  } = useOrderForm();
  const [services, setServices] = useState<Service[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // Load services and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, locationsData] = await Promise.all([
          getStrapiData<Service>("services", locale, { populate: "image" }),
          getStrapiData<Location>("locations", locale),
        ]);

        // Ověř strukturu dat a filtruj jen služby s cenou
        const processedServices = Array.isArray(servicesData)
          ? servicesData
          : [];
        const processedLocations = Array.isArray(locationsData)
          ? locationsData
          : [];

        setServices(processedServices);
        setLocations(processedLocations);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };
    loadData();
  }, [locale]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Services
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            services={services}
            locale={locale}
          />
        );
      case 2:
        return (
          <Step2LocationTime
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            locations={locations}
            locale={locale}
          />
        );
      case 3:
        return (
          <Step3CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
            locale={locale}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            updateFormData={updateFormData}
            onBack={prevStep}
            onSubmit={clearForm}
            locale={locale}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                  step <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step}
              </div>
              <span className="text-sm text-gray-600 text-center">
                {t(locale, `orderForm.step${step}Title`)}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      {/* Total price display */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">
            {t(locale, "orderForm.totalPrice")}
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {formData.totalPrice} EUR
          </span>
        </div>
        {currentStep === 1 && (
          <div className="mt-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>{t(locale, "orderForm.basePrice")}</span>
              <span>150 EUR</span>
            </div>
            {formData.rooms > 1 && (
              <div className="flex justify-between">
                <span>
                  {t(locale, "orderForm.additionalRooms")} ({formData.rooms - 1}{" "}
                  × 10 EUR):
                </span>
                <span>{(formData.rooms - 1) * 10} EUR</span>
              </div>
            )}
            {formData.bathrooms > 1 && (
              <div className="flex justify-between">
                <span>
                  {t(locale, "orderForm.additionalBathrooms")} (
                  {formData.bathrooms - 1} × 15 EUR):
                </span>
                <span>{(formData.bathrooms - 1) * 15} EUR</span>
              </div>
            )}
            {formData.additionalServices.length > 0 && (
              <div className="flex justify-between">
                <span>{t(locale, "orderForm.additionalServices")}:</span>
                <span>
                  {formData.additionalServices.reduce(
                    (sum, service) => sum + (service.price || 0),
                    0
                  )}{" "}
                  EUR
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
