/*
"use client";

import { useState, useEffect } from "react";
import { OrderFormData } from "@/lib/types/order";

const STORAGE_KEY = "order_form_data";
const EXPIRY_HOURS = 24;

export function useOrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    rooms: 1,
    bathrooms: 1,
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "bankTransfer",
    totalPrice: 150,
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = new Date().getTime();
        if (
          parsed.timestamp &&
          now - parsed.timestamp < EXPIRY_HOURS * 60 * 60 * 1000
        ) {
          setFormData(parsed.data);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const dataToStore = {
      data: formData,
      step: currentStep,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, currentStep]);

  // Calculate total price
  useEffect(() => {
    let total;

    // Base price podle počtu pokojů
    if (formData.rooms <= 2) {
      total = 150; // 1-2 pokoje: base price 150 EUR
    } else {
      total = 160; // 3+ pokoje: base price 160 EUR
    }

    // Přidat ceny dodatečných služeb
    total += formData.additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.rooms, formData.additionalServices]);

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const clearForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      rooms: 1,
      bathrooms: 1,
      additionalServices: [],
      location: null,
      date: "",
      timeSlot: "morning",
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "bankTransfer",
      totalPrice: 150,
    });
    setCurrentStep(1);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    clearForm,
    setCurrentStep,
    isLoading,
    setIsLoading,
  };
}
*/
/*
"use client";
import { useState, useEffect } from "react";
import { OrderFormData } from "@/lib/types/order";

const STORAGE_KEY = "order_form_data";
const EXPIRY_HOURS = 24;

export function useOrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    rooms: 1,
    bathrooms: 1,
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "bankTransfer",
    totalPrice: 150,
    eco: false, // NOVÉ POLE
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = new Date().getTime();
        if (
          parsed.timestamp &&
          now - parsed.timestamp < EXPIRY_HOURS * 60 * 60 * 1000
        ) {
          setFormData(parsed.data);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const dataToStore = {
      data: formData,
      step: currentStep,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, currentStep]);

  // Calculate total price - AKTUALIZOVÁNO pro eco
  useEffect(() => {
    let total;
    // Base price podle počtu pokojů
    if (formData.rooms <= 2) {
      total = 150; // 1-2 pokoje: base price 150 EUR
    } else {
      total = 160; // 3+ pokoje: base price 160 EUR
    }

    // Přidat ceny dodatečných služeb
    total += formData.additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // PŘIDAT ECO-FRIENDLY POPLATEK
    if (formData.eco) {
      total += 50;
    }

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.rooms, formData.additionalServices, formData.eco]); // PŘIDÁNO formData.eco

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const clearForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      rooms: 1,
      bathrooms: 1,
      additionalServices: [],
      location: null,
      date: "",
      timeSlot: "morning",
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "bankTransfer",
      totalPrice: 150,
      eco: false, // PŘIDÁNO
    });
    setCurrentStep(1);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    clearForm,
    setCurrentStep,
    isLoading,
    setIsLoading,
  };
}
*/
/*
"use client";

import { useState, useEffect } from "react";
import { OrderFormData } from "@/lib/types/order";

const STORAGE_KEY = "order_form_data";
const EXPIRY_HOURS = 24;

export function useOrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    rooms: 1,
    bathrooms: 1,
    property: "flat", // NOVÉ POLE - default na "flat"
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "bankTransfer",
    totalPrice: 150,
    eco: false, // NOVÉ POLE
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = new Date().getTime();
        if (
          parsed.timestamp &&
          now - parsed.timestamp < EXPIRY_HOURS * 60 * 60 * 1000
        ) {
          // Ensure that property field exists in stored data (backwards compatibility)
          const dataWithProperty = {
            ...parsed.data,
            property: parsed.data.property || "flat", // Default to "flat" if not present
          };
          setFormData(dataWithProperty);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const dataToStore = {
      data: formData,
      step: currentStep,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, currentStep]);

  // Calculate total price - AKTUALIZOVÁNO pro eco
  useEffect(() => {
    let total;
    // Base price podle počtu pokojů
    if (formData.rooms <= 2) {
      total = 150; // 1-2 pokoje: base price 150 EUR
    } else {
      total = 160; // 3+ pokoje: base price 160 EUR
    }

    // Přidat ceny dodatečných služeb
    total += formData.additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // PŘIDAT ECO-FRIENDLY POPLATEK
    if (formData.eco) {
      total += 50;
    }

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [formData.rooms, formData.additionalServices, formData.eco]); // PŘIDÁNO formData.eco

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const clearForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      rooms: 1,
      bathrooms: 1,
      property: "flat", // PŘIDÁNO
      additionalServices: [],
      location: null,
      date: "",
      timeSlot: "morning",
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "bankTransfer",
      totalPrice: 150,
      eco: false, // PŘIDÁNO
    });
    setCurrentStep(1);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    clearForm,
    setCurrentStep,
    isLoading,
    setIsLoading,
  };
}
*/

"use client";

import { useState, useEffect } from "react";
import { OrderFormData } from "@/lib/types/order";

const STORAGE_KEY = "order_form_data";
const EXPIRY_HOURS = 24;

export function useOrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    rooms: 1,
    bathrooms: 1,
    property: "flat", // NOVÉ POLE - default na "flat"
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "bankTransfer",
    totalPrice: 150,
    eco: false, // NOVÉ POLE
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const now = new Date().getTime();
        if (
          parsed.timestamp &&
          now - parsed.timestamp < EXPIRY_HOURS * 60 * 60 * 1000
        ) {
          // Ensure that property field exists in stored data (backwards compatibility)
          const dataWithProperty = {
            ...parsed.data,
            property: parsed.data.property || "flat", // Default to "flat" if not present
          };
          setFormData(dataWithProperty);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    const dataToStore = {
      data: formData,
      step: currentStep,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [formData, currentStep]);

  // Calculate total price - AKTUALIZOVÁNO pro eco a property type
  useEffect(() => {
    let total;
    // Base price podle počtu pokojů
    if (formData.rooms <= 2) {
      total = 150; // 1-2 pokoje: base price 150 EUR
    } else {
      total = 160; // 3+ pokoje: base price 160 EUR
    }

    // PŘIDAT PŘÍPLATEK PRO DŮM (120% základní ceny)
    if (formData.property === "house") {
      total = total * 1.2; // 20% příplatek pro dům
    }

    // Přidat ceny dodatečných služeb
    total += formData.additionalServices.reduce(
      (sum, service) => sum + service.price,
      0
    );

    // PŘIDAT ECO-FRIENDLY POPLATEK
    if (formData.eco) {
      total += 50;
    }

    // Zaokrouhlit na celá čísla
    total = Math.round(total);

    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [
    formData.rooms,
    formData.additionalServices,
    formData.eco,
    formData.property,
  ]); // PŘIDÁNO formData.property

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const clearForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      rooms: 1,
      bathrooms: 1,
      property: "flat",
      additionalServices: [],
      location: null,
      date: "",
      timeSlot: "morning",
      name: "",
      email: "",
      phone: "",
      address: "",
      paymentMethod: "bankTransfer",
      totalPrice: 150,
      eco: false,
    });
    setCurrentStep(1);
  };

  return {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    clearForm,
    setCurrentStep,
    isLoading,
    setIsLoading,
  };
}
