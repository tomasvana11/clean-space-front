/*
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
import { ContentWrapper } from "../ContentWrapper";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";
import { Title } from "../Title";

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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load services and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, locationsData] = await Promise.all([
          getStrapiData<Service>("services", locale, { populate: "image" }),
          getStrapiData<Location>("locations", locale),
        ]);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      setTimeout(() => {
        clearForm();
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t(locale, "orderForm.orderError");

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Services
            formData={formData}
            updateFormData={updateFormData}
            services={services}
            locale={locale}
          />
        );
      case 2:
        return (
          <Step2LocationTime
            formData={formData}
            updateFormData={updateFormData}
            locations={locations}
            locale={locale}
          />
        );
      case 3:
        return (
          <Step3CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      default:
        return null;
    }
  };

  const getNavigationButtons = () => {
    if (success) {
      return null;
    }

    const isStep1Valid = true; // Step 1 je vždy validní
    const isStep2Valid = Boolean(
      formData.location && formData.date && formData.timeSlot
    );
    const isStep3Valid = Boolean(
      formData.name && formData.email && formData.phone && formData.address
    );
    const isStep4Valid = Boolean(formData.paymentMethod);

    let isCurrentStepValid = false;
    switch (currentStep) {
      case 1:
        isCurrentStepValid = isStep1Valid;
        break;
      case 2:
        isCurrentStepValid = isStep2Valid;
        break;
      case 3:
        isCurrentStepValid = isStep3Valid;
        break;
      case 4:
        isCurrentStepValid = isStep4Valid;
        break;
    }

    return (
      <div className="flex flex-col gap-4">
        {currentStep < 4 ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={nextStep}
            disabled={!isCurrentStepValid}
            className={`px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ${
              currentStep === 1 ? "ml-auto" : ""
            }`}
          >
            {t(locale, "orderForm.next")}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading || !isCurrentStepValid}
            className="px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ml-auto"
          >
            {isLoading
              ? t(locale, "orderForm.submitting")
              : t(locale, "orderForm.submit")}
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            type="button"
            variant="blank"
            size="sm"
            onClick={prevStep}
            disabled={isLoading}
            className="px-8 !text-base !rounded-lg"
          >
            {t(locale, "orderForm.back")}
          </Button>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <ContentWrapper>
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
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className="!px-0">
      <div className="mb-8 mt-4">
        <div className="max-w-[800px] bg-white mx-auto rounded-sm overflow-hidden hidden lg:block">
          <div className="flex items-center ">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`flex items-center p-3 w-full font-semibold ${
                    step === currentStep
                      ? "bg-[#FFA000] text-white rounded-sm overflow-hidden"
                      : "text-gray-800"
                  }`}
                >
                  <span className="mx-auto text-center">
                    {t(locale, `orderForm.step${step}Title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center justify-center p-3 bg-white text-gray-800 ring-1 ring-gray-200 font-semibold rounded-sm">
            {t(locale, "orderForm.stepStep")} {currentStep}{" "}
            {t(locale, "orderForm.stepOf")} 4 -{" "}
            {t(locale, `orderForm.step${currentStep}Title`)}
          </div>
        </div>
      </div>

      <Title as="h3" className="text-center text-gray-800 mb-8" locale={locale}>
        {currentStep === 1 && <span>{t(locale, "orderForm.step1")}</span>}
        {currentStep === 2 && <span>{t(locale, "orderForm.step2")}</span>}
        {currentStep === 3 && <span>{t(locale, "orderForm.step3")}</span>}
        {currentStep === 4 && <span>{t(locale, "orderForm.step4")}</span>}
      </Title>
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">{renderStep()}</div>

        <div className="space-y-6 bg-white rounded-xl p-6 w-full lg:max-w-90 xl:w-90 shadow-[0px_4px_40px_0px_rgba(70,70,86,0.1)]">

          <div className="text-sm text-[#372900] space-y-1">
            <div>
              <div className="py-1 px-2 font-semibold rounded-lg bg-[#FFF5D7] text-[#BC7700] inline-flex mb-2 mr-2">
                <span>{formData.property === "flat" ? "🏬" : "🏡"}&nbsp;</span>
                <span>
                  {formData.property === "flat"
                    ? locale === "cs"
                      ? "Byt"
                      : locale === "ru"
                      ? "Квартира"
                      : "Flat"
                    : locale === "cs"
                    ? "Dům"
                    : locale === "ru"
                    ? "Дом"
                    : "House"}
                </span>
              </div>
              {formData.eco && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-green-100 text-green-600 inline-flex mb-2">
                  <span>♻️&nbsp;</span>
                  <span>
                    {locale === "cs"
                      ? "Ekologicky"
                      : locale === "ru"
                      ? "Экологически чистые"
                      : "Eco-friendly"}
                  </span>
                </div>
              )}
            </div>
            <Title as="h4" locale={locale}>
              {t(locale, "orderForm.rooms")}: {formData.rooms},{" "}
              {t(locale, "orderForm.bathrooms")}: {formData.bathrooms}
              {formData.additionalServices.length > 0 && (
                <>
                  <span>, </span>
                  <span>
                    {formData.additionalServices.map((s) => s.title).join(", ")}
                  </span>
                </>
              )}
            </Title>
          </div>

          <div className="flex justify-between items-center rounded-lg bg-[#FFF5D7] p-3 gap-2">
            <Title
              as="h4"
              className="text-2xl font-bold text-[#372900]"
              locale={locale}
            >
              {formData.totalPrice} EUR
            </Title>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {getNavigationButtons()}
        </div>
      </div>
    </ContentWrapper>
  );
}
*/


/*
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { useOrderForm } from "@/hooks/useOrderForm";
import { Step1Services } from "./Step1Services";
import { Step2LocationTime } from "./Step2LocationTime";
import { Step3CustomerInfo } from "./Step3CustomerInfo";
import { Step4Payment } from "./Step4Payment";
import { Service, Location } from "@/lib/types/strapi";
import { getStrapiData } from "@/lib/strapi";
import { Locale, t } from "@/utils/i18n";
import { ContentWrapper } from "../ContentWrapper";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";
import { Title } from "../Title";

interface OrderFormProps {
  locale: Locale;
}

export function OrderForm({ locale }: OrderFormProps) {
  const router = useRouter()
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load services and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, locationsData] = await Promise.all([
          getStrapiData<Service>("services", locale, { populate: "image" }),
          getStrapiData<Location>("locations", locale),
        ]);

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



  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      setTimeout(() => {
        clearForm();
        router.push(`/${locale}`);  
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t(locale, "orderForm.orderError");

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Services
            formData={formData}
            updateFormData={updateFormData}
            services={services}
            locale={locale}
          />
        );
      case 2:
        return (
          <Step2LocationTime
            formData={formData}
            updateFormData={updateFormData}
            locations={locations}
            locale={locale}
          />
        );
      case 3:
        return (
          <Step3CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      default:
        return null;
    }
  };

  const getNavigationButtons = () => {
    if (success) {
      return null;
    }

    const isStep1Valid = true; // Step 1 je vždy validní
    const isStep2Valid = Boolean(
      formData.location && formData.date && formData.timeSlot
    );
    const isStep3Valid = Boolean(
      formData.name && formData.email && formData.phone && formData.address
    );
    const isStep4Valid = Boolean(formData.paymentMethod);

    let isCurrentStepValid = false;
    switch (currentStep) {
      case 1:
        isCurrentStepValid = isStep1Valid;
        break;
      case 2:
        isCurrentStepValid = isStep2Valid;
        break;
      case 3:
        isCurrentStepValid = isStep3Valid;
        break;
      case 4:
        isCurrentStepValid = isStep4Valid;
        break;
    }

    return (
      <div className="flex flex-col gap-4">
        {currentStep < 4 ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={nextStep}
            disabled={!isCurrentStepValid}
            className={`px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ${
              currentStep === 1 ? "ml-auto" : ""
            }`}
          >
            {t(locale, "orderForm.next")}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading || !isCurrentStepValid}
            className="px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ml-auto"
          >
            {isLoading
              ? t(locale, "orderForm.submitting")
              : t(locale, "orderForm.submit")}
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            type="button"
            variant="blank"
            size="sm"
            onClick={prevStep}
            disabled={isLoading}
            className="px-8 !text-base !rounded-lg"
          >
            {t(locale, "orderForm.back")}
          </Button>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <ContentWrapper>
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
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className="!px-0">
      <div className="mb-8 mt-4">
        <div className="max-w-[800px] bg-white mx-auto rounded-sm overflow-hidden hidden lg:block">
          <div className="flex items-center ">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`flex items-center p-3 w-full font-semibold ${
                    step === currentStep
                      ? "bg-[#FFA000] text-white rounded-sm overflow-hidden"
                      : "text-gray-800"
                  }`}
                >
                  <span className="mx-auto text-center">
                    {t(locale, `orderForm.step${step}Title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center justify-center p-3 bg-white text-gray-800 ring-1 ring-gray-200 font-semibold rounded-sm">
            {t(locale, "orderForm.stepStep")} {currentStep}{" "}
            {t(locale, "orderForm.stepOf")} 4 -{" "}
            {t(locale, `orderForm.step${currentStep}Title`)}
          </div>
        </div>
      </div>

      <Title as="h3" className="text-center text-gray-800 mb-8" locale={locale}>
        {currentStep === 1 && <span>{t(locale, "orderForm.step1")}</span>}
        {currentStep === 2 && <span>{t(locale, "orderForm.step2")}</span>}
        {currentStep === 3 && <span>{t(locale, "orderForm.step3")}</span>}
        {currentStep === 4 && <span>{t(locale, "orderForm.step4")}</span>}
      </Title>
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">{renderStep()}</div>

        <div className="space-y-6 bg-white rounded-xl p-6 w-full lg:max-w-90 xl:w-90 shadow-[0px_4px_40px_0px_rgba(70,70,86,0.1)]">
          <div className="text-sm text-[#372900] space-y-1">
            <div>
              <div className="py-1 px-2 font-semibold rounded-lg bg-[#FFF5D7] text-[#BC7700] inline-flex mb-2 mr-2">
                <span>{formData.property === "flat" ? "🏬" : "🏡"}&nbsp;</span>
                <span>
                  {formData.property === "flat"
                    ? locale === "cs"
                      ? "Byt"
                      : locale === "ru"
                      ? "Квартира"
                      : "Flat"
                    : locale === "cs"
                    ? "Dům"
                    : locale === "ru"
                    ? "Дом"
                    : "House"}
                </span>
              </div>
              {formData.eco && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-green-100 text-green-600 inline-flex mb-2">
                  <span>♻️&nbsp;</span>
                  <span>
                    {locale === "cs"
                      ? "Ekologicky"
                      : locale === "ru"
                      ? "Экологически чистые"
                      : "Eco-friendly"}
                  </span>
                </div>
              )}
            </div>
            <Title as="h4" locale={locale}>
              {t(locale, "orderForm.rooms")}: {formData.rooms},{" "}
              {t(locale, "orderForm.bathrooms")}: {formData.bathrooms}
            </Title>
            
            {formData.additionalServices.length > 0 && (
              <div className="mt-3 space-y-2">
                <hr className="border-gray-300" />
                <h4 className="font-bold text-base text-gray-800">
                  {t(locale, "orderForm.additionalServicesTitle")}:
                </h4>
                {formData.additionalServices.map((item) => (
                  <div key={item.service.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                    {item.quantity > 1 && (
                        <span>{item.quantity} × </span>
                      )}
                      <span>{item.service.title}</span>
                    </span>
                    <span className="text-gray-700">
                      {(item.service.price || 0) * item.quantity} EUR
                    </span>
                  </div>
                ))}
                <hr className="border-gray-300" />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center rounded-lg bg-[#FFF5D7] p-3 gap-2">
            <Title
              as="h4"
              className="text-2xl font-bold text-[#372900]"
              locale={locale}
            >
              {formData.totalPrice} EUR
            </Title>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {getNavigationButtons()}
        </div>
      </div>
    </ContentWrapper>
  );
}
*/




/*
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderForm } from "@/hooks/useOrderForm";
import { Step1Services } from "./Step1Services";
import { Step2LocationTime } from "./Step2LocationTime";
import { Step3CustomerInfo } from "./Step3CustomerInfo";
import { Step4Payment } from "./Step4Payment";
import { Service, Location } from "@/lib/types/strapi";
import { getStrapiData } from "@/lib/strapi";
import { Locale, t } from "@/utils/i18n";
import { ContentWrapper } from "../ContentWrapper";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";
import { Title } from "../Title";

interface OrderFormProps {
  locale: Locale;
}

export function OrderForm({ locale }: OrderFormProps) {
  const router = useRouter();
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load services and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, locationsData] = await Promise.all([
          getStrapiData<Service>("services", locale, { populate: "image" }),
          getStrapiData<Location>("locations", locale),
        ]);

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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      setTimeout(() => {
        clearForm();
        router.push(`/${locale}`);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t(locale, "orderForm.orderError");

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Services
            formData={formData}
            updateFormData={updateFormData}
            services={services}
            locale={locale}
          />
        );
      case 2:
        return (
          <Step2LocationTime
            formData={formData}
            updateFormData={updateFormData}
            locations={locations}
            locale={locale}
          />
        );
      case 3:
        return (
          <Step3CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      default:
        return null;
    }
  };

  const getNavigationButtons = () => {
    if (success) {
      return null;
    }

    const isStep1Valid = true; // Step 1 je vždy validní
    const isStep2Valid = Boolean(
      formData.location && formData.date && formData.timeSlot
    );
    const isStep3Valid = Boolean(
      formData.name && formData.email && formData.phone && formData.address
    );
    const isStep4Valid = Boolean(formData.paymentMethod);

    let isCurrentStepValid = false;
    switch (currentStep) {
      case 1:
        isCurrentStepValid = isStep1Valid;
        break;
      case 2:
        isCurrentStepValid = isStep2Valid;
        break;
      case 3:
        isCurrentStepValid = isStep3Valid;
        break;
      case 4:
        isCurrentStepValid = isStep4Valid;
        break;
    }

    return (
      <div className="flex flex-col gap-4">
        {currentStep < 4 ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={nextStep}
            disabled={!isCurrentStepValid}
            className={`px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ${
              currentStep === 1 ? "ml-auto" : ""
            }`}
          >
            {t(locale, "orderForm.next")}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading || !isCurrentStepValid}
            className="px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ml-auto"
          >
            {isLoading
              ? t(locale, "orderForm.submitting")
              : t(locale, "orderForm.submit")}
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            type="button"
            variant="blank"
            size="sm"
            onClick={prevStep}
            disabled={isLoading}
            className="px-8 !text-base !rounded-lg"
          >
            {t(locale, "orderForm.back")}
          </Button>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <ContentWrapper>
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
          <p className="text-gray-600 mb-4">
            {locale === "cs"
              ? "Brzy se vám ozveme s dalšími informacemi."
              : locale === "ru"
              ? "Скоро мы свяжемся с вами для получения дополнительной информации."
              : "We will contact you soon with further information."}
          </p>
          <p className="text-sm text-gray-500">
            {locale === "cs"
              ? "Za chvíli budete přesměrováni na hlavní stránku..."
              : locale === "ru"
              ? "Вы будете перенаправлены на главную страницу через мгновение..."
              : "You will be redirected to the homepage in a moment..."}
          </p>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className="!px-0">
      <div className="mb-8 mt-4">
        <div className="max-w-[800px] bg-white mx-auto rounded-sm overflow-hidden hidden lg:block">
          <div className="flex items-center ">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`flex items-center p-3 w-full font-semibold ${
                    step === currentStep
                      ? "bg-[#FFA000] text-white rounded-sm overflow-hidden"
                      : "text-gray-800"
                  }`}
                >
                  <span className="mx-auto text-center">
                    {t(locale, `orderForm.step${step}Title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center justify-center p-3 bg-white text-gray-800 ring-1 ring-gray-200 font-semibold rounded-sm">
            {t(locale, "orderForm.stepStep")} {currentStep}{" "}
            {t(locale, "orderForm.stepOf")} 4 -{" "}
            {t(locale, `orderForm.step${currentStep}Title`)}
          </div>
        </div>
      </div>

      <Title as="h3" className="text-center text-gray-800 mb-8" locale={locale}>
        {currentStep === 1 && <span>{t(locale, "orderForm.step1")}</span>}
        {currentStep === 2 && <span>{t(locale, "orderForm.step2")}</span>}
        {currentStep === 3 && <span>{t(locale, "orderForm.step3")}</span>}
        {currentStep === 4 && <span>{t(locale, "orderForm.step4")}</span>}
      </Title>
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">{renderStep()}</div>

        <div className="space-y-6 bg-white rounded-xl p-6 w-full lg:max-w-90 xl:w-90 shadow-[0px_4px_40px_0px_rgba(70,70,86,0.1)]">
          <div className="text-sm text-[#372900] space-y-1">
            <div>
              <div className="py-1 px-2 font-semibold rounded-lg bg-[#FFF5D7] text-[#BC7700] inline-flex mb-2 mr-2">
                <span>{formData.property === "flat" ? "🏬" : "🏡"}&nbsp;</span>
                <span>
                  {formData.property === "flat"
                    ? locale === "cs"
                      ? "Byt"
                      : locale === "ru"
                      ? "Квартира"
                      : "Flat"
                    : locale === "cs"
                    ? "Dům"
                    : locale === "ru"
                    ? "Дом"
                    : "House"}
                </span>
              </div>
              {formData.eco && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-green-100 text-green-600 inline-flex mb-2">
                  <span>♻️&nbsp;</span>
                  <span>
                    {locale === "cs"
                      ? "Ekologicky"
                      : locale === "ru"
                      ? "Экологически чистые"
                      : "Eco-friendly"}
                  </span>
                </div>
              )}
              {formData.frequency && formData.frequency !== "one-time" && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-blue-100 text-blue-600 inline-flex mb-2">
                  <span>🔄&nbsp;</span>
                  <span>
                    {formData.frequency === "weekly" 
                      ? (locale === "cs" ? "Týdně" : locale === "ru" ? "Еженедельно" : "Weekly")
                      : formData.frequency === "bi-weekly"
                      ? (locale === "cs" ? "Každé 2 týdny" : locale === "ru" ? "Каждые 2 недели" : "Every 2 weeks")
                      : formData.frequency === "monthly"
                      ? (locale === "cs" ? "Měsíčně" : locale === "ru" ? "Ежемесячно" : "Monthly")
                      : formData.frequency
                    }
                  </span>
                </div>
              )}
            </div>
            <Title as="h4" locale={locale}>
              {t(locale, "orderForm.rooms")}: {formData.rooms},{" "}
              {t(locale, "orderForm.bathrooms")}: {formData.bathrooms}
            </Title>
            
            {formData.additionalServices.length > 0 && (
              <div className="mt-3 space-y-2">
                <hr className="border-gray-300" />
                <h4 className="font-bold text-base text-gray-800">
                  {t(locale, "orderForm.additionalServicesTitle")}:
                </h4>
                {formData.additionalServices.map((item) => (
                  <div key={item.service.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      {item.quantity > 1 && (
                        <span>{item.quantity} × </span>
                      )}
                      <span>{item.service.title}</span>
                    </span>
                    <span className="text-gray-700">
                      {(item.service.price || 0) * item.quantity} EUR
                    </span>
                  </div>
                ))}
                <hr className="border-gray-300" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            {formData.frequency && formData.frequency !== "one-time" && formData.discountPercentage && formData.discountPercentage > 0 && (
              <>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {locale === "cs" ? "Původní cena:" : locale === "ru" ? "Исходная цена:" : "Original price:"}
                  </span>
                  <span className="line-through">{formData.originalPrice} EUR</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {locale === "cs" ? "Frekvence:" : locale === "ru" ? "Частота:" : "Frequency:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">
                      {formData.frequency === "weekly" 
                        ? (locale === "cs" ? "Týdně" : locale === "ru" ? "Еженедельно" : "Weekly")
                        : formData.frequency === "bi-weekly"
                        ? (locale === "cs" ? "Každé 2 týdny" : locale === "ru" ? "Каждые 2 недели" : "Every 2 weeks")
                        : formData.frequency === "monthly"
                        ? (locale === "cs" ? "Měsíčně" : locale === "ru" ? "Ежемесячно" : "Monthly")
                        : formData.frequency
                      }
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                      -{formData.discountPercentage}%
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>
                    {locale === "cs" ? "Sleva:" : locale === "ru" ? "Скидка:" : "Discount:"}
                  </span>
                  <span>-{Math.round(((formData.originalPrice || 0) * (formData.discountPercentage || 0)) / 100)} EUR</span>
                </div>
                
                <hr className="border-gray-300" />
              </>
            )}
            
            <div className="flex justify-between items-center rounded-lg bg-[#FFF5D7] p-3 gap-2">
              <Title
                as="h4"
                className="text-xl font-bold text-[#372900]"
                locale={locale}
              >
                {locale === "cs" ? "Celková cena:" : locale === "ru" ? "Итоговая цена:" : "Total price:"}
              </Title>
              <Title
                as="h4"
                className="text-2xl font-bold text-[#372900]"
                locale={locale}
              >
                {formData.totalPrice} EUR
              </Title>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {getNavigationButtons()}
        </div>
      </div>
    </ContentWrapper>
  );
}

export default OrderForm;
*/

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderForm } from "@/hooks/useOrderForm";
import { Step1Services } from "./Step1Services";
import { Step2LocationTime } from "./Step2LocationTime";
import { Step3CustomerInfo } from "./Step3CustomerInfo";
import { Step4Payment } from "./Step4Payment";
import { Service, Location } from "@/lib/types/strapi";
import { getStrapiData } from "@/lib/strapi";
import { Locale, t } from "@/utils/i18n";
import { ContentWrapper } from "../ContentWrapper";
import { Button } from "@/components/Button";
import { submitOrder } from "@/lib/strapi-order";
import { Title } from "../Title";

interface OrderFormProps {
  locale: Locale;
}

export function OrderForm({ locale }: OrderFormProps) {
  const router = useRouter();
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripePaymentCompleted, setStripePaymentCompleted] = useState(false);

  // Load services and locations
  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, locationsData] = await Promise.all([
          getStrapiData<Service>("services", locale, { populate: "image" }),
          getStrapiData<Location>("locations", locale),
        ]);

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

  const handleStripePaymentSuccess = (paymentIntentId: string) => {
    console.log('Stripe payment successful:', paymentIntentId);
    setStripePaymentCompleted(true);
    updateFormData({ stripePaymentIntentId: paymentIntentId });
    // Automaticky odešle objednávku po úspěšné platbě
    handleSubmit(true);
  };

  const handleStripePaymentError = (errorMessage: string) => {
    console.error('Stripe payment error:', errorMessage);
    setError(errorMessage);
  };

  const handleSubmit = async (isStripePayment: boolean = false) => {
    // Kontrola jestli je to Stripe platba a jestli už nebyla dokončena
    if (formData.paymentMethod === 'card' && !isStripePayment && !stripePaymentCompleted) {
      setError(
        locale === 'cs'
          ? 'Nejdříve prosím dokončte platbu kartou.'
          : locale === 'ru'
          ? 'Сначала завершите оплату картой.'
          : 'Please complete the card payment first.'
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await submitOrder(formData);
      setSuccess(true);

      setTimeout(() => {
        clearForm();
        router.push(`/${locale}`);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit order:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : t(locale, "orderForm.orderError");

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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Services
            formData={formData}
            updateFormData={updateFormData}
            services={services}
            locale={locale}
          />
        );
      case 2:
        return (
          <Step2LocationTime
            formData={formData}
            updateFormData={updateFormData}
            locations={locations}
            locale={locale}
          />
        );
      case 3:
        return (
          <Step3CustomerInfo
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
          />
        );
      case 4:
        return (
          <Step4Payment
            formData={formData}
            updateFormData={updateFormData}
            locale={locale}
            onStripePaymentSuccess={handleStripePaymentSuccess}
            onStripePaymentError={handleStripePaymentError}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const getNavigationButtons = () => {
    if (success) {
      return null;
    }

    const isStep1Valid = true; // Step 1 je vždy validní
    const isStep2Valid = Boolean(
      formData.location && formData.date && formData.timeSlot
    );
    const isStep3Valid = Boolean(
      formData.name && formData.email && formData.phone && formData.address
    );
    const isStep4Valid = Boolean(formData.paymentMethod);

    let isCurrentStepValid = false;
    switch (currentStep) {
      case 1:
        isCurrentStepValid = isStep1Valid;
        break;
      case 2:
        isCurrentStepValid = isStep2Valid;
        break;
      case 3:
        isCurrentStepValid = isStep3Valid;
        break;
      case 4:
        isCurrentStepValid = isStep4Valid;
        break;
    }

    return (
      <div className="flex flex-col gap-4">
        {currentStep < 4 ? (
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={nextStep}
            disabled={!isCurrentStepValid}
            className={`px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ${
              currentStep === 1 ? "ml-auto" : ""
            }`}
          >
            {t(locale, "orderForm.next")}
          </Button>
        ) : (
          // Pro step 4 zobrazujeme tlačítko jen pro bankovní převod
          formData.paymentMethod === 'bankTransfer' && (
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => handleSubmit()}
              disabled={isLoading || !isCurrentStepValid}
              className="px-8 w-full bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg ml-auto"
            >
              {isLoading
                ? t(locale, "orderForm.submitting")
                : t(locale, "orderForm.submit")}
            </Button>
          )
        )}
        {currentStep > 1 && (
          <Button
            type="button"
            variant="blank"
            size="sm"
            onClick={prevStep}
            disabled={isLoading}
            className="px-8 !text-base !rounded-lg"
          >
            {t(locale, "orderForm.back")}
          </Button>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <ContentWrapper>
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
            {formData.paymentMethod === 'card' 
              ? (locale === "cs"
                  ? "Platba proběhla úspěšně!"
                  : locale === "ru"
                  ? "Оплата прошла успешно!"
                  : "Payment successful!")
              : t(locale, "orderForm.orderSuccess")
            }
          </h2>
          <p className="text-gray-600 mb-4">
            {formData.paymentMethod === 'card' 
              ? (locale === "cs"
                  ? "Vaše objednávka byla automaticky potvrzena a brzy se vám ozveme."
                  : locale === "ru"
                  ? "Ваш заказ был автоматически подтвержден, и мы скоро свяжемся с вами."
                  : "Your order has been automatically confirmed and we will contact you soon.")
              : (locale === "cs"
                  ? "Brzy se vám ozveme s dalšími informacemi."
                  : locale === "ru"
                  ? "Скоро мы свяжемся с вами для получения дополнительной информации."
                  : "We will contact you soon with further information.")
            }
          </p>
          <p className="text-sm text-gray-500">
            {locale === "cs"
              ? "Za chvíli budete přesměrováni na hlavní stránku..."
              : locale === "ru"
              ? "Вы будете перенаправлены на главную страницу через мгновение..."
              : "You will be redirected to the homepage in a moment..."}
          </p>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper className="!px-0">
      <div className="mb-8 mt-4">
        <div className="max-w-[800px] bg-white mx-auto rounded-sm overflow-hidden hidden lg:block">
          <div className="flex items-center ">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center w-full">
                <div
                  className={`flex items-center p-3 w-full font-semibold ${
                    step === currentStep
                      ? "bg-[#FFA000] text-white rounded-sm overflow-hidden"
                      : "text-gray-800"
                  }`}
                >
                  <span className="mx-auto text-center">
                    {t(locale, `orderForm.step${step}Title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="flex items-center justify-center p-3 bg-white text-gray-800 ring-1 ring-gray-200 font-semibold rounded-sm">
            {t(locale, "orderForm.stepStep")} {currentStep}{" "}
            {t(locale, "orderForm.stepOf")} 4 -{" "}
            {t(locale, `orderForm.step${currentStep}Title`)}
          </div>
        </div>
      </div>

      <Title as="h3" className="text-center text-gray-800 mb-8" locale={locale}>
        {currentStep === 1 && <span>{t(locale, "orderForm.step1")}</span>}
        {currentStep === 2 && <span>{t(locale, "orderForm.step2")}</span>}
        {currentStep === 3 && <span>{t(locale, "orderForm.step3")}</span>}
        {currentStep === 4 && <span>{t(locale, "orderForm.step4")}</span>}
      </Title>
      <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">{renderStep()}</div>

        <div className="space-y-6 bg-white rounded-xl p-6 w-full lg:max-w-90 xl:w-90 shadow-[0px_4px_40px_0px_rgba(70,70,86,0.1)]">
          <div className="text-sm text-[#372900] space-y-1">
            <div>
              <div className="py-1 px-2 font-semibold rounded-lg bg-[#FFF5D7] text-[#BC7700] inline-flex mb-2 mr-2">
                <span>{formData.property === "flat" ? "🏬" : "🏡"}&nbsp;</span>
                <span>
                  {formData.property === "flat"
                    ? locale === "cs"
                      ? "Byt"
                      : locale === "ru"
                      ? "Квартира"
                      : "Flat"
                    : locale === "cs"
                    ? "Dům"
                    : locale === "ru"
                    ? "Дом"
                    : "House"}
                </span>
              </div>
              {formData.eco && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-green-100 text-green-600 inline-flex mb-2">
                  <span>♻️&nbsp;</span>
                  <span>
                    {locale === "cs"
                      ? "Ekologicky"
                      : locale === "ru"
                      ? "Экологически чистые"
                      : "Eco-friendly"}
                  </span>
                </div>
              )}
              {formData.frequency && formData.frequency !== "one-time" && (
                <div className="py-1 px-2 font-semibold rounded-lg bg-blue-100 text-blue-600 inline-flex mb-2">
                  <span>🔄&nbsp;</span>
                  <span>
                    {formData.frequency === "weekly" 
                      ? (locale === "cs" ? "Týdně" : locale === "ru" ? "Еженедельно" : "Weekly")
                      : formData.frequency === "bi-weekly"
                      ? (locale === "cs" ? "Každé 2 týdny" : locale === "ru" ? "Каждые 2 недели" : "Every 2 weeks")
                      : formData.frequency === "monthly"
                      ? (locale === "cs" ? "Měsíčně" : locale === "ru" ? "Ежемесячно" : "Monthly")
                      : formData.frequency
                    }
                  </span>
                </div>
              )}
            </div>
            <Title as="h4" locale={locale}>
              {t(locale, "orderForm.rooms")}: {formData.rooms},{" "}
              {t(locale, "orderForm.bathrooms")}: {formData.bathrooms}
            </Title>
            
            {formData.additionalServices.length > 0 && (
              <div className="mt-3 space-y-2">
                <hr className="border-gray-300" />
                <h4 className="font-bold text-base text-gray-800">
                  {t(locale, "orderForm.additionalServicesTitle")}:
                </h4>
                {formData.additionalServices.map((item) => (
                  <div key={item.service.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700">
                      {item.quantity > 1 && (
                        <span>{item.quantity} × </span>
                      )}
                      <span>{item.service.title}</span>
                    </span>
                    <span className="text-gray-700">
                      {(item.service.price || 0) * item.quantity} EUR
                    </span>
                  </div>
                ))}
                <hr className="border-gray-300" />
              </div>
            )}
          </div>

          {/* Price section with discount display */}
          <div className="space-y-3">
            {formData.frequency && formData.frequency !== "one-time" && formData.discountPercentage && formData.discountPercentage > 0 && (
              <>
                {/* Original price */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    {locale === "cs" ? "Původní cena:" : locale === "ru" ? "Исходная цена:" : "Original price:"}
                  </span>
                  <span className="line-through">{formData.originalPrice} EUR</span>
                </div>
                
                {/* Frequency badge */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    {locale === "cs" ? "Frekvence:" : locale === "ru" ? "Частота:" : "Frequency:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">
                      {formData.frequency === "weekly" 
                        ? (locale === "cs" ? "Týdně" : locale === "ru" ? "Еженедельно" : "Weekly")
                        : formData.frequency === "bi-weekly"
                        ? (locale === "cs" ? "Každé 2 týdny" : locale === "ru" ? "Каждые 2 недели" : "Every 2 weeks")
                        : formData.frequency === "monthly"
                        ? (locale === "cs" ? "Měsíčně" : locale === "ru" ? "Ежемесячно" : "Monthly")
                        : formData.frequency
                      }
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                      -{formData.discountPercentage}%
                    </span>
                  </div>
                </div>
                
                {/* Discount amount */}
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>
                    {locale === "cs" ? "Sleva:" : locale === "ru" ? "Скидка:" : "Discount:"}
                  </span>
                  <span>-{Math.round(((formData.originalPrice || 0) * (formData.discountPercentage || 0)) / 100)} EUR</span>
                </div>
                
                <hr className="border-gray-300" />
              </>
            )}
            
            {/* Final price */}
            <div className="flex justify-between items-center rounded-lg bg-[#FFF5D7] p-3 gap-2">
              <Title
                as="h4"
                className="text-xl font-bold text-[#372900]"
                locale={locale}
              >
                {locale === "cs" ? "Celková cena:" : locale === "ru" ? "Итоговая цена:" : "Total price:"}
              </Title>
              <Title
                as="h4"
                className="text-2xl font-bold text-[#372900]"
                locale={locale}
              >
                {formData.totalPrice} EUR
              </Title>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {getNavigationButtons()}
        </div>
      </div>
    </ContentWrapper>
  );
}

export default OrderForm;