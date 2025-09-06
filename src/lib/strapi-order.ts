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

  // Vytvoř objednávku - AKTUALIZOVÁNO pro eco a property
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        property: orderData.property, // PŘIDÁNO PROPERTY POLE
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
        eco: orderData.eco, // ECO POLE
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

  // Uložit zákazníka do customers kolekce
  try {
    // Nejdříve zkontrolujeme, zda zákazník už existuje (podle emailu)
    const existingCustomerResponse = await fetch(
      `${STRAPI_URL}/api/customers?filters[emailAddress][$eq]=${orderData.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (existingCustomerResponse.ok) {
      const existingCustomers = await existingCustomerResponse.json();
      const customers = existingCustomers.data || [];

      if (customers.length === 0) {
        // Zákazník neexistuje, vytvoříme nového
        const createCustomerResponse = await fetch(
          `${STRAPI_URL}/api/customers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: orderData.name,
                emailAddress: orderData.email,
                phoneNumber: orderData.phone,
              },
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully");
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - neděláme nic, jen log
        console.log(
          "Customer already exists, skipping customer creation/update"
        );
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky
  try {
    const emailResponse = await fetch(`/api/send-order-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        displayTitle: result.data?.displayTitle, // Správná cesta k displayTitle
      }),
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

  // Připrav data pro orderedServices JSON pole
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceId: item.service.id,
    serviceName: item.service.title,
    quantity: item.quantity,
    unitPrice: item.service.price || 0,
    totalPrice: (item.service.price || 0) * item.quantity
  }));

  // Vytvoř objednávku - AKTUALIZOVÁNO pro quantity support
  const response = await fetch(`${STRAPI_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        rooms: orderData.rooms,
        bathrooms: orderData.bathrooms,
        property: orderData.property,
        // Ponech services relation pro kompatibilitu (bez quantity)
        services: orderData.additionalServices.map(
          (item) => item.service.documentId
        ),
        // NOVÉ: JSON pole s detailními informacemi včetně quantity
        orderedServices: orderedServices,
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
        eco: orderData.eco,
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

  // Uložit zákazníka do customers kolekce
  try {
    // Nejdříve zkontrolujeme, zda zákazník už existuje (podle emailu)
    const existingCustomerResponse = await fetch(
      `${STRAPI_URL}/api/customers?filters[emailAddress][$eq]=${orderData.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (existingCustomerResponse.ok) {
      const existingCustomers = await existingCustomerResponse.json();
      const customers = existingCustomers.data || [];

      if (customers.length === 0) {
        // Zákazník neexistuje, vytvoříme nového
        const createCustomerResponse = await fetch(
          `${STRAPI_URL}/api/customers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: orderData.name,
                emailAddress: orderData.email,
                phoneNumber: orderData.phone,
              },
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully");
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - neděláme nic, jen log
        console.log(
          "Customer already exists, skipping customer creation/update"
        );
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky
  try {
    const emailResponse = await fetch(`/api/send-order-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        displayTitle: result.data?.displayTitle, // Správná cesta k displayTitle
        orderedServices: orderedServices, // Přidáno pro email
      }),
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

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
        property: orderData.property,
        // Ponech services relation pro kompatibilitu (bez quantity)
        services: orderData.additionalServices.map(
          (item) => item.service.documentId
        ),
        // Zjednodušené JSON pole - jen název služby a quantity
        orderedServices: orderedServices,
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
        eco: orderData.eco,
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

  // Uložit zákazníka do customers kolekce
  try {
    // Nejdříve zkontrolujeme, zda zákazník už existuje (podle emailu)
    const existingCustomerResponse = await fetch(
      `${STRAPI_URL}/api/customers?filters[emailAddress][$eq]=${orderData.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (existingCustomerResponse.ok) {
      const existingCustomers = await existingCustomerResponse.json();
      const customers = existingCustomers.data || [];

      if (customers.length === 0) {
        // Zákazník neexistuje, vytvoříme nového
        const createCustomerResponse = await fetch(
          `${STRAPI_URL}/api/customers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                name: orderData.name,
                emailAddress: orderData.email,
                phoneNumber: orderData.phone,
              },
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully");
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - neděláme nic, jen log
        console.log(
          "Customer already exists, skipping customer creation/update"
        );
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky
  try {
    const emailResponse = await fetch(`/api/send-order-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...orderData,
        displayTitle: result.data?.displayTitle,
        orderedServices: orderedServices, // Přidáno pro email
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email notifications");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
  }

  return result.data;
}