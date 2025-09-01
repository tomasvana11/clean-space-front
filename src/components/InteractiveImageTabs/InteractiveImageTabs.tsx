/*

"use client";

import { useState } from "react";
import Image from "next/image";
import { Title } from "../Title";
import { Locale, t } from "@/utils/i18n";
import {
  InteractiveImageTabsProps,
  TabData,
  Tooltip,
} from "./InteractiveImageTabs.types";

// Data přímo v komponentě
const TABS_DATA: TabData[] = [
  {
    id: "pokoje",
    titleKey: "cleaningTabs.room.title",
    imagePath: "/images/tabs/bedroom.png",
    tooltips: [
      { id: "bed", textKey: "cleaningTabs.room.floor", x: 70, y: 95 },
      { id: "desk", textKey: "cleaningTabs.room.flat", x: 10, y: 50 },
      { id: "floor-room", textKey: "cleaningTabs.room.handle", x: 95, y: 66 },
      { id: "windows", textKey: "cleaningTabs.room.pillow", x: 60, y: 50 },
    ],
  },
  {
    id: "kuchyne",
    titleKey: "cleaningTabs.kitchen.title",
    imagePath: "/images/tabs/kitchen.png",
    tooltips: [
      {
        id: "workspace",
        textKey: "cleaningTabs.kitchen.workspace",
        x: 85,
        y: 80,
      },
      {
        id: "drawer",
        textKey: "cleaningTabs.kitchen.drawer",
        x: 15,
        y: 25,
      },
      {
        id: "bin",
        textKey: "cleaningTabs.kitchen.bin",
        x: 10,
        y: 85,
      },
      {
        id: "floor",
        textKey: "cleaningTabs.kitchen.floor",
        x: 45,
        y: 95,
      },
      {
        id: "things",
        textKey: "cleaningTabs.kitchen.things",
        x: 85,
        y: 50,
      },
    ],
  },
  {
    id: "koupelny",
    titleKey: "cleaningTabs.bathroom.title",
    imagePath: "/images/tabs/bathroom.png",
    tooltips: [
      { id: "shower", textKey: "cleaningTabs.bathroom.shower", x: 20, y: 30 },
      { id: "sink", textKey: "cleaningTabs.bathroom.toilet", x: 45, y: 85 },
      { id: "paper", textKey: "cleaningTabs.bathroom.paper", x: 10, y: 55 },
      { id: "toilet", textKey: "cleaningTabs.bathroom.floor", x: 5, y: 95 },
      { id: "mirrot", textKey: "cleaningTabs.bathroom.mirror", x: 85, y: 5 },
      { id: "things", textKey: "cleaningTabs.bathroom.things", x: 95, y: 90 },
    ],
  },
  {
    id: "chodby",
    titleKey: "cleaningTabs.hallway.title",
    imagePath: "/images/tabs/hallway.png",
    tooltips: [
      { id: "floor", textKey: "cleaningTabs.hallway.floor", x: 50, y: 95 },
      { id: "walls", textKey: "cleaningTabs.hallway.clothes", x: 40, y: 30 },
      { id: "flat", textKey: "cleaningTabs.hallway.flat", x: 50, y: 65 },
      { id: "doors", textKey: "cleaningTabs.hallway.doors", x: 87, y: 50 },
    ],
  },
];

const FallbackMargin = 5; // minimální odstup od okraje v %

const getTooltipClasses = (tooltip: Tooltip) => {
  const isNearRightEdge = tooltip.x > 75;
  const isNearLeftEdge = tooltip.x < 25;
  const isNearTopEdge = tooltip.y < 25;
  const isNearBottomEdge = tooltip.y > 75;

  let transformClasses = "";

  // Horizontální posun
  if (isNearRightEdge) {
    transformClasses += "-translate-x-full ";
  } else if (isNearLeftEdge) {
    transformClasses += "translate-x-0 ";
  } else {
    transformClasses += "-translate-x-1/2 ";
  }

  // Vertikální posun
  if (isNearTopEdge) {
    transformClasses += "translate-y-0 ";
  } else if (isNearBottomEdge) {
    transformClasses += "-translate-y-full ";
  } else {
    transformClasses += "-translate-y-1/2 ";
  }

  return {
    transformClasses: transformClasses.trim(),
  };
};

const InteractiveImageTabs: React.FC<InteractiveImageTabsProps> = ({
  locale,
  className = "",
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    TABS_DATA[0]?.id || ""
  );

  const activeTab = TABS_DATA.find((tab) => tab.id === activeTabId);

  const renderTooltip = (tooltip: Tooltip) => {
    const { transformClasses } = getTooltipClasses(tooltip);

    // fallback – udržíme hodnoty v rozmezí 5–95 %
    const safeX = Math.max(
      FallbackMargin,
      Math.min(100 - FallbackMargin, tooltip.x)
    );
    const safeY = Math.max(
      FallbackMargin,
      Math.min(100 - FallbackMargin, tooltip.y)
    );

    return (
      <div
        key={tooltip.id}
        className={`absolute z-10 ${transformClasses} hidden lg:block`}
        style={{ left: `${safeX}%`, top: `${safeY}%` }}
      >
        <div className="relative px-2 sm:px-3 py-2 bg-white text-gray-700 text-xs sm:text-sm font-medium rounded-sm shadow-lg border border-gray-300 flex items-center w-[200px] sm:w-[220px]">
          <div className="w-3 h-3 bg-[#FFA000] rounded-full mr-3 sm:mr-3 flex-shrink-0"></div>
          <span className="leading-tight break-words text-left flex-1">
            {t(locale, tooltip.textKey)}
          </span>
        </div>
      </div>
    );
  };

  const renderMobileTooltipsList = (tooltips: Tooltip[]) => {
    return (
      <div className="absolute top-2 right-2 bottom-2 w-[40%] max-w-[40%] bg-white rounded-sm shadow-lg border border-gray-300 p-3 lg:hidden overflow-y-auto">
        <div className="space-y-3">
          {tooltips.map((tooltip) => (
            <div key={tooltip.id} className="flex items-start">
              <div className="w-2 h-2 bg-[#FFA000] rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span className="text-xs text-gray-700 leading-tight break-words">
                {t(locale, tooltip.textKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <Title as="h3" locale={locale} className="text-center mb-4">
        {t(locale, "cleaningTabs.title")}
      </Title>
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-sm p-2 mb-6 w-full sm:w-auto sm:inline-flex">
          <div className="grid grid-cols-2 gap-1 sm:flex sm:gap-2">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 sm:px-4 py-5 font-semibold rounded-xs transition-all duration-200 text-center hover:cursor-pointer ${
                  activeTabId === tab.id
                    ? "bg-[#FFA000] text-white"
                    : "text-gray-700 hover:bg-gray-100 "
                }`}
              >
                {t(locale, tab.titleKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab && (
        <div
          className="relative w-full bg-gray-50 rounded-lg overflow-hidden"
          style={{ aspectRatio: "10/6" }}
        >
          <Image
            src={activeTab.imagePath}
            alt={t(locale, activeTab.titleKey)}
            fill
            className="object-cover"
            priority
          />

          {activeTab.tooltips.map(renderTooltip)}

          {renderMobileTooltipsList(activeTab.tooltips)}
        </div>
      )}
    </div>
  );
};

export default InteractiveImageTabs;
*/

"use client";

import { useState } from "react";
import Image from "next/image";
import { Title } from "../Title";
import { Locale, t } from "@/utils/i18n";
import {
  InteractiveImageTabsProps,
  TabData,
  Tooltip,
} from "./InteractiveImageTabs.types";

// Data přímo v komponentě
const TABS_DATA: TabData[] = [
  {
    id: "pokoje",
    titleKey: "cleaningTabs.room.title",
    imagePath: "/images/tabs/bedroom.png",
    tooltips: [
      { id: "bed", textKey: "cleaningTabs.room.floor", x: 70, y: 95 },
      { id: "desk", textKey: "cleaningTabs.room.flat", x: 10, y: 50 },
      { id: "floor-room", textKey: "cleaningTabs.room.handle", x: 95, y: 66 },
      { id: "windows", textKey: "cleaningTabs.room.pillow", x: 60, y: 50 },
    ],
  },
  {
    id: "kuchyne",
    titleKey: "cleaningTabs.kitchen.title",
    imagePath: "/images/tabs/kitchen.png",
    tooltips: [
      {
        id: "workspace",
        textKey: "cleaningTabs.kitchen.workspace",
        x: 85,
        y: 80,
      },
      { id: "drawer", textKey: "cleaningTabs.kitchen.drawer", x: 15, y: 25 },
      { id: "bin", textKey: "cleaningTabs.kitchen.bin", x: 10, y: 85 },
      { id: "floor", textKey: "cleaningTabs.kitchen.floor", x: 45, y: 95 },
      { id: "things", textKey: "cleaningTabs.kitchen.things", x: 85, y: 50 },
    ],
  },
  {
    id: "koupelny",
    titleKey: "cleaningTabs.bathroom.title",
    imagePath: "/images/tabs/bathroom.png",
    tooltips: [
      { id: "shower", textKey: "cleaningTabs.bathroom.shower", x: 20, y: 30 },
      { id: "sink", textKey: "cleaningTabs.bathroom.toilet", x: 45, y: 85 },
      { id: "paper", textKey: "cleaningTabs.bathroom.paper", x: 10, y: 55 },
      { id: "toilet", textKey: "cleaningTabs.bathroom.floor", x: 5, y: 95 },
      { id: "mirrot", textKey: "cleaningTabs.bathroom.mirror", x: 85, y: 5 },
      { id: "things", textKey: "cleaningTabs.bathroom.things", x: 95, y: 90 },
    ],
  },
  {
    id: "chodby",
    titleKey: "cleaningTabs.hallway.title",
    imagePath: "/images/tabs/hallway.png",
    tooltips: [
      { id: "floor", textKey: "cleaningTabs.hallway.floor", x: 50, y: 95 },
      { id: "walls", textKey: "cleaningTabs.hallway.clothes", x: 40, y: 30 },
      { id: "flat", textKey: "cleaningTabs.hallway.flat", x: 50, y: 65 },
      { id: "doors", textKey: "cleaningTabs.hallway.doors", x: 87, y: 50 },
    ],
  },
];

const FallbackMargin = 5; // minimální odstup od okraje v %

const getTooltipClasses = (tooltip: Tooltip) => {
  const isNearRightEdge = tooltip.x > 75;
  const isNearLeftEdge = tooltip.x < 25;
  const isNearTopEdge = tooltip.y < 25;
  const isNearBottomEdge = tooltip.y > 75;

  let transformClasses = "";

  // Horizontální posun
  if (isNearRightEdge) {
    transformClasses += "-translate-x-full ";
  } else if (isNearLeftEdge) {
    transformClasses += "translate-x-0 ";
  } else {
    transformClasses += "-translate-x-1/2 ";
  }

  // Vertikální posun
  if (isNearTopEdge) {
    transformClasses += "translate-y-0 ";
  } else if (isNearBottomEdge) {
    transformClasses += "-translate-y-full ";
  } else {
    transformClasses += "-translate-y-1/2 ";
  }

  return {
    transformClasses: transformClasses.trim(),
  };
};

const InteractiveImageTabs: React.FC<InteractiveImageTabsProps> = ({
  locale,
  className = "",
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(
    TABS_DATA[0]?.id || ""
  );
  const activeTab = TABS_DATA.find((tab) => tab.id === activeTabId);

  const renderTooltip = (tooltip: Tooltip) => {
    const { transformClasses } = getTooltipClasses(tooltip);

    // fallback – udržíme hodnoty v rozmezí 5–95 %
    const safeX = Math.max(
      FallbackMargin,
      Math.min(100 - FallbackMargin, tooltip.x)
    );
    const safeY = Math.max(
      FallbackMargin,
      Math.min(100 - FallbackMargin, tooltip.y)
    );

    return (
      <div
        key={tooltip.id}
        className={`absolute z-10 ${transformClasses} hidden lg:block`}
        style={{ left: `${safeX}%`, top: `${safeY}%` }}
      >
        <div className="relative px-2 sm:px-3 py-2 bg-white text-gray-700 text-xs sm:text-sm font-medium rounded-sm shadow-lg border border-gray-300 flex items-center w-[200px] sm:w-[220px]">
          <div className="w-3 h-3 bg-[#FFA000] rounded-full mr-3 sm:mr-3 flex-shrink-0"></div>
          <span className="leading-tight break-words text-left flex-1">
            {t(locale, tooltip.textKey)}
          </span>
        </div>
      </div>
    );
  };

  const renderMobileTooltipsList = (tooltips: Tooltip[]) => {
    return (
      <div className="absolute top-3 right-3 bottom-3 w-[50%] max-w-[50%] lg:hidden overflow-y-auto">
        <div className="space-y-3 p-3 rounded-sm shadow-lg bg-[rgba(255,255,255,0.75)] backdrop-blur-sm">
          {tooltips.map((tooltip) => (
            <div key={tooltip.id} className="flex items-start">
              <div className="w-2 h-2 bg-[#FFA000] rounded-full mt-1 mr-2 flex-shrink-0"></div>
              <span className="text-[15px] text-gray-800 leading-tight break-words">
                {t(locale, tooltip.textKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <Title as="h3" locale={locale} className="text-center mb-4">
        {t(locale, "cleaningTabs.title")}
      </Title>
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-sm p-2 mb-6 w-full sm:w-auto sm:inline-flex">
          <div className="grid grid-cols-2 gap-1 sm:flex sm:gap-2">
            {TABS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-5 sm:px-4 py-5 font-semibold rounded-xs transition-all duration-200 text-center hover:cursor-pointer ${
                  activeTabId === tab.id
                    ? "bg-[#FFA000] text-white"
                    : "text-gray-700 hover:bg-gray-100 "
                }`}
              >
                {t(locale, tab.titleKey)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab && (
        <div
          className="relative w-full bg-gray-50 rounded-lg overflow-hidden"
          style={{ aspectRatio: "10/6" }}
        >
          <Image
            src={activeTab.imagePath}
            alt={t(locale, activeTab.titleKey)}
            fill
            className="object-cover"
            priority
          />

          {activeTab.tooltips.map(renderTooltip)}

          {renderMobileTooltipsList(activeTab.tooltips)}
        </div>
      )}
    </div>
  );
};

export default InteractiveImageTabs;
