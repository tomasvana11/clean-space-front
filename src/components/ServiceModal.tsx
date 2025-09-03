/*
"use client";

import React, { useEffect } from "react";
import { StrapiImage } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "./Title";

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image?: StrapiImage;
  points: { id: number; text: string }[];
  price: number;
  locale: Locale;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  title,
  image,
  points,
  price,
  locale,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // cleanup pro jistotu
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-[#FFF5D7] flex flex-col md:flex-row gap-6 items-center rounded-xl max-w-[700px] w-full p-6 relative mt-20 max-h-[80vh]">
        <button
          onClick={onClose}
          className="flex flex-row gap-2 items-center absolute -top-16 right-0 text-white text-base cursor-pointer bg-[#372900] hover:bg-[#281E00] transition-colors duration-200 pl-4 pr-5 py-4 rounded-xl font-semibold"
        >
          <img src="/icons/x-close.svg" className="w-6 h-6" />
          <span>{t(locale, "general.closeTitle")}</span>
        </button>

        {image && (
          <div className="flex-shrink-0">
            <img
              src={
                image.url.startsWith("http")
                  ? image.url
                  : `${
                      process.env.NEXT_PUBLIC_STRAPI_URL ||
                      "http://localhost:1337"
                    }${image.url}`
              }
              alt={image.alternativeText || title}
              className="w-32 md:w-48 h-32 md:h-48 mx-auto transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 w-full flex-shrink-1">
          <Title
            as="h4"
            className="!text-[24px] md:!text-[28px] font-semibold text-[#372900]"
            locale={locale}
          >
            {title}
          </Title>

          <div className="rounded-lg bg-white px-4 py-2">
            <Title
              as="h4"
              className="text-[#DB8A00] pb-2 underline"
              locale={locale}
            >
              {t(locale, "services.serviceModalInclude")}
            </Title>
            {points.length > 0 ? (
              <div className="flex flex-col gap-2 text-gray-700 pb-1">
                {points.map((point) => (
                  <div key={point.id} className="flex items-center gap-2">
                    <img src="/icons/check.svg" className="w-6 h-6" />
                    <span>{point.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">-</p>
            )}
          </div>

          <div className="font-semibold text-white rounded-lg px-3 py-2 text-lg bg-[#FFA000]">
            <Title as="h4" locale={locale}>
              {price ? `${price} EUR` : "Contact us"}
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
};
*/

"use client";
import React, { useEffect } from "react";
import { StrapiImage } from "@/lib/types/strapi";
import { Locale, t } from "@/utils/i18n";
import { Title } from "./Title";

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  image?: StrapiImage;
  points: { id: number; text: string }[];
  price: number;
  locale: Locale;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  title,
  image,
  points,
  price,
  locale,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // cleanup pro jistotu
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-w-[700px] w-full">
        <button
          onClick={onClose}
          className="flex flex-row gap-2 items-center absolute top-4 right-0 text-white text-base cursor-pointer bg-[#372900] hover:bg-[#281E00] transition-colors duration-200 pl-4 pr-5 py-4 rounded-xl font-semibold z-10"
        >
          <img src="/icons/x-close.svg" className="w-6 h-6" />
          <span>{t(locale, "general.closeTitle")}</span>
        </button>

        <div className="bg-[#FFF5D7] flex flex-col md:flex-row gap-6 items-center rounded-xl w-full p-6 max-h-[60vh] mt-20 overflow-y-auto">
          {image && (
            <div className="flex-shrink-0">
              <img
                src={
                  image.url.startsWith("http")
                    ? image.url
                    : `${
                        process.env.NEXT_PUBLIC_STRAPI_URL ||
                        "http://localhost:1337"
                      }${image.url}`
                }
                alt={image.alternativeText || title}
                className="w-32 md:w-48 h-32 md:h-48 mx-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex flex-col gap-4 w-full flex-shrink-1">
            <Title
              as="h4"
              className="!text-[24px] md:!text-[28px] font-semibold text-[#372900]"
              locale={locale}
            >
              {title}
            </Title>

            <div className="rounded-lg bg-white px-4 py-2">
              <Title
                as="h4"
                className="text-[#DB8A00] pb-2 underline"
                locale={locale}
              >
                {t(locale, "services.serviceModalInclude")}
              </Title>

              {points.length > 0 ? (
                <div className="flex flex-col gap-2 text-gray-700 pb-1">
                  {points.map((point) => (
                    <div key={point.id} className="flex items-center gap-2">
                      <img src="/icons/check.svg" className="w-6 h-6" />
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-4">-</p>
              )}
            </div>

            <div className="font-semibold text-white rounded-lg px-3 py-2 text-lg bg-[#FFA000]">
              <Title as="h4" locale={locale}>
                {price ? `${price} EUR` : "Contact us"}
              </Title>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
