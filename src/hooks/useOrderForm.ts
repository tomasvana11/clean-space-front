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
    property: "flat",
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    frequency: "one-time",
    discountPercentage: 0,
    paymentMethod: "bankTransfer",
    totalPrice: 150,
    originalPrice: 150,
    eco: false,
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
          // Ensure backwards compatibility
          const dataWithProperty = {
            ...parsed.data,
            property: parsed.data.property || "flat",
            frequency: parsed.data.frequency || "one-time",
            discountPercentage: parsed.data.discountPercentage || 0,
            // Migrace starých dat - pokud additionalServices neobsahuje quantity, přidáme ji
            additionalServices: parsed.data.additionalServices?.map((item: any) => {
              if (item.quantity !== undefined && item.service !== undefined) {
                return item; // Už má správnou strukturu ServiceWithQuantity
              } else if (item.id !== undefined) {
                // Stará struktura - Service[], převedeme na ServiceWithQuantity[]
                return {
                  service: item,
                  quantity: 1
                };
              } else {
                return item; // Fallback
              }
            }) || []
          };
          setFormData(dataWithProperty);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
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

  // Calculate total price with frequency discount
  useEffect(() => {
    let baseTotal = 0;
    
    if (formData.property === "flat") {
      // BYT: Base cena podle pokojů
      if (formData.rooms <= 2) {
        baseTotal = 0; // 1-2 pokoje: 150 EUR
      } else if (formData.rooms === 3) {
        baseTotal = 160; // 3 pokoje: 160 EUR
      } else {
        // 4+ pokoje: base 160 + 10 EUR za každý další pokoj nad 3
        baseTotal = 160 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        baseTotal += (formData.bathrooms - 1) * 10;
      }
    } else {
      // DŮM: Base cena podle pokojů (120% z bytu)
      if (formData.rooms <= 2) {
        baseTotal = 180; // 120% z 150
      } else if (formData.rooms === 3) {
        baseTotal = 192; // 120% z 160
      } else {
        // 4+ pokoje: base 192 + 10 EUR za každý další pokoj nad 3
        baseTotal = 192 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        baseTotal += (formData.bathrooms - 1) * 10;
      }
    }

    // Přidat ceny dodatečných služeb S QUANTITY
    baseTotal += formData.additionalServices.reduce(
      (sum, item) => {
        const servicePrice = item.service.price || 0;
        return sum + (servicePrice * item.quantity);
      },
      0
    );

    // Přidat ECO-FRIENDLY poplatek
    if (formData.eco) {
      baseTotal += 50;
    }

    // Zaokrouhlit na celá čísla
    const originalPrice = Math.round(baseTotal);
    
    // Aplikovat slevu podle frequency
    const discountPercentage = formData.discountPercentage || 0;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = Math.round(originalPrice - discountAmount);
    
    setFormData((prev) => ({ 
      ...prev, 
      originalPrice: originalPrice,
      totalPrice: finalPrice 
    }));
  }, [
    formData.rooms,
    formData.bathrooms,
    formData.additionalServices,
    formData.eco,
    formData.property,
    formData.discountPercentage,
  ]);

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
      frequency: "one-time",
      discountPercentage: 0,
      paymentMethod: "bankTransfer",
      totalPrice: 0,
      originalPrice: 0,
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

export default useOrderForm;
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
    property: "flat",
    additionalServices: [],
    location: null,
    date: "",
    timeSlot: "morning",
    name: "",
    email: "",
    phone: "",
    address: "",
    frequency: "one-time",
    discountPercentage: 0,
    paymentMethod: "bankTransfer",
    totalPrice: 150,
    originalPrice: 150,
    eco: false,
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
          // Ensure backwards compatibility
          const dataWithProperty = {
            ...parsed.data,
            property: parsed.data.property || "flat",
            frequency: parsed.data.frequency || "one-time",
            discountPercentage: parsed.data.discountPercentage || 0,
            // Migrace starých dat - pokud additionalServices neobsahuje quantity, přidáme ji
            additionalServices: parsed.data.additionalServices?.map((item: any) => {
              if (item.quantity !== undefined && item.service !== undefined) {
                return item; // Už má správnou strukturu ServiceWithQuantity
              } else if (item.id !== undefined) {
                // Stará struktura - Service[], převedeme na ServiceWithQuantity[]
                return {
                  service: item,
                  quantity: 1
                };
              } else {
                return item; // Fallback
              }
            }) || []
          };
          setFormData(dataWithProperty);
          setCurrentStep(parsed.step || 1);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
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

  // Calculate total price with frequency discount
  useEffect(() => {
    let baseTotal = 0;
    
    if (formData.property === "flat") {
      // BYT: Base cena podle pokojů
      if (formData.rooms <= 2) {
        baseTotal = 150; // OPRAVENO: 1-2 pokoje: 150 EUR
      } else if (formData.rooms === 3) {
        baseTotal = 160; // 3 pokoje: 160 EUR
      } else {
        // 4+ pokoje: base 160 + 10 EUR za každý další pokoj nad 3
        baseTotal = 160 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        baseTotal += (formData.bathrooms - 1) * 10;
      }
    } else {
      // DŮM: Base cena podle pokojů (120% z bytu)
      if (formData.rooms <= 2) {
        baseTotal = 180; // 120% z 150
      } else if (formData.rooms === 3) {
        baseTotal = 192; // 120% z 160
      } else {
        // 4+ pokoje: base 192 + 10 EUR za každý další pokoj nad 3
        baseTotal = 192 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        baseTotal += (formData.bathrooms - 1) * 10;
      }
    }

    // Přidat ceny dodatečných služeb S QUANTITY
    baseTotal += formData.additionalServices.reduce(
      (sum, item) => {
        const servicePrice = item.service.price || 0;
        return sum + (servicePrice * item.quantity);
      },
      0
    );

    // Přidat ECO-FRIENDLY poplatek
    if (formData.eco) {
      baseTotal += 50;
    }

    // OPRAVENO: Zaokrouhlit na 2 desetinná místa místo celých čísel
    const originalPrice = Math.round(baseTotal * 100) / 100;
    
    // Aplikovat slevu podle frequency
    const discountPercentage = formData.discountPercentage || 0;
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = Math.round((originalPrice - discountAmount) * 100) / 100;
    
    setFormData((prev) => ({ 
      ...prev, 
      originalPrice: originalPrice,
      totalPrice: finalPrice 
    }));
  }, [
    formData.rooms,
    formData.bathrooms,
    formData.additionalServices,
    formData.eco,
    formData.property,
    formData.discountPercentage,
  ]);

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
      frequency: "one-time",
      discountPercentage: 0,
      paymentMethod: "bankTransfer",
      totalPrice: 150,
      originalPrice: 150,
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

export default useOrderForm;