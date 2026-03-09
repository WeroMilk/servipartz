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
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

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

  const user = process.env.GMAIL_USER!;
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
 * Prioridad: Gmail > Resend.
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const useGmail =
    process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;

  if (useGmail) {
    return sendWithGmail(options);
  }
  return sendWithResend(options);
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
