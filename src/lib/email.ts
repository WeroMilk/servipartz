/**
 * Envío de correos: Gmail (Nodemailer) o Resend.
 * - Transporter Gmail reutilizado (más eficiente).
 * - Timeout para no bloquear.
 * - Opción de texto plano para mejor deliverability.
 */

import type { Transporter } from "nodemailer";

const EMAIL_TIMEOUT_MS = 15_000;

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  /** Versión texto plano (recomendado para menos spam) */
  text?: string;
  replyTo?: string;
  fromName?: string;
}

const toArray = (x: string | string[]) => (Array.isArray(x) ? x : [x]);

let gmailTransporter: Transporter | null = null;

async function getGmailTransporter(): Promise<Transporter | null> {
  const rawUser = process.env.GMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASSWORD;
  const user = rawUser?.trim();
  const pass = rawPass?.trim();
  if (!user || !pass) {
    console.error(
      "[Email Gmail] GMAIL_USER o GMAIL_APP_PASSWORD vacíos o sin configurar."
    );
    return null;
  }

  if (gmailTransporter) return gmailTransporter;

  const nodemailer = await import("nodemailer");
  gmailTransporter = nodemailer.default.createTransport({
    service: "gmail",
    auth: { user, pass },
    pool: true,
    maxConnections: 2,
    maxMessages: 10,
  });

  return gmailTransporter;
}

async function sendWithGmail(options: SendEmailOptions): Promise<boolean> {
  const transporter = await getGmailTransporter();
  if (!transporter) return false;

  const user = (process.env.GMAIL_USER || "").trim();
  const from = options.fromName
    ? `"${options.fromName}" <${user}>`
    : `"SERVIPARTZ" <${user}>`;

  try {
    await Promise.race([
      transporter.sendMail({
        from,
        to: toArray(options.to).join(", "),
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text ?? options.html.replace(/<[^>]*>/g, "").trim(),
        html: options.html,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), EMAIL_TIMEOUT_MS)
      ),
    ]);
    return true;
  } catch (err) {
    console.error("[Email Gmail]", err);
    return false;
  }
}

function getResendFrom(): string {
  const email = process.env.RESEND_FROM_EMAIL?.trim();
  const name = process.env.RESEND_FROM_NAME?.trim() || "SERVIPARTZ";
  if (email) return `${name} <${email}>`;
  return "SERVIPARTZ <onboarding@resend.dev>";
}

async function sendWithResend(options: SendEmailOptions): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const from = options.fromName
    ? `${options.fromName} <${process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev"}>`
    : getResendFrom();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to: toArray(options.to),
      reply_to: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Email Resend]", err);
    return false;
  }
  return true;
}

/**
 * Envía un correo usando Gmail (si está configurado) o Resend.
 * Prioridad: Gmail > Resend, con reintento automático:
 * - Si Gmail está configurado pero falla, y Resend está disponible, se intenta con Resend.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const hasGmail =
    !!process.env.GMAIL_USER?.trim() &&
    !!process.env.GMAIL_APP_PASSWORD?.trim();
  const hasResend = process.env.RESEND_API_KEY;

  // 1) Intentar con Gmail si está disponible
  if (hasGmail) {
    const okGmail = await sendWithGmail(options);
    if (okGmail) return true;

    // Si Gmail falla pero hay Resend configurado, probamos Resend como respaldo
    if (hasResend) {
      console.warn(
        "[Email] Gmail falló, reintentando con Resend como respaldo."
      );
      return sendWithResend(options);
    }

    // Gmail estaba configurado pero falló, y no hay Resend
    return false;
  }

  // 2) Si no hay Gmail, pero sí Resend
  if (hasResend) {
    return sendWithResend(options);
  }

  // 3) Ningún proveedor configurado
  console.error(
    "[Email] Ningún proveedor de correo configurado. Falta Gmail o Resend."
  );
  return false;
}

/** Escapa HTML para evitar inyección en correos (XSS) */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
