"use client";

import React, { useState } from "react";
import { Service } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { ServiceModal } from "./ServiceModal";
import { Button } from "./Button";
import { Title } from "./Title";

interface ServiceCardProps {
  service: Service;
  locale: Locale;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  locale,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/*
      <div className="p-4 rounded-lg bg-[#FFF5D7] group">
        {service.image && (
          <div className="relative mx-auto w-32 md:w-44 h-32 md:h-44 overflow-hidden transition-transform duration-300 group-hover:scale-105">
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
        <Title
          as="h4"
          className="font-semibold text-center text-[#372900] py-4"
          locale={locale}
        >
          {service.title}
        </Title>
        <Button
          variant="primary"
          size="mdl"
          className="w-full text-white"
          onClick={() => setOpen(true)}
        >
          Detail
        </Button>
      </div>*/}

      <div className="p-4 rounded-lg bg-[#FFF5D7] group flex flex-col">
        {service.image && (
          <div className="relative mx-auto w-32 md:w-44 h-32 md:h-44 overflow-hidden transition-transform duration-300 group-hover:scale-105">
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

        <Title
          as="h4"
          className="font-semibold text-center text-[#372900] py-4"
          locale={locale}
        >
          {service.title}
        </Title>

        {/* tlačítko posuneme dolů */}
        <div className="mt-auto">
          <Button
            variant="primary"
            size="mdl"
            className="w-full text-white"
            onClick={() => setOpen(true)}
          >
            {t(locale, "general.detailTitle")}
          </Button>
        </div>
      </div>

      <ServiceModal
        open={open}
        onClose={() => setOpen(false)}
        title={service.title}
        image={service.image}
        points={service.includes?.point || []}
        price={service.price}
        locale={locale}
      />
    </>
  );
};
