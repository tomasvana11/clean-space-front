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
