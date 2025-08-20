import { NextRequest, NextResponse } from "next/server";
import { strapiApi } from "@/lib/strapi";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("=== CAREER FORM DEBUG ===");
    console.log("Career application data:", body);

    // 1. Ulož do Strapi
    const strapiResponse = await strapiApi.post("/career-applications", {
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });

    console.log("Strapi save successful, sending email...");

    // 2. Pošli email přes Resend
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Cleanspace@resend.dev",
      to: process.env.RESEND_TO_EMAIL || "cleanspace9025@gmail.com",
      subject: `Nová žádost o práci od ${body.name}`,
      html: `
        <h2>Nová žádost o zaměstnání</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Jméno:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${
        body.email
      }</a></p>
          <p><strong>Telefon:</strong> <a href="tel:${body.phone}">${
        body.phone
      }</a></p>
        </div>
        <p style="color: #666; font-size: 12px;">
          Odesláno z webu cleanspace.eu.com dne ${new Date().toLocaleString(
            "cs-CZ"
          )}
        </p>
      `,
    });

    console.log("Career email result:", emailResult);

    return NextResponse.json({
      success: true,
      message: "Career application submitted and email sent successfully",
      emailId: emailResult.data?.id,
    });
  } catch (error) {
    console.error("Career form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit career application" },
      { status: 500 }
    );
  }
}
