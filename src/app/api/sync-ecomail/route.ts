/*
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, frequency, action } = await request.json();

    console.log(`Syncing customer to Ecomail: ${action} - ${email} (${frequency})`);

    // Ecomail API konfigurace
    const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY;
    const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID;

    if (!ECOMAIL_API_KEY || !ECOMAIL_LIST_ID) {
      console.error("Missing Ecomail configuration - API_KEY or LIST_ID");
      return NextResponse.json(
        { success: false, error: "Missing Ecomail configuration" },
        { status: 500 }
      );
    }

    // Připrav data pro Ecomail
    const ecomailData = {
      subscriber_data: {
        email: email,
        name: name || "",
        phone: phone || "",
      },
      custom_fields: {
        FREQUENCY: frequency || "one-time",
        LAST_ORDER_DATE: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        ORDER_SOURCE: "website_order"
      },
      // Double opt-in je obvykle false pro objednávky
      trigger_autoresponders: true,
      update_existing: true, // Aktualizovat existující kontakt
    };

    console.log("Sending to Ecomail:", JSON.stringify(ecomailData, null, 2));

    // Volání Ecomail API
    const ecomailResponse = await fetch(
      `https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "key": ECOMAIL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ecomailData),
      }
    );

    const responseText = await ecomailResponse.text();
    console.log("Ecomail response:", ecomailResponse.status, responseText);

    if (ecomailResponse.ok) {
      console.log(`Customer ${email} successfully synced to Ecomail`);
      return NextResponse.json({
        success: true,
        message: "Customer synced to Ecomail successfully",
        ecomailResponse: responseText,
      });
    } else {
      console.error("Ecomail API error:", ecomailResponse.status, responseText);
      return NextResponse.json(
        {
          success: false,
          error: "Ecomail API error",
          details: responseText,
          status: ecomailResponse.status,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Ecomail sync error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync with Ecomail", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
  */

/*
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, frequency, action } = await request.json();

    console.log(`Syncing customer to Ecomail: ${action} - ${email} (${frequency})`);
    console.log("Customer data received:", { email, name, phone, frequency, action });

    // Ecomail API konfigurace
    const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY;
    const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID;

    if (!ECOMAIL_API_KEY || !ECOMAIL_LIST_ID) {
      console.error("Missing Ecomail configuration - API_KEY or LIST_ID");
      return NextResponse.json(
        { success: false, error: "Missing Ecomail configuration" },
        { status: 500 }
      );
    }

    // Připrav data pro Ecomail - zpět k funkční verzi
    const ecomailData = {
      subscriber_data: {
        email: email,
        name: name || "",
        phone: phone || "",
      },
      trigger_autoresponders: true,
      update_existing: true,
    };

    console.log("Sending to Ecomail:", JSON.stringify(ecomailData, null, 2));

    // Volání Ecomail API
    const ecomailResponse = await fetch(
      `https://api2.ecomailapp.cz/lists/${ECOMAIL_LIST_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "key": ECOMAIL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ecomailData),
      }
    );

    const responseText = await ecomailResponse.text();
    console.log("Ecomail response status:", ecomailResponse.status);
    console.log("Full Ecomail response body:", responseText);

    if (ecomailResponse.ok) {
      console.log(`Customer ${email} successfully synced to Ecomail`);
      return NextResponse.json({
        success: true,
        message: "Customer synced to Ecomail successfully",
        ecomailResponse: responseText,
      });
    } else {
      console.error("Ecomail API error:", ecomailResponse.status, responseText);
      return NextResponse.json(
        {
          success: false,
          error: "Ecomail API error",
          details: responseText,
          status: ecomailResponse.status,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Ecomail sync error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync with Ecomail", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
*/


import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone, frequency, action } = await request.json();

    console.log(`Syncing customer to Ecomail: ${action} - ${email} (${frequency})`);
    console.log("Customer data received:", { email, name, phone, frequency, action });

    // Ecomail API konfigurace
    const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY;
    const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID;

    if (!ECOMAIL_API_KEY || !ECOMAIL_LIST_ID) {
      console.error("Missing Ecomail configuration - API_KEY or LIST_ID");
      return NextResponse.json(
        { success: false, error: "Missing Ecomail configuration" },
        { status: 500 }
      );
    }

    // Mapování frequency na seznam ID
    const getListIdByFrequency = (frequency: string) => {
      switch (frequency) {
        case "weekly": return process.env.ECOMAIL_LIST_WEEKLY || process.env.ECOMAIL_LIST_ID;
        case "monthly": return process.env.ECOMAIL_LIST_MONTHLY || process.env.ECOMAIL_LIST_ID; 
        case "bi-weekly": return process.env.ECOMAIL_LIST_BIWEEKLY || process.env.ECOMAIL_LIST_ID;
        default: return process.env.ECOMAIL_LIST_ID; // fallback pro one-time
      }
    };

    const targetListId = getListIdByFrequency(frequency || "one-time");
    
    console.log(`Assigning customer to list ${targetListId} for frequency: ${frequency}`);

    // Při update - nejdřív odebrat ze všech ostatních seznamů
    if (action === "update") {
      const allListIds = [
        process.env.ECOMAIL_LIST_WEEKLY,
        process.env.ECOMAIL_LIST_MONTHLY, 
        process.env.ECOMAIL_LIST_BIWEEKLY
      ].filter(id => id && id !== targetListId); // Odfiltruj prázdné a cílový seznam

      // Odebrat ze všech ostatních seznamů
      for (const listId of allListIds) {
        try {
          await fetch(`https://api2.ecomailapp.cz/lists/${listId}/unsubscribe`, {
            method: "POST",
            headers: {
              "key": ECOMAIL_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          });
          console.log(`Unsubscribed ${email} from list ${listId}`);
        } catch (error) {
          console.log(`Failed to unsubscribe from list ${listId}:`, error);
        }
      }
    }

    // Připrav data pro cílový seznam
    const ecomailData = {
      subscriber_data: {
        email: email,
        name: name || "",
        phone: phone || "",
      },
      trigger_autoresponders: true,
      update_existing: true,
    };

    console.log("Sending to Ecomail:", JSON.stringify(ecomailData, null, 2));

    // Přidat do správného seznamu podle frequency
    const ecomailResponse = await fetch(
      `https://api2.ecomailapp.cz/lists/${targetListId}/subscribe`,
      {
        method: "POST",
        headers: {
          "key": ECOMAIL_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ecomailData),
      }
    );

    const responseText = await ecomailResponse.text();
    console.log("Ecomail response status:", ecomailResponse.status);
    console.log("Full Ecomail response body:", responseText);

    if (ecomailResponse.ok) {
      console.log(`Customer ${email} successfully synced to Ecomail list ${targetListId}`);
      return NextResponse.json({
        success: true,
        message: "Customer synced to Ecomail successfully",
        ecomailResponse: responseText,
      });
    } else {
      console.error("Ecomail API error:", ecomailResponse.status, responseText);
      return NextResponse.json(
        {
          success: false,
          error: "Ecomail API error",
          details: responseText,
          status: ecomailResponse.status,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Ecomail sync error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to sync with Ecomail", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}