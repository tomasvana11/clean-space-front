"use client";

import React, { useState } from "react";
import { Service } from "@/lib/types/strapi";
import { Locale } from "@/utils/i18n";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { renderStrapiContent } from "@/utils/content"; // Import utility funkce

interface ServicesGridProps {
  services: Service[];
  locale: Locale;
}

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

// Helper function pro renderování strukturovaného obsahu - zjednodušená verze
function renderRichTextSimple(content: Array<any>) {
  return content.map((block, index) => {
    console.log("Block:", block); // Debug

    switch (block.type) {
      case "paragraph":
        return (
          <p key={index} className="mb-3">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );

      case "heading":
        return (
          <h4 key={index} className="font-semibold text-[#372900] mb-2 mt-4">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </h4>
        );

      case "list-item":
        return (
          <div key={index} className="flex items-start mb-2">
            <span className="mr-2 text-[#372900]">•</span>
            <div>
              {block.children?.map((child: any, childIndex: number) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </div>
          </div>
        );

      case "list":
        return (
          <ul key={index} className="list-disc list-inside mb-3 space-y-1 ml-4">
            {block.children?.map((child: any, childIndex: number) => (
              <li key={childIndex}>{child.text}</li>
            ))}
          </ul>
        );

      default:
        return (
          <div key={index} className="mb-2">
            {block.children?.map((child: any, childIndex: number) => (
              <span key={childIndex}>{child.text || ""}</span>
            ))}
          </div>
        );
    }
  });
}

interface ServicesGridProps {
  services: Service[];
  locale: Locale;
}

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

function ServiceModal({ service, isOpen, onClose, locale }: ServiceModalProps) {
  if (!isOpen) return null;

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header with Image */}
        {service.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
            <img
              src={
                service.image.url.startsWith("http")
                  ? service.image.url
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${service.image.url}`
              }
              alt={service.image.alternativeText || service.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <Title
              as="h2"
              className="text-[#372900] flex-1 pr-4"
              locale={locale}
            >
              {service.title}
            </Title>
            {service.price && (
              <div className="text-right flex-shrink-0">
                <span className="text-2xl font-bold text-[#372900] bg-[#FFD149] rounded-lg px-4 py-2">
                  {service.price} EUR
                </span>
              </div>
            )}
          </div>

          {/* Rich text content */}
          {service.whats_included && service.whats_included.length > 0 && (
            <div className="prose prose-sm max-w-none">
              <Title
                as="h3"
                className="text-[#372900] mb-4 !text-lg"
                locale={locale}
              >
                {locale === "cs"
                  ? "Co je součástí služby:"
                  : locale === "ru"
                  ? "Что входит в услугу:"
                  : "What's included:"}
              </Title>
              <div className="text-gray-700 leading-relaxed">
                {service.whats_included.map((block, index) => (
                  <div key={index}>
                    {block.children.map((child, childIndex) => (
                      <p key={childIndex} className="mb-2">
                        {child.text}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact message for services without price */}
          {!service.price && (
            <div className="mt-6 p-4 bg-[#FFF5D7] rounded-lg border border-[#FFD149]">
              <p className="text-[#372900] text-center font-medium">
                {locale === "cs"
                  ? "Kontaktujte nás pro cenovou nabídku"
                  : locale === "ru"
                  ? "Свяжитесь с нами для получения цены"
                  : "Contact us for pricing"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ServicesGrid({ services, locale }: ServicesGridProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {locale === "cs"
            ? "Žádné služby nejsou k dispozici"
            : locale === "ru"
            ? "Услуги недоступны"
            : "No services available"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#FFA000] transition-all duration-300 hover:shadow-lg group"
          >
            {service.image && (
              <div className="relative mx-auto h-32 w-32 mb-4 overflow-hidden rounded-lg">
                <img
                  src={
                    service.image.url.startsWith("http")
                      ? service.image.url
                      : `${
                          process.env.NEXT_PUBLIC_STRAPI_URL ||
                          "http://localhost:1337"
                        }${service.image.url}`
                  }
                  alt={service.image.alternativeText || service.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <Title
              as="h4"
              className="text-center text-[#372900] mb-3"
              locale={locale}
            >
              {service.title}
            </Title>

            {service.price && (
              <div className="text-center mb-4">
                <span className="text-[#372900] font-semibold bg-[#FFD149] rounded-md px-3 py-2">
                  {service.price} EUR
                </span>
              </div>
            )}

            {!service.price && (
              <div className="text-center mb-4">
                <span className="text-gray-600 text-sm italic">
                  {locale === "cs"
                    ? "Cena na dotaz"
                    : locale === "ru"
                    ? "Цена по запросу"
                    : "Price on request"}
                </span>
              </div>
            )}

            <div className="text-center">
              <Button
                as="button"
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setSelectedService(service)}
                className="bg-[#FFA000] hover:bg-[#FF8F00] text-white border-none"
              >
                {locale === "cs"
                  ? "Detail"
                  : locale === "ru"
                  ? "Подробнее"
                  : "Details"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          locale={locale}
        />
      )}
    </>
  );
}
