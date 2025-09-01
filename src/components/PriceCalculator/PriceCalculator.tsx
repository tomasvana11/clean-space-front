"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Locale, t } from "@/utils/i18n";
import { Title } from "../Title";
import { Button } from "@/components/Button";

interface PricingCalculatorProps {
  locale: Locale;
  buttonIcon?: string; // Optional path to icon in public/images/icons/
}

export function PricingCalculator({
  locale,
  buttonIcon,
}: PricingCalculatorProps) {
  const router = useRouter();
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(150);

  // Czech declension for rooms
  const getRoomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "pokoj";
      if (count >= 2 && count <= 4) return "pokoje";
      return "pokojů";
    }
    if (locale === "ru") {
      if (count === 1) return "комната";
      if (count >= 2 && count <= 4) return "комнаты";
      return "комнат";
    }
    // English
    return count === 1 ? "room" : "rooms";
  };

  // Czech declension for bathrooms
  const getBathroomText = (count: number) => {
    if (locale === "cs") {
      if (count === 1) return "koupelna";
      if (count >= 2 && count <= 4) return "koupelny";
      return "koupelen";
    }
    if (locale === "ru") {
      if (count === 1) return "ванная";
      if (count >= 2 && count <= 4) return "ванные";
      return "ванных";
    }
    // English
    return count === 1 ? "bathroom" : "bathrooms";
  };

  // Calculate price based on rooms (same logic as useOrderForm)
  useEffect(() => {
    let price;
    if (rooms <= 2) {
      price = 150; // 1-2 pokoje: base price 150 EUR
    } else {
      price = 160; // 3+ pokoje: base price 160 EUR
    }
    setTotalPrice(price);
  }, [rooms]);

  const handleRoomsChange = (change: number) => {
    const newRooms = Math.max(1, rooms + change);
    setRooms(newRooms);
  };

  const handleBathroomsChange = (change: number) => {
    const newBathrooms = Math.max(1, bathrooms + change);
    setBathrooms(newBathrooms);
  };

  const handleCalculatePrice = () => {
    // Save values to localStorage to prefill order form
    const prefilledData = {
      rooms,
      bathrooms,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(
      "price_calculator_prefill",
      JSON.stringify(prefilledData)
    );

    // Redirect to order page
    router.push(`/${locale}/order`);
  };

  return (
    <div className="px-4">
      <div className="bg-white rounded-xl md:rounded-sm p-2 flex md:inline-flex mx-auto shadow-lg">
        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-2 md:gap-6">
          {/* Rooms Section */}

          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => handleRoomsChange(-1)}
              disabled={rooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <div className="text-center min-w-[80px] sm:min-w-[100px]">
              <span className="text-base sm:text-lg font-semibold text-gray-700">
                {rooms} {getRoomText(rooms)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleRoomsChange(1)}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>

          {/* Vertical/Horizontal Divider */}
          <div className="w-full h-px md:h-6 md:w-px bg-gray-300 md:bg-gray-400"></div>

          {/* Bathrooms Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleBathroomsChange(-1)}
              disabled={bathrooms <= 1}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              −
            </button>
            <div className="text-center min-w-[80px] sm:min-w-[100px]">
              <span className="text-base sm:text-lg font-semibold text-gray-700">
                {bathrooms} {getBathroomText(bathrooms)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleBathroomsChange(1)}
              className="w-8 h-12 pb-1 rounded-xs cursor-pointer bg-[#FFF5D7] hover:bg-[#FFECB5] text-white flex items-center justify-center text-lg !text-[#372900] font-semibold"
            >
              +
            </button>
          </div>

          {/* Calculate Price Button */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={handleCalculatePrice}
            className="bg-gradient-to-r from-[#FFA001] to-[#FFBF01] text-white font-semibold !rounded-lg md:!rounded-xs px-5 sm:pl-8 sm-pr-7 py-5 flex items-center gap-3 w-full md:w-auto"
          >
            <span className="text-base">
              {locale === "cs"
                ? "Spočítat cenu"
                : locale === "ru"
                ? "Рассчитать цену"
                : "Calculate Price"}
            </span>
            {buttonIcon ? (
              <img src={`/icons/${buttonIcon}`} alt="" className="w-6 h-6" />
            ) : (
              <span className="text-lg sm:text-xl">≫</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
