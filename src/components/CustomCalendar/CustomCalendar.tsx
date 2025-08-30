/*
"use client";

import React, { useState } from "react";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: string;
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = {
    cs: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const dayNames = {
    cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust so Monday = 0

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateSelectable = (date: Date) => {
    return date >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDateString(date);
  };

  const days = getDaysInMonth(currentMonth);
  const currentLocale = (locale as keyof typeof monthNames) || "en";

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors w-8 h-8 flex items-center justify-center"
          type="button"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-gray-800">
          {monthNames[currentLocale][currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors w-8 h-8 flex items-center justify-center"
          type="button"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames[currentLocale].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="h-10" />;
          }

          const isSelectable = isDateSelectable(date);
          const isSelected = isDateSelected(date);
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={index}
              onClick={() =>
                isSelectable && onDateSelect(formatDateString(date))
              }
              disabled={!isSelectable}
              className={`
                h-10 text-sm rounded-lg transition-all font-medium
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : isSelectable
                    ? "hover:bg-blue-50 text-gray-800"
                    : "text-gray-300 cursor-not-allowed"
                }
                ${isToday && !isSelected ? "ring-2 ring-blue-200" : ""}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          {locale === "cs"
            ? "Dostupné termíny od zítřka"
            : locale === "ru"
            ? "Доступные даты с завтра"
            : "Available dates from tomorrow"}
        </p>
      </div>
    </div>
  );
}
*/

/*
"use client";

import React, { useState } from "react";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: string;
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = {
    cs: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const dayNames = {
    cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateSelectable = (date: Date) => {
    return date >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDateString(date);
  };

  const days = getDaysInMonth(currentMonth);
  const currentLocale = (locale as keyof typeof monthNames) || "en";

  return (
    <div className="aspect-square bg-white p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-sm font-semibold text-gray-800">
          {monthNames[currentLocale][currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames[currentLocale].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }

          const isSelectable = isDateSelectable(date);
          const isSelected = isDateSelected(date);

          return (
            <button
              key={index}
              onClick={() =>
                isSelectable && onDateSelect(formatDateString(date))
              }
              disabled={!isSelectable}
              style={{
                backgroundColor: isSelected ? "#FFA000" : "#FFF5D7",
                color: isSelected ? "white" : "#FFA000",
              }}
              className={`
                aspect-square rounded-full text-xs font-medium transition-all
                ${
                  isSelectable
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed opacity-30"
                }
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
*/

/*
"use client";

import React, { useState } from "react";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: string;
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = {
    cs: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const dayNames = {
    cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateSelectable = (date: Date) => {
    return date >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDateString(date);
  };

  const days = getDaysInMonth(currentMonth);
  const currentLocale = (locale as keyof typeof monthNames) || "en";

  return (
    <div className="aspect-square bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-sm font-semibold text-gray-800">
          {monthNames[currentLocale][currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames[currentLocale].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }

          const isSelectable = isDateSelectable(date);
          const isSelected = isDateSelected(date);

          return (
            <button
              key={index}
              onClick={() =>
                isSelectable && onDateSelect(formatDateString(date))
              }
              disabled={!isSelectable}
              style={{
                backgroundColor: isSelected ? "#FFF5D7" : "#FFF5D7",
                color: isSelected ? "#372900" : "#FFA000",
              }}
              className={`
                aspect-square rounded-full text-xs font-medium transition-all
                ${
                  isSelectable
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed opacity-30"
                }
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
*/

/*
"use client";

import React, { useState } from "react";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: string;
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = {
    cs: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const dayNames = {
    cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateSelectable = (date: Date) => {
    return date >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDateString(date);
  };

  const days = getDaysInMonth(currentMonth);
  const currentLocale = (locale as keyof typeof monthNames) || "en";

  return (
    <div className="aspect-square bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-sm font-semibold text-gray-800">
          {monthNames[currentLocale][currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
          type="button"
        >
          <svg
            className="w-4 h-4 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames[currentLocale].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }

          const isSelectable = isDateSelectable(date);
          const isSelected = isDateSelected(date);

          return (
            <button
              key={index}
              onClick={() =>
                isSelectable && onDateSelect(formatDateString(date))
              }
              disabled={!isSelectable}
              className={`
    aspect-square rounded-full text-xs font-semibold transition-all
    ${isSelected ? "bg-[#FFA000] text-white" : ""}
    ${
      !isSelectable
        ? "bg-transparent text-gray-400 cursor-not-allowed opacity-50"
        : ""
    }
    ${
      isSelectable && !isSelected
        ? "bg-[#FFF5D7] text-[#FFA000] cursor-pointer hover:scale-105"
        : ""
    }
  `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
*/

"use client";

import React, { useState } from "react";

interface CustomCalendarProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
  locale: string;
}

export function CustomCalendar({
  selectedDate,
  onDateSelect,
  locale,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = {
    cs: [
      "Leden",
      "Únor",
      "Březen",
      "Duben",
      "Květen",
      "Červen",
      "Červenec",
      "Srpen",
      "Září",
      "Říjen",
      "Listopad",
      "Prosinec",
    ],
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ru: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  };

  const dayNames = {
    cs: ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  };

  // ✅ funkce pro odstranění času
  const stripTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = stripTime(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === "prev") {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // ✅ upravené porovnávání na úrovni dnů
  const isDateSelectable = (date: Date) => {
    const normalized = stripTime(date);
    return normalized >= tomorrow;
  };

  const isDateSelected = (date: Date) => {
    return selectedDate === formatDateString(date);
  };

  const days = getDaysInMonth(currentMonth);
  const currentLocale = (locale as keyof typeof monthNames) || "en";

  return (
    <div className="aspect-square bg-white p-4 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 hover:bg-[#FFF5D7] rounded-full transition-colors cursor-pointer"
          type="button"
        >
          <svg
            className="w-4 h-4 text-[#FFA000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <h3 className="text-sm font-semibold text-gray-800">
          {monthNames[currentLocale][currentMonth.getMonth()]}{" "}
          {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 hover:bg-[#FFF5D7] rounded-full transition-colors cursor-pointer"
          type="button"
        >
          <svg
            className="w-4 h-4 text-[#FFA000]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames[currentLocale].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }

          const isSelectable = isDateSelectable(date);
          const isSelected = isDateSelected(date);

          return (
            <button
              key={index}
              onClick={() =>
                isSelectable && onDateSelect(formatDateString(date))
              }
              disabled={!isSelectable}
              className={`
                aspect-square rounded-full text-[sm] font-semibold transition-all
                ${isSelected ? "bg-[#FFA000] text-white" : ""}
                ${
                  !isSelectable
                    ? "bg-transparent text-gray-300 cursor-not-allowed "
                    : ""
                }
                ${
                  isSelectable && !isSelected
                    ? "bg-[#FFF5D7] text-[#FFA000] cursor-pointer"
                    : ""
                }
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
