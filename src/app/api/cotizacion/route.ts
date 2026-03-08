import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { sendEmail, escapeHtml } from "@/lib/email";

interface QuoteItem {
  product: { id: string; name: string; sku?: string; category: string };
  quantity: number;
}

interface Body {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  items: QuoteItem[];
}

export async function POST(request: NextRequest) {
  try {
    const body: Body = await request.json();
    const { name, email, phone, message, items } = body;

    if (!name?.trim() || !email?.trim() || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Faltan nombre, email o productos." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = phone ? escapeHtml(phone.trim()) : "";
    const safeMessage = message ? escapeHtml(message.trim()) : "";

    const list = items
      .map(
        (i) =>
          `- ${escapeHtml(i.product.name)}${i.product.sku ? ` (${escapeHtml(i.product.sku)})` : ""} x ${i.quantity}`
      )
      .join("\n");

    const emailHtml = `
      <h2>Nueva cotización - Servipartz</h2>
      <p><strong>Nombre:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      ${safePhone ? `<p><strong>Teléfono:</strong> ${safePhone}</p>` : ""}
      ${safeMessage ? `<p><strong>Comentarios:</strong> ${safeMessage}</p>` : ""}
      <h3>Productos solicitados:</h3>
      <pre>${list}</pre>
    `;

    const clientMessage = `Nos reportaremos a la brevedad. Estamos buscando tu pieza.`;

    const canSend =
      (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      process.env.RESEND_API_KEY;

    if (canSend) {
      const [okToStore, okToClient] = await Promise.all([
        sendEmail({
          to: SITE.email,
          replyTo: email,
          subject: `Cotización de ${safeName} - Servipartz`,
          html: emailHtml,
          text: `Nueva cotización - ${safeName}\nEmail: ${safeEmail}${safePhone ? `\nTel: ${safePhone}` : ""}${safeMessage ? `\nComentarios: ${safeMessage}` : ""}\n\nProductos:\n${list}`,
        }),
        sendEmail({
          to: email,
          subject: "Cotización recibida - Servipartz",
          html: `<p>Hola ${safeName},</p><p>${clientMessage}</p><p>Saludos,<br/>Servipartz</p>`,
          text: `Hola ${safeName},\n\n${clientMessage}\n\nSaludos,\nServipartz`,
        }),
      ]);
      if (!okToStore) {
        return NextResponse.json({ error: "Error al enviar correo." }, { status: 500 });
      }
      // okToClient se ignora: el cliente ya ve "enviado"; si falla el de confirmación se loguea
    } else {
      console.log("[Cotización] Sin Gmail ni Resend configurados. Datos recibidos:", {
        name,
        email,
        phone,
        items: list,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error interno." }, { status: 500 });
  }
}
