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

    // Email pro admin
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
        <p><strong>Počet pokojů:</strong> ${orderData.rooms}</p>
        <p><strong>Počet koupelen:</strong> ${orderData.bathrooms}</p>
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

    // Email pro zakaznika
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

    // Email pro admin - AKTUALIZOVÁNO pro eco
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

    // Email pro zakaznika - AKTUALIZOVÁNO pro eco
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
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OrderFormData } from "@/lib/types/order";

// Helper functions - MOVED TO TOP
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

function getPropertyTypeText(propertyType: "flat" | "house"): string {
  switch (propertyType) {
    case "flat":
      return "Byt";
    case "house":
      return "Dům";
    default:
      return propertyType;
  }
}

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
*/


/*
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OrderFormData } from "@/lib/types/order";

// Helper functions - MOVED TO TOP
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

function getPropertyTypeText(propertyType: "flat" | "house"): string {
  switch (propertyType) {
    case "flat":
      return "Byt";
    case "house":
      return "Dům";
    default:
      return propertyType;
  }
}

function formatAdditionalServices(services: any[]): string {
  if (!services || services.length === 0) {
    return "Žádné";
  }
  
  return services.map(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    
    if (quantity > 1) {
      return `${service.title} (${quantity}x - ${service.price * quantity} EUR)`;
    }
    return `${service.title} (${service.price} EUR)`;
  }).join(", ");
}

function formatAdditionalServicesDetailed(services: any[]): string {
  if (!services || services.length === 0) {
    return "<p>Žádné dodatečné služby</p>";
  }
  
  let html = "<h4>Dodatečné služby:</h4><ul>";
  services.forEach(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    const totalPrice = service.price * quantity;
    
    html += `<li><strong>${service.title}</strong>`;
    if (quantity > 1) {
      html += ` - ${quantity}x (${service.price} EUR/ks)`;
    }
    html += ` - Celkem: ${totalPrice} EUR</li>`;
  });
  html += "</ul>";
  
  return html;
}

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

    console.log("Received order data:", JSON.stringify(orderData, null, 2));

    // Email pro admin - AKTUALIZOVÁNO s lepším formátováním služeb
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
        <p><strong>Příplatkové služby:</strong> ${formatAdditionalServices(
          orderData.additionalServices
        )}</p>
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
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

        <h3>Úplná data objednávky (pro debug):</h3>
        <pre>${JSON.stringify(orderData, null, 2)}</pre>
      `,
    };

    // Email pro zakaznika - AKTUALIZOVÁNO s lepším formátováním služeb
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
        <p><strong>Počet pokojů:</strong> ${orderData.rooms}</p>
        <p><strong>Počet koupelen:</strong> ${orderData.bathrooms}</p>
        ${
          orderData.eco
            ? "<p><strong>Eco-friendly prostředky:</strong> ANO (+50 EUR)</p>"
            : ""
        }
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
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
    console.log("Additional services:", orderData.additionalServices);

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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error details:", errorMessage);
    if (errorStack) {
      console.error("Stack trace:", errorStack);
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to send emails", details: errorMessage },
      { status: 500 }
    );
  }
}
  */


/*

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OrderFormData } from "@/lib/types/order";

// Helper functions - MOVED TO TOP
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

function getPropertyTypeText(propertyType: "flat" | "house"): string {
  switch (propertyType) {
    case "flat":
      return "Byt";
    case "house":
      return "Dům";
    default:
      return propertyType;
  }
}

function getFrequencyText(frequency: string): string {
  switch (frequency) {
    case "weekly":
      return "Týdně";
    case "bi-weekly":
      return "Každé 2 týdny";
    case "monthly":
      return "Měsíčně";
    case "one-time":
    default:
      return "Jednorázově";
  }
}

function formatAdditionalServices(services: any[]): string {
  if (!services || services.length === 0) {
    return "Žádné";
  }
  
  return services.map(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    
    if (quantity > 1) {
      return `${service.title} (${quantity}x - ${service.price * quantity} EUR)`;
    }
    return `${service.title} (${service.price} EUR)`;
  }).join(", ");
}

function formatAdditionalServicesDetailed(services: any[]): string {
  if (!services || services.length === 0) {
    return "<p>Žádné dodatečné služby</p>";
  }
  
  let html = "<h4>Dodatečné služby:</h4><ul>";
  services.forEach(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    const totalPrice = service.price * quantity;
    
    html += `<li><strong>${service.title}</strong>`;
    if (quantity > 1) {
      html += ` - ${quantity}x (${service.price} EUR/ks)`;
    }
    html += ` - Celkem: ${totalPrice} EUR</li>`;
  });
  html += "</ul>";
  
  return html;
}

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

    console.log("Received order data:", JSON.stringify(orderData, null, 2));

    const hasDiscount = orderData.discountPercentage && orderData.discountPercentage > 0;
    const discountAmount = hasDiscount ? Math.round(((orderData.originalPrice || 0) * (orderData.discountPercentage || 0)) / 100) : 0;

    // Email pro admin - AKTUALIZOVÁNO s frequency informacemi
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
        <p><strong>Frekvence úklidu:</strong> ${getFrequencyText(orderData.frequency || "one-time")}</p>
        ${hasDiscount ? `
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin: 0 0 10px 0;">Sleva za pravidelný úklid:</h4>
            <p style="margin: 5px 0;"><strong>Původní cena:</strong> ${orderData.originalPrice} EUR</p>
            <p style="margin: 5px 0; color: #059669;"><strong>Sleva (${orderData.discountPercentage}%):</strong> -${discountAmount} EUR</p>
          </div>
        ` : ""}
        <p><strong>Příplatkové služby:</strong> ${formatAdditionalServices(
          orderData.additionalServices
        )}</p>
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
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

        <h3>Úplná data objednávky (pro debug):</h3>
        <pre>${JSON.stringify(orderData, null, 2)}</pre>
      `,
    };

    // Email pro zakaznika - AKTUALIZOVÁNO s frequency informacemi
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
        <p><strong>Počet pokojů:</strong> ${orderData.rooms}</p>
        <p><strong>Počet koupelen:</strong> ${orderData.bathrooms}</p>
        <p><strong>Frekvence úklidu:</strong> ${getFrequencyText(orderData.frequency || "one-time")}</p>
        ${
          orderData.eco
            ? "<p><strong>Eco-friendly prostředky:</strong> ANO (+50 EUR)</p>"
            : ""
        }
        ${hasDiscount ? `
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin: 0 0 10px 0;">Vaše sleva za pravidelný úklid:</h4>
            <p style="margin: 5px 0;"><strong>Původní cena:</strong> ${orderData.originalPrice} EUR</p>
            <p style="margin: 5px 0; color: #059669;"><strong>Sleva (${orderData.discountPercentage}%):</strong> -${discountAmount} EUR</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Sleva se aplikuje při každém úklidu podle zvolené frekvence.</p>
          </div>
        ` : ""}
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
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
    console.log("Frequency:", orderData.frequency);
    console.log("Discount:", orderData.discountPercentage, "%");
    console.log("Original price:", orderData.originalPrice);
    console.log("Final price:", orderData.totalPrice);

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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error details:", errorMessage);
    if (errorStack) {
      console.error("Stack trace:", errorStack);
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to send emails", details: errorMessage },
      { status: 500 }
    );
  }
}
  */

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { OrderFormData } from "@/lib/types/order";

// Helper functions - MOVED TO TOP
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

function getPropertyTypeText(propertyType: "flat" | "house"): string {
  switch (propertyType) {
    case "flat":
      return "Byt";
    case "house":
      return "Dům";
    default:
      return propertyType;
  }
}

function getFrequencyText(frequency: string): string {
  switch (frequency) {
    case "weekly":
      return "Týdně";
    case "bi-weekly":
      return "Každé 2 týdny";
    case "monthly":
      return "Měsíčně";
    case "one-time":
    default:
      return "Jednorázově";
  }
}

function formatAdditionalServices(services: any[]): string {
  if (!services || services.length === 0) {
    return "Žádné";
  }
  
  return services.map(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    
    if (quantity > 1) {
      return `${service.title} (${quantity}x - ${service.price * quantity} EUR)`;
    }
    return `${service.title} (${service.price} EUR)`;
  }).join(", ");
}

function formatAdditionalServicesDetailed(services: any[]): string {
  if (!services || services.length === 0) {
    return "<p>Žádné dodatečné služby</p>";
  }
  
  let html = "<h4>Dodatečné služby:</h4><ul>";
  services.forEach(serviceItem => {
    const service = serviceItem.service;
    const quantity = serviceItem.quantity;
    const totalPrice = service.price * quantity;
    
    html += `<li><strong>${service.title}</strong>`;
    if (quantity > 1) {
      html += ` - ${quantity}x (${service.price} EUR/ks)`;
    }
    html += ` - Celkem: ${totalPrice} EUR</li>`;
  });
  html += "</ul>";
  
  return html;
}

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

    console.log("Received order data:", JSON.stringify(orderData, null, 2));

    const hasDiscount = orderData.discountPercentage && orderData.discountPercentage > 0;
    const discountAmount = hasDiscount ? Math.round(((orderData.originalPrice || 0) * (orderData.discountPercentage || 0)) / 100) : 0;
    const isCardPayment = orderData.paymentMethod === 'card';

    // Email pro admin - obsahuje vždy všechny detaily včetně Stripe Payment Intent ID
    const adminEmailData = {
      from: "info@cleanspace.eu.com",
      to: [
        process.env.ADMIN_EMAIL || "cleanspace9025@gmail.com",
        "cleanspace9025@gmail.com",
      ],
      subject: `Cleanspace: Nová objednávka - ${orderData.location?.region}${isCardPayment ? ' [ZAPLACENO KARTOU]' : ''}`,
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
        <p><strong>Frekvence úklidu:</strong> ${getFrequencyText(orderData.frequency || "one-time")}</p>
        ${hasDiscount ? `
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin: 0 0 10px 0;">Sleva za pravidelný úklid:</h4>
            <p style="margin: 5px 0;"><strong>Původní cena:</strong> ${orderData.originalPrice} EUR</p>
            <p style="margin: 5px 0; color: #059669;"><strong>Sleva (${orderData.discountPercentage}%):</strong> -${discountAmount} EUR</p>
          </div>
        ` : ""}
        <p><strong>Příplatkové služby:</strong> ${formatAdditionalServices(
          orderData.additionalServices
        )}</p>
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
        <p><strong>Celková cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na zákazníka:</h3>
        <p><strong>Jméno:</strong> ${orderData.name}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Telefon:</strong> ${orderData.phone}</p>
        <p><strong>Adresa:</strong> ${orderData.address}</p>
        
        <div style="background-color: ${isCardPayment ? '#dcfce7' : '#fef3c7'}; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <h4 style="color: ${isCardPayment ? '#15803d' : '#92400e'}; margin: 0 0 10px 0;">Platba:</h4>
          <p style="margin: 5px 0;"><strong>Metoda:</strong> ${
            isCardPayment ? "Karta (ZAPLACENO)" : "Bankovní převod"
          }</p>
          ${isCardPayment && orderData.stripePaymentIntentId ? `
            <p style="margin: 5px 0;"><strong>Stripe Payment Intent ID:</strong> ${orderData.stripePaymentIntentId}</p>
            <p style="margin: 5px 0; color: #15803d;"><strong>Status:</strong> Platba byla úspěšně zpracována</p>
          ` : ''}
        </div>

        <h3>Úplná data objednávky (pro debug):</h3>
        <pre>${JSON.stringify(orderData, null, 2)}</pre>
      `,
    };

    // Email pro zákazníka - rozlišuje platební metody
    const customerEmailData = {
      from: "info@cleanspace.eu.com",
      to: orderData.email,
      subject: isCardPayment 
        ? "Potvrzení platby a objednávky - Cleanspace" 
        : "Potvrzení objednávky - Cleanspace",
      html: `
        <h2>Děkujeme za vaši objednávku!</h2>
        <p>${isCardPayment 
          ? "Vaše platba byla úspěšně zpracována a objednávka byla automaticky potvrzena." 
          : "Vaše objednávka byla úspěšně přijata."
        }</p>

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
        <p><strong>Počet pokojů:</strong> ${orderData.rooms}</p>
        <p><strong>Počet koupelen:</strong> ${orderData.bathrooms}</p>
        <p><strong>Frekvence úklidu:</strong> ${getFrequencyText(orderData.frequency || "one-time")}</p>
        ${
          orderData.eco
            ? "<p><strong>Eco-friendly prostředky:</strong> ANO (+50 EUR)</p>"
            : ""
        }
        ${hasDiscount ? `
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h4 style="color: #0369a1; margin: 0 0 10px 0;">Vaše sleva za pravidelný úklid:</h4>
            <p style="margin: 5px 0;"><strong>Původní cena:</strong> ${orderData.originalPrice} EUR</p>
            <p style="margin: 5px 0; color: #059669;"><strong>Sleva (${orderData.discountPercentage}%):</strong> -${discountAmount} EUR</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">Sleva se aplikuje při každém úklidu podle zvolené frekvence.</p>
          </div>
        ` : ""}
        ${formatAdditionalServicesDetailed(orderData.additionalServices)}
        <p><strong>Celková cena:</strong> ${orderData.totalPrice} EUR</p>

        ${isCardPayment ? `
          <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <h3 style="color: #15803d; margin: 0 0 10px 0;">✓ Platba dokončena</h3>
            <p style="margin: 5px 0;">Vaša platba kartou byla úspěšně zpracována.</p>
            <p style="margin: 5px 0;">Objednávka je automaticky potvrzena a připravena k realizaci.</p>
          </div>
        ` : `
          <h3>Údaje k platbě:</h3>
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Příjemce:</strong> CLEANSPACE</p>
            <p><strong>Měna:</strong> EUR</p>
            <p><strong>IBAN:</strong> LT58 3250 0757 8953 6123</p>
            <p><strong>BIC:</strong> REVOLT21</p>
            <p><strong>Zpráva pro příjemce:</strong> ${
              orderData.displayTitle || "Číslo vaší objednávky"
            }</p>
            <p style="margin-top: 10px; font-size: 14px; color: #92400e;">
              <strong>Pozor:</strong> Objednávka bude potvrzena až po přijetí platby.
            </p>
          </div>
        `}

        <h3>Kontakt na podporu:</h3>
        <p><strong>Email:</strong> info@cleanspace.eu.com</p>
        <p><strong>Telefon:</strong> +357 99 123 456</p>

        <p>${isCardPayment 
          ? "Brzy se vám ozveme s potvrzením termínu a dalšími informacemi." 
          : "Ozveme se vám brzy s dalšími informacemi."
        }</p>
        <p>CleanSpace Team</p>
      `,
    };

    // Poslat emaily
    console.log("Sending admin email to:", adminEmailData.to);
    console.log("Sending customer email to:", customerEmailData.to);
    console.log("Payment method:", orderData.paymentMethod);
    console.log("Order number:", orderData.displayTitle);
    console.log("Stripe Payment Intent ID:", orderData.stripePaymentIntentId);

    const adminResult = await transporter.sendMail(adminEmailData);
    console.log("Admin email result:", adminResult);

    const customerResult = await transporter.sendMail(customerEmailData);
    console.log("Customer email result:", customerResult);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      adminEmailId: adminResult.messageId,
      customerEmailId: customerResult.messageId,
      paymentMethod: orderData.paymentMethod,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("Error details:", errorMessage);
    if (errorStack) {
      console.error("Stack trace:", errorStack);
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to send emails", details: errorMessage },
      { status: 500 }
    );
  }
}