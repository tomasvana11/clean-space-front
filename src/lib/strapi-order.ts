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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav pricing data s frequency informacemi
  const pricingData = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    frequency: orderData.frequency || "one-time",
    discountPercentage: orderData.discountPercentage || 0,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    ecoSurcharge: orderData.eco ? 50 : 0,
    baseRoomPrice: 0, // Můžeš dopočítat základní cenu bez služeb
    additionalServicesTotal: orderData.additionalServices.reduce(
      (sum, item) => sum + ((item.service.price || 0) * item.quantity), 0
    )
  };

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
        // NOVÉ: Pricing informace s frequency
        pricingData: pricingData,
        // Individual frequency fields pro snazší filtrování v Strapi
        frequency: orderData.frequency || "one-time",
        originalPrice: orderData.originalPrice || orderData.totalPrice,
        discountPercentage: orderData.discountPercentage || 0,
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

  // Poslat email notifikace s číslem objednávky a pricing daty
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
        pricingData: pricingData, // Přidáno pricing data pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav pricing data s frequency informacemi
  const pricingData = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    frequency: orderData.frequency || "one-time",
    discountPercentage: orderData.discountPercentage || 0,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    ecoSurcharge: orderData.eco ? 50 : 0,
    baseRoomPrice: 0, // Můžeš dopočítat základní cenu bez služeb
    additionalServicesTotal: orderData.additionalServices.reduce(
      (sum, item) => sum + ((item.service.price || 0) * item.quantity), 0
    )
  };

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
        // NOVÉ: Pricing informace s frequency
        pricingData: pricingData,
        // Individual frequency fields pro snazší filtrování v Strapi
        frequency: orderData.frequency || "one-time",
        originalPrice: orderData.originalPrice || orderData.totalPrice,
        discountPercentage: orderData.discountPercentage || 0,
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

  // Poslat email notifikace s číslem objednávky a pricing daty
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email notifications");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
  }

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

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        const updateCustomerResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          }
        );

        if (updateCustomerResponse.ok) {
          console.log(`Customer updated successfully. Frequency changed from ${existingCustomer.frequency || 'unknown'} to ${orderData.frequency}`);
        } else {
          const errorData = await updateCustomerResponse.json().catch(() => null);
          console.error("Failed to update customer:", updateCustomerResponse.status, errorData);
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník existuje - smažeme starý a vytvoříme nový (upsert)
        const existingCustomer = customers[0];
        
        // Smazat starý záznam
        const deleteResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (deleteResponse.ok) {
          // Vytvořit nový s aktualizovanými daty
          const createResponse = await fetch(
            `${STRAPI_URL}/api/customers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: customerData,
              }),
            }
          );

          if (createResponse.ok) {
            console.log(`Customer recreated with frequency: ${orderData.frequency}`);
          } else {
            console.error("Failed to recreate customer");
          }
        } else {
          console.error("Failed to delete existing customer");
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        console.log("Existing customer:", existingCustomer);
        
        // Zkus různé varianty UPDATE URL
        const updateUrls = [
          `${STRAPI_URL}/api/customers/${existingCustomer.id}`,
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
        ];
        
        let updateSuccess = false;
        
        for (const url of updateUrls) {
          console.log("Trying update URL:", url);
          
          const updateResponse = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          });
          
          if (updateResponse.ok) {
            console.log(`Customer updated successfully using ${url}`);
            updateSuccess = true;
            break;
          } else {
            console.log(`Failed with ${url}:`, updateResponse.status);
          }
        }
        
        if (!updateSuccess) {
          console.log("All update attempts failed, falling back to create new record");
          // Fallback - vytvoř nový záznam
          const createResponse = await fetch(
            `${STRAPI_URL}/api/customers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: customerData,
              }),
            }
          );
          
          if (createResponse.ok) {
            console.log("Fallback: New customer record created");
          }
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        console.log("Updating existing customer with new frequency:", orderData.frequency);
        
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          }
        );
        
        if (updateResponse.ok) {
          console.log(`Customer updated successfully. Frequency: ${orderData.frequency}`);
        } else {
          console.error("Failed to update customer:", updateResponse.status);
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        console.log("Updating existing customer with new frequency:", orderData.frequency);
        
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          }
        );
        
        if (updateResponse.ok) {
          console.log(`Customer updated successfully. Frequency: ${orderData.frequency}`);
          
          // Sync s Ecomail
          try {
            const ecomailResponse = await fetch(`/api/sync-ecomail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
                frequency: orderData.frequency,
                action: "update"
              })
            });
            
            if (ecomailResponse.ok) {
              console.log("Customer updated in Ecomail successfully");
            } else {
              console.error("Failed to update customer in Ecomail");
            }
          } catch (ecomailError) {
            console.error("Ecomail update error:", ecomailError);
          }
        } else {
          console.error("Failed to update customer:", updateResponse.status);
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav zjednodušená data pro orderedServices JSON pole (jen název a quantity)
  const orderedServices = orderData.additionalServices.map(item => ({
    serviceName: item.service.title,
    quantity: item.quantity
  }));

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

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
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
          
          // Sync s Ecomail pro nového customera
          try {
            const ecomailResponse = await fetch(`/api/sync-ecomail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
                frequency: orderData.frequency,
                action: "create"
              })
            });
            
            if (ecomailResponse.ok) {
              console.log("Customer created in Ecomail successfully");
            } else {
              console.error("Failed to create customer in Ecomail");
            }
          } catch (ecomailError) {
            console.error("Ecomail create error:", ecomailError);
          }
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        console.log("Updating existing customer with new frequency:", orderData.frequency);
        
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          }
        );
        
        if (updateResponse.ok) {
          console.log(`Customer updated successfully. Frequency: ${orderData.frequency}`);
          
          // Sync s Ecomail
          try {
            const ecomailResponse = await fetch(`/api/sync-ecomail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
                frequency: orderData.frequency,
                action: "update"
              })
            });
            
            if (ecomailResponse.ok) {
              console.log("Customer updated in Ecomail successfully");
            } else {
              console.error("Failed to update customer in Ecomail");
            }
          } catch (ecomailError) {
            console.error("Ecomail update error:", ecomailError);
          }
        } else {
          console.error("Failed to update customer:", updateResponse.status);
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
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

  // Připrav detailedInfo JSON s pricing a frequency informacemi
  const detailedInfo = {
    originalPrice: orderData.originalPrice || orderData.totalPrice,
    finalPrice: orderData.totalPrice,
    discountAmount: orderData.originalPrice ? (orderData.originalPrice - orderData.totalPrice) : 0,
    frequency: orderData.frequency || "one-time"
  };

  // Určení order status na základě platební metody
  let orderStatus = "pending";
  if (orderData.paymentMethod === "card" && orderData.stripePaymentIntentId) {
    orderStatus = "confirmed"; // Automaticky potvrzeno pro úspěšné Stripe platby
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
        property: orderData.property,
        // Ponech services relation pro kompatibilitu (bez quantity)
        services: orderData.additionalServices.map(
          (item) => item.service.documentId
        ),
        // Zjednodušené JSON pole - jen název služby a quantity
        orderedServices: orderedServices,
        // NOVÉ: Detailed info s pricing a frequency
        detailedInfo: detailedInfo,
        location: orderData.location?.documentId,
        date: orderData.date,
        timeSlot: orderData.timeSlot,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod,
        orderStatus: orderStatus, // Dynamický status místo pevného "pending"
        totalPrice: orderData.totalPrice,
        eco: orderData.eco,
        // Stripe specific pole
        stripePaymentIntentId: orderData.stripePaymentIntentId || null,
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

  // Uložit/aktualizovat zákazníka do customers kolekce
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

      const customerData = {
        name: orderData.name,
        emailAddress: orderData.email,
        phoneNumber: orderData.phone,
        frequency: orderData.frequency || "one-time",
      };

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
              data: customerData,
            }),
          }
        );

        if (createCustomerResponse.ok) {
          console.log("Customer created successfully with frequency:", orderData.frequency);
          
          // Sync s Ecomail pro nového customera
          try {
            const ecomailResponse = await fetch(`/api/sync-ecomail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
                frequency: orderData.frequency,
                action: "create"
              })
            });
            
            if (ecomailResponse.ok) {
              console.log("Customer created in Ecomail successfully");
            } else {
              console.error("Failed to create customer in Ecomail");
            }
          } catch (ecomailError) {
            console.error("Ecomail create error:", ecomailError);
          }
        } else {
          console.error("Failed to create customer");
        }
      } else {
        // Zákazník už existuje - aktualizujeme jeho frequency
        const existingCustomer = customers[0];
        console.log("Updating existing customer with new frequency:", orderData.frequency);
        
        const updateResponse = await fetch(
          `${STRAPI_URL}/api/customers/${existingCustomer.documentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: customerData,
            }),
          }
        );
        
        if (updateResponse.ok) {
          console.log(`Customer updated successfully. Frequency: ${orderData.frequency}`);
          
          // Sync s Ecomail
          try {
            const ecomailResponse = await fetch(`/api/sync-ecomail`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: orderData.email,
                name: orderData.name,
                phone: orderData.phone,
                frequency: orderData.frequency,
                action: "update"
              })
            });
            
            if (ecomailResponse.ok) {
              console.log("Customer updated in Ecomail successfully");
            } else {
              console.error("Failed to update customer in Ecomail");
            }
          } catch (ecomailError) {
            console.error("Ecomail update error:", ecomailError);
          }
        } else {
          console.error("Failed to update customer:", updateResponse.status);
        }
      }
    }
  } catch (customerError) {
    console.error("Customer saving error:", customerError);
    // Chyba při ukládání zákazníka neovlivní celkovou objednávku
  }

  // Poslat email notifikace s číslem objednávky a detailed info
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
        detailedInfo: detailedInfo, // Přidáno detailed info pro email
      }),
    });

    if (!emailResponse.ok) {
      console.error("Failed to send email notifications");
    } else {
      console.log("Email notifications sent successfully");
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
  }

  return result.data;
}