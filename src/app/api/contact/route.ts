import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/lib/strapi";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== EMAIL DEBUG ===");
    console.log("Resend API Key exists:", !!process.env.RESEND_API_KEY);
    console.log("From email:", process.env.RESEND_FROM_EMAIL);
    console.log("To email:", process.env.RESEND_TO_EMAIL);

    // 1. Ulož do Strapi
    const strapiResponse = await strapiApi.post("/contact-forms", {
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message,
      },
    });

    console.log("Strapi save successful, sending email...");

    // 2. Pošli email přes Resend
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "tomasvana03@gmail.com",
      subject: `Nový dotaz z webu od ${body.name}`,
      text: `
        Nový dotaz z webu cleanspace.eu.com
        Jméno: ${body.name}
        Email: ${body.email}
        Telefon: ${body.phone || "Neuvedeno"}
        Zpráva:${body.message}
        `,
      html: `
        <h2>Nový dotaz z kontaktního formuláře</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Jméno:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <strong>${body.email}</strong></p>
          <p><strong>Telefon:</strong> ${body.phone || "Neuvedeno"}</p>
          <p><strong>Zpráva:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${body.message.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          Odesláno z webu cleanspace.eu.com dne ${new Date().toLocaleString(
            "cs-CZ"
          )}
        </p>
      `,
    });

    console.log("Email result:", emailResult);

    return NextResponse.json({
      success: true,
      message: "Form submitted and email sent successfully",
      emailId: emailResult.data?.id,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form or send email" },
      { status: 500 }
    );
  }
}
