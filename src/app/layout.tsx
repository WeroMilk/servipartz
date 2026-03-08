import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Servipartz | Electrodomesticos",
  description:
    "Proveedor de repuestos de electrodomésticos en Hermosillo. Catálogo amplio, cotizaciones, servicio técnico a domicilio. Refrigeradores, licuadoras, soldadura y más.",
  keywords: ["repuestos", "electrodomésticos", "Hermosillo", "Servipartz", "refrigeradores", "técnico"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Servipartz | Electrodomesticos",
    description: "Encuéntranos, cotiza y agenda servicio técnico. Hermosillo, Sonora.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakarta.variable} data-scroll-behavior="smooth">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
