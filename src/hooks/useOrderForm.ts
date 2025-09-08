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

/*
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OrderFormData } from "@/lib/types/order";

const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,
  secure: false,
  auth: {
    user: "info@cleanspace.eu.com",
    pass: process.env.GODADDY_EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderFormData = await request.json();

    // Helper function to get property type text
    const getPropertyTypeText = (propertyType: "flat" | "house") => {
      switch (propertyType) {
        case "flat":
          return "Byt";
        case "house":
          return "Dům";
        default:
          return propertyType;
      }
    };

    // Email pro admin - AKTUALIZOVÁNO pro eco a property
    const adminEmailData = {
      from: "info@cleanspace.eu.com",
      to: [
        process.env.ADMIN_EMAIL || "cleanspace9025@gmail.com",
        "cleanspace9025@gmail.com",
      ],
      subject: `Cleanspace: Nová objednávka - ${orderData.location?.region}`,
      html: `
        <h2>Nová objednávka</h2>
        <p><strong>Číslo objednávky:</strong> ${
          orderData.displayTitle || "Generuje se..."
        }</p>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Čas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Region:</strong> ${orderData.location?.region}</p>
        <p><strong>Typ nemovitosti:</strong> ${getPropertyTypeText(
          orderData.property
        )}</p>
        <p><strong>Počet pokojů:</strong> ${orderData.rooms}</p>
        <p><strong>Počet koupelen:</strong> ${orderData.bathrooms}</p>
        <p><strong>Eco-friendly prostředky:</strong> ${
          orderData.eco ? "ANO (+50 EUR)" : "NE"
        }</p>
        <p><strong>Příplatkové služby:</strong> ${
          orderData.additionalServices.map((s) => s.title).join(", ") || "Žádné"
        }</p>
        <p><strong>Celková cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na zákazníka:</h3>
        <p><strong>Jméno:</strong> ${orderData.name}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Telefon:</strong> ${orderData.phone}</p>
        <p><strong>Adresa:</strong> ${orderData.address}</p>
        <p><strong>Platba:</strong> ${
          orderData.paymentMethod === "bankTransfer"
            ? "Bankovní převod"
            : "Karta"
        }</p>
      `,
    };

    // Email pro zakaznika - AKTUALIZOVÁNO pro eco a property
    const customerEmailData = {
      from: "info@cleanspace.eu.com",
      to: orderData.email,
      subject: "Potvrzení objednávky - Cleanspace",
      html: `
        <h2>Děkujeme za vaši objednávku!</h2>
        <p>Vaše objednávka byla úspěšně přijata.</p>

        <h3>Detaily objednávky:</h3>
        <p><strong>Číslo objednávky:</strong> ${
          orderData.displayTitle || "Bude vám zasláno"
        }</p>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Čas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Adresa:</strong> ${orderData.address}</p>
        <p><strong>Typ nemovitosti:</strong> ${getPropertyTypeText(
          orderData.property
        )}</p>
        ${
          orderData.eco
            ? "<p><strong>Eco-friendly prostředky:</strong> ANO</p>"
            : ""
        }
        <p><strong>Celková cena:</strong> ${orderData.totalPrice} EUR</p>

        <h3>Údaje k platbě:</h3>
        <p><strong>Příjemce:</strong> CLEANSPACE</p>
        <p><strong>Měna:</strong> EUR</p>
        <p><strong>IBAN:</strong> LT58 3250 0757 8953 6123</p>
        <p><strong>BIC:</strong> REVOLT21</p>
        <p><strong>Zpráva pro příjemce:</strong> ${
          orderData.displayTitle || "Číslo vaší objednávky"
        }</p>

        <h3>Kontakt na podporu:</h3>
        <p><strong>Email:</strong> info@cleanspace.eu.com</p>
        <p><strong>Telefon:</strong> +357 99 123 456</p>

        <p>Ozveme se vám brzy s dalšími informacemi.</p>
        <p>CleanSpace Team</p>
      `,
    };

    // Poslat emaily
    console.log("Sending admin email to:", adminEmailData.to);
    console.log("Sending customer email to:", customerEmailData.to);
    console.log("Order number:", orderData.displayTitle);
    console.log("Eco-friendly:", orderData.eco);
    console.log("Property type:", orderData.property);

    const adminResult = await transporter.sendMail(adminEmailData);
    console.log("Admin email result:", adminResult);

    const customerResult = await transporter.sendMail(customerEmailData);
    console.log("Customer email result:", customerResult);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      adminEmailId: adminResult.messageId,
      customerEmailId: customerResult.messageId,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}

function getTimeSlotText(timeSlot: string): string {
  switch (timeSlot) {
    case "morning":
      return "Dopoledne (8:00 - 12:00)";
    case "noon":
      return "Poledne (12:00 - 16:00)";
    case "afternoon":
      return "Odpoledne (16:00 - 20:00)";
    case "unsure":
      return "Domluvime se pozdeji";
    default:
      return timeSlot;
  }
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

// Přidáváme také default export pro flexibilitu
export default useOrderForm;
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
    property: "flat",
    additionalServices: [], // Nyní bude obsahovat ServiceWithQuantity[]
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

  // Calculate total price - AKTUALIZOVÁNO pro quantity
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

    // Přidat ceny dodatečných služeb S QUANTITY
    total += formData.additionalServices.reduce(
      (sum, item) => {
        const servicePrice = item.service.price || 0;
        return sum + (servicePrice * item.quantity);
      },
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

// Přidáváme také default export pro flexibilitu
export default useOrderForm;
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

  // Calculate total price - SPRÁVNÁ CENOVÁ LOGIKA
  useEffect(() => {
    let total = 0;
    
    if (formData.property === "flat") {
      // BYT: Base cena podle pokojů
      if (formData.rooms <= 2) {
        total = 150; // 1-2 pokoje: 150 EUR
      } else if (formData.rooms === 3) {
        total = 160; // 3 pokoje: 160 EUR
      } else {
        // 4+ pokoje: base 160 + 10 EUR za každý další pokoj nad 3
        total = 160 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        total += (formData.bathrooms - 1) * 10;
      }
    } else {
      // DŮM: Base cena podle pokojů (120% z bytu)
      if (formData.rooms <= 2) {
        total = 180; // 120% z 150
      } else if (formData.rooms === 3) {
        total = 192; // 120% z 160
      } else {
        // 4+ pokoje: base 192 + 10 EUR za každý další pokoj nad 3
        total = 192 + (formData.rooms - 3) * 10;
      }
      
      // Koupelny: pokud více než 1, +10 EUR za každou další
      if (formData.bathrooms > 1) {
        total += (formData.bathrooms - 1) * 10;
      }
    }

    // Přidat ceny dodatečných služeb S QUANTITY
    total += formData.additionalServices.reduce(
      (sum, item) => {
        const servicePrice = item.service.price || 0;
        return sum + (servicePrice * item.quantity);
      },
      0
    );

    // Přidat ECO-FRIENDLY poplatek
    if (formData.eco) {
      total += 50;
    }

    // Zaokrouhlit na celá čísla
    total = Math.round(total);
    
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  }, [
    formData.rooms,
    formData.bathrooms,
    formData.additionalServices,
    formData.eco,
    formData.property,
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