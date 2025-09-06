/*
import { Service, Location } from "./strapi";

export interface OrderFormData {
  // Step 1: Services
  rooms: number;
  bathrooms: number;
  additionalServices: Service[];

  // Step 2: Location & Time
  location: Location | null;
  date: string;
  timeSlot: "morning" | "noon" | "afternoon" | "unsure";

  // Step 3: Customer Info
  name: string;
  email: string;
  phone: string;
  address: string;

  // Step 4: Payment
  paymentMethod: "bankTransfer" | "card";

  // Calculated
  totalPrice: number;
  eco: boolean;

  // Generated after order creation
  displayTitle?: string;
}
*/


/*
import { Service, Location } from "./strapi";

export interface OrderFormData {
  // Step 1: Services
  rooms: number;
  bathrooms: number;
  property: "flat" | "house";
  additionalServices: Service[];
  // Step 2: Location & Time
  location: Location | null;
  date: string;
  timeSlot: "morning" | "noon" | "afternoon" | "unsure";
  // Step 3: Customer Info
  name: string;
  email: string;
  phone: string;
  address: string;
  // Step 4: Payment
  paymentMethod: "bankTransfer" | "card";
  // Calculated
  totalPrice: number;
  eco: boolean;
  // Generated after order creation
  displayTitle?: string;
}
*/
/*
// lib/types/order.ts
import { Service, Location } from "./strapi";

// Nový interface pro služby s quantity
export interface ServiceWithQuantity {
  service: Service;
  quantity: number;
}

export interface OrderFormData {
  // Step 1: Services
  rooms: number;
  bathrooms: number;
  property: "flat" | "house";
  additionalServices: ServiceWithQuantity[]; // Změněno z Service[] na ServiceWithQuantity[]
  // Step 2: Location & Time
  location: Location | null;
  date: string;
  timeSlot: "morning" | "noon" | "afternoon" | "unsure";
  // Step 3: Customer Info
  name: string;
  email: string;
  phone: string;
  address: string;
  // Step 4: Payment
  paymentMethod: "bankTransfer" | "card";
  // Calculated
  totalPrice: number;
  eco: boolean;
  // Generated after order creation
  displayTitle?: string;
}

// Interface pro data, která se odešlou do Strapi
export interface OrderDataForStrapi {
  rooms: number;
  bathrooms: number;
  property: "flat" | "house";
  location: number; // ID lokace
  date: string;
  timeSlot: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  totalPrice: number;
  eco: boolean;
  // Nové pole pro JSON data s purchased products
  purchasedProducts: {
    serviceId: number;
    serviceName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}
  */

// lib/types/order.ts
import { Service, Location } from "./strapi";

// Interface pro služby s quantity
export interface ServiceWithQuantity {
  service: Service;
  quantity: number;
}

export interface OrderFormData {
  // Step 1: Services
  rooms: number;
  bathrooms: number;
  property: "flat" | "house";
  additionalServices: ServiceWithQuantity[];
  // Step 2: Location & Time
  location: Location | null;
  date: string;
  timeSlot: "morning" | "noon" | "afternoon" | "unsure";
  // Step 3: Customer Info
  name: string;
  email: string;
  phone: string;
  address: string;
  // Step 4: Payment
  paymentMethod: "bankTransfer" | "card";
  // Calculated
  totalPrice: number;
  eco: boolean;
  // Generated after order creation
  displayTitle?: string;
}

// Zjednodušené JSON data pro Strapi - jen název a quantity
export interface OrderedService {
  serviceName: string;
  quantity: number;
}