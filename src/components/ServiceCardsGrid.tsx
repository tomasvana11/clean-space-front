"use client";

import React from "react";
import { Service } from "@/lib/types/strapi";
import { Locale } from "@/utils/i18n";
import { ServiceCard } from "./ServiceCard";

interface ServiceCardsGridProps {
  services: Service[];
  locale: Locale;
}

export const ServiceCardsGrid: React.FC<ServiceCardsGridProps> = ({
  services,
  locale,
}) => {
  if (!services.length) {
    return <p className="text-gray-600">No services available.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} locale={locale} />
      ))}
    </div>
  );
};
