/*
import { OrderFormData } from "./types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function submitOrder(
  orderData: OrderFormData
): Promise<{ id: number }> {
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        services: orderData.additionalServices.map((service) => service.id),
        location: orderData.location?.id,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: "pending",
        totalPrice: orderData.totalPrice,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit order");
  }

  const result = await response.json();
  return result.data;
}
*/

/*
import { OrderFormData } from "./types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function submitOrder(
  orderData: OrderFormData
): Promise<{ id: number }> {
  // Nejdříve zkontroluj, jestli už existuje objednávka pro danou lokaci/datum/čas
  const existingOrdersResponse = await fetch(
    `${STRAPI_URL}/api/orders?filters[location][id][$eq]=${orderData.location?.id}&filters[date][$eq]=${orderData.date}&filters[timeSlot][$eq]=${orderData.timeSlot}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!existingOrdersResponse.ok) {
    throw new Error("Failed to check existing orders");
  }

  const existingOrders = await existingOrdersResponse.json();

  if (existingOrders.data && existingOrders.data.length > 0) {
    throw new Error(
      `Slot is already booked. Please choose a different time or date.`
    );
  }

  console.log("Submitting order with data:", {
    services: orderData.additionalServices.map((s) => s.id),
    location: orderData.location?.id,
    serviceIds: orderData.additionalServices.map((service) => service.id),
    locationId: orderData.location?.id,
  });

  // Zkus Strapi v5 syntax - dokumentace říká použít documentId
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        // Zkus použít documentId místo id pro relace
        services: orderData.additionalServices.map(
          (service) => service.documentId
        ),
        location: orderData.location?.documentId,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: "pending",
        totalPrice: orderData.totalPrice,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Submit order error:", errorData);
    throw new Error(
      `Failed to submit order: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();
  console.log("Order created successfully:", result);
  return result.data;
}*/

/*
import { OrderFormData } from "./types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function submitOrder(
  orderData: OrderFormData
): Promise<{ id: number }> {
  // Kontrola dostupnosti pro danou lokaci a datum
  const existingOrdersResponse = await fetch(
    `${STRAPI_URL}/api/orders?filters[location][documentId][$eq]=${orderData.location?.documentId}&filters[date][$eq]=${orderData.date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!existingOrdersResponse.ok) {
    throw new Error("Failed to check existing orders");
  }

  const existingOrders = await existingOrdersResponse.json();
  const orders = existingOrders.data || [];

  console.log("Existing orders for date/location:", orders);

  // Logika pro kontrolu dostupnosti
  const bookedSlots = orders.map((order: any) => order.timeSlot);
  const availableSlots = ["morning", "noon", "afternoon"];
  const freeSlots = availableSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  console.log("Booked slots:", bookedSlots);
  console.log("Free slots:", freeSlots);

  // Kontrola podle zvoleného času
  if (orderData.timeSlot === "unsure") {
    // Pro "unsure" musí být alespoň 1 volný slot
    if (freeSlots.length === 0) {
      throw new Error("No available time slots for this date and location.");
    }
  } else {
    // Pro konkrétní čas - slot nesmí být obsazený
    if (bookedSlots.includes(orderData.timeSlot)) {
      throw new Error(
        `Time slot "${orderData.timeSlot}" is already booked for this date and location.`
      );
    }
  }

  console.log("Submitting order with data:", {
    services: orderData.additionalServices.map((s) => s.documentId),
    location: orderData.location?.documentId,
    timeSlot: orderData.timeSlot,
  });

  // Vytvoř objednávku
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        services: orderData.additionalServices.map(
          (service) => service.documentId
        ),
        location: orderData.location?.documentId,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: "pending",
        totalPrice: orderData.totalPrice,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Submit order error:", errorData);
    throw new Error(
      `Failed to submit order: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();
  console.log("Order created successfully:", result);

  // Poslat email notifikace
  try {
    const emailResponse = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (emailResponse.ok) {
      console.log("Email notifications sent successfully");
    } else {
      console.error("Failed to send email notifications");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    // Nepřerušuj proces, i když email selže
  }

  return result.data;
}
*/

/*
import { OrderFormData } from "./types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function submitOrder(
  orderData: OrderFormData
): Promise<{ id: number }> {
  // Kontrola dostupnosti pro danou lokaci a datum
  const existingOrdersResponse = await fetch(
    `${STRAPI_URL}/api/orders?filters[location][documentId][$eq]=${orderData.location?.documentId}&filters[date][$eq]=${orderData.date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!existingOrdersResponse.ok) {
    throw new Error("Failed to check existing orders");
  }

  const existingOrders = await existingOrdersResponse.json();
  const orders = existingOrders.data || [];

  // Logika pro kontrolu dostupnosti
  const bookedSlots = orders.map((order: any) => order.timeSlot);
  const availableSlots = ["morning", "noon", "afternoon"];
  const freeSlots = availableSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  // Kontrola podle zvoleného času
  if (orderData.timeSlot === "unsure") {
    // Pro "unsure" musí být alespoň 1 volný slot
    if (freeSlots.length === 0) {
      throw new Error("No available time slots for this date and location.");
    }
  } else {
    // Pro konkrétní čas - slot nesmí být obsazený
    if (bookedSlots.includes(orderData.timeSlot)) {
      throw new Error(
        `Time slot "${orderData.timeSlot}" is already booked for this date and location.`
      );
    }
  }

  // Vytvoř objednávku
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        services: orderData.additionalServices.map(
          (service) => service.documentId
        ),
        location: orderData.location?.documentId,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: "pending",
        totalPrice: orderData.totalPrice,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Submit order error:", errorData);
    throw new Error(
      `Failed to submit order: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();

  // Poslat email notifikace
  try {
    const emailResponse = await fetch("/api/send-order-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email notifications");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
  }

  return result.data;
}
*/

import { OrderFormData } from "./types/order";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function submitOrder(
  orderData: OrderFormData
): Promise<{ id: number }> {
  // Kontrola dostupnosti pro danou lokaci a datum
  const existingOrdersResponse = await fetch(
    `${STRAPI_URL}/api/orders?filters[location][documentId][$eq]=${orderData.location?.documentId}&filters[date][$eq]=${orderData.date}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!existingOrdersResponse.ok) {
    throw new Error("Failed to check existing orders");
  }

  const existingOrders = await existingOrdersResponse.json();
  const orders = existingOrders.data || [];

  // Logika pro kontrolu dostupnosti
  const bookedSlots = orders.map((order: any) => order.timeSlot);
  const availableSlots = ["morning", "noon", "afternoon"];
  const freeSlots = availableSlots.filter(
    (slot) => !bookedSlots.includes(slot)
  );

  // Kontrola podle zvoleného času
  if (orderData.timeSlot === "unsure") {
    // Pro "unsure" musí být alespoň 1 volný slot
    if (freeSlots.length === 0) {
      throw new Error("No available time slots for this date and location.");
    }
  } else {
    // Pro konkrétní čas - slot nesmí být obsazený
    if (bookedSlots.includes(orderData.timeSlot)) {
      throw new Error(
        `Time slot "${orderData.timeSlot}" is already booked for this date and location.`
      );
    }
  }

  // Vytvoř objednávku
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        services: orderData.additionalServices.map(
          (service) => service.documentId
        ),
        location: orderData.location?.documentId,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: "pending",
        totalPrice: orderData.totalPrice,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error("Submit order error:", errorData);
    throw new Error(
      `Failed to submit order: ${response.status} ${response.statusText}`
    );
  }

  const result = await response.json();
  console.log("Order creation result:", result); // Debug log

  // Poslat email notifikace s číslem objednávky
  try {
    const emailResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_URL?.replace(":1337", ":3000") ||
        "http://localhost:3000"
      }/api/send-order-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          displayTitle: result.data?.displayTitle, // Správná cesta k displayTitle
        }),
      }
    );

    if (!emailResponse.ok) {
      console.error("Failed to send email notifications");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
  }

  return result.data;
}
