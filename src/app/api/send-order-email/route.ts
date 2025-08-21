/*
import { NextRequest, NextResponse } from "next/server";
import { OrderFormData } from "@/lib/types/order";

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderFormData = await request.json();

    // Email pro tebe (admin)
    const adminEmailData = {
      to: process.env.ADMIN_EMAIL || "admin@cleanspace.com",
      subject: `Nova objednavka - ${orderData.location?.region}`,
      html: `
        <h2>Nova objednavka</h2>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Cas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Lokace:</strong> ${orderData.location?.region}</p>
        <p><strong>Pokoje:</strong> ${orderData.rooms}</p>
        <p><strong>Koupelny:</strong> ${orderData.bathrooms}</p>
        <p><strong>Dodatecne sluzby:</strong> ${
          orderData.additionalServices.map((s) => s.title).join(", ") || "Zadne"
        }</p>
        <p><strong>Celkova cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na zakaznika:</h3>
        <p><strong>Jmeno:</strong> ${orderData.name}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Telefon:</strong> ${orderData.phone}</p>
        <p><strong>Adresa:</strong> ${orderData.address}</p>
        <p><strong>Platba:</strong> ${
          orderData.paymentMethod === "bankTransfer"
            ? "Bankovni prevod"
            : "Karta"
        }</p>
      `,
    };

    // Email pro zakaznika
    const customerEmailData = {
      to: orderData.email,
      subject: "Potvrzeni objednavky - CleanSpace",
      html: `
        <h2>Dekujeme za vasi objednavku!</h2>
        <p>Vase objednavka byla uspesne prijata.</p>
        
        <h3>Detaily objednavky:</h3>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Cas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Lokace:</strong> ${orderData.location?.region}</p>
        <p><strong>Celkova cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na podporu:</h3>
        <p><strong>Email:</strong> support@cleanspace.com</p>
        <p><strong>Telefon:</strong> +357 99 123 456</p>
        
        <p>Ozveme se vam brzy s dalsimi informacemi.</p>
        <p>CleanSpace Team</p>
      `,
    };

    // Poslat emaily (zatim jen log)
    console.log("\n=== ADMIN EMAIL ===");
    console.log("To:", adminEmailData.to);
    console.log("Subject:", adminEmailData.subject);
    console.log("Content:", adminEmailData.html);

    console.log("\n=== CUSTOMER EMAIL ===");
    console.log("To:", customerEmailData.to);
    console.log("Subject:", customerEmailData.subject);
    console.log("Content:", customerEmailData.html);

    // TODO: Integrace s email servisem (Resend, SendGrid, Nodemailer, atd.)
    // await sendEmail(adminEmailData);
    // await sendEmail(customerEmailData);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
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
import { Resend } from "resend";
import { OrderFormData } from "@/lib/types/order";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderFormData = await request.json();

    // Email pro tebe (admin)
    const adminEmailData = {
      from: "onboarding@resend.dev", // Resend testovací doména
      to: [process.env.ADMIN_EMAIL || "admin@cleanspace.com"],
      subject: `Nova objednavka - ${orderData.location?.region}`,
      html: `
        <h2>Nova objednavka</h2>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Cas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Lokace:</strong> ${orderData.location?.region}</p>
        <p><strong>Pokoje:</strong> ${orderData.rooms}</p>
        <p><strong>Koupelny:</strong> ${orderData.bathrooms}</p>
        <p><strong>Dodatecne sluzby:</strong> ${
          orderData.additionalServices.map((s) => s.title).join(", ") || "Zadne"
        }</p>
        <p><strong>Celkova cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na zakaznika:</h3>
        <p><strong>Jmeno:</strong> ${orderData.name}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Telefon:</strong> ${orderData.phone}</p>
        <p><strong>Adresa:</strong> ${orderData.address}</p>
        <p><strong>Platba:</strong> ${
          orderData.paymentMethod === "bankTransfer"
            ? "Bankovni prevod"
            : "Karta"
        }</p>
      `,
    };

    // Email pro zakaznika
    const customerEmailData = {
      from: "onboarding@resend.dev", // Resend testovací doména
      to: [orderData.email],
      subject: "Potvrzeni objednavky - CleanSpace",
      html: `
        <h2>Dekujeme za vasi objednavku!</h2>
        <p>Vase objednavka byla uspesne prijata.</p>
        
        <h3>Detaily objednavky:</h3>
        <p><strong>Datum:</strong> ${orderData.date}</p>
        <p><strong>Cas:</strong> ${getTimeSlotText(orderData.timeSlot)}</p>
        <p><strong>Lokace:</strong> ${orderData.location?.region}</p>
        <p><strong>Celkova cena:</strong> ${orderData.totalPrice} EUR</p>
        
        <h3>Kontakt na podporu:</h3>
        <p><strong>Email:</strong> support@cleanspace.com</p>
        <p><strong>Telefon:</strong> +357 99 123 456</p>
        
        <p>Ozveme se vam brzy s dalsimi informacemi.</p>
        <p>CleanSpace Team</p>
      `,
    };

    // Poslat emaily skutečně
    console.log("Sending admin email to:", adminEmailData.to);
    console.log("Sending customer email to:", customerEmailData.to);

    const adminResult = await resend.emails.send(adminEmailData);
    console.log("Admin email result:", adminResult);

    const customerResult = await resend.emails.send(customerEmailData);
    console.log("Customer email result:", customerResult);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      adminEmailId: adminResult.data?.id,
      customerEmailId: customerResult.data?.id,
      adminResult: adminResult,
      customerResult: customerResult,
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
