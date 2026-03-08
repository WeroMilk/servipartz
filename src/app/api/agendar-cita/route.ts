import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { sendEmail, escapeHtml } from "@/lib/email";

interface Body {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();
    const { name, phone, address, date, time, message } = body;

    if (!name?.trim() || !phone?.trim() || !address?.trim() || !date || !time) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeAddress = escapeHtml(address.trim());
    const safeMessage = message ? escapeHtml(message.trim()) : "";

    const emailHtml = `
      <h2>Nueva solicitud de cita - Servipartz</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Teléfono:</strong> ${safePhone}</p>
      <p><strong>Dirección:</strong> ${safeAddress}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Horario:</strong> ${time}</p>
      ${safeMessage ? `<p><strong>Descripción:</strong> ${safeMessage}</p>` : ""}
    `;

    const emailText = `Nueva cita - ${safeName}\nTel: ${safePhone}\nDirección: ${safeAddress}\nFecha: ${date} ${time}${safeMessage ? `\nDescripción: ${safeMessage}` : ""}`;

    const canSend =
      (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      process.env.RESEND_API_KEY;

    if (canSend) {
      const ok = await sendEmail({
        to: SITE.email,
        subject: `Cita solicitada - ${safeName} - ${date} ${time}`,
        html: emailHtml,
        text: emailText,
      });
      if (!ok) {
        return NextResponse.json({ error: "Error al enviar." }, { status: 500 });
      }
    } else {
      console.log("[Cita] Sin Gmail ni Resend configurados. Datos:", {
        name,
        phone,
        address,
        date,
        time,
        message,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
