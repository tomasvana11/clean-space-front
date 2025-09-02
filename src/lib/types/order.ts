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
}
*/

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
