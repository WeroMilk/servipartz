import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title: "SERVIPARTZ | Electrodomésticos",
  description:
    "Proveedores y técnicos de electrodomésticos en Hermosillo. Catálogo amplio, cotizaciones, servicio técnico a domicilio. Refrigeradores, licuadoras, soldadura y más.",
  keywords: ["repuestos", "electrodomésticos", "Hermosillo", "SERVIPARTZ", "refrigeradores", "técnico"],
  applicationName: "SERVIPARTZ",
  manifest: "/site.webmanifest",
  themeColor: "#1e3a8a",
  appleWebApp: {
    capable: true,
    title: "SERVIPARTZ",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "SERVIPARTZ | Electrodomésticos",
    description: "Encuéntranos, cotiza y agenda servicio técnico. Hermosillo, Sonora.",
    images: [{ url: "/og-image.png", width: 1200, height: 1200, alt: "SERVIPARTZ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SERVIPARTZ | Electrodomésticos",
    description: "Encuéntranos, cotiza y agenda servicio técnico. Hermosillo, Sonora.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakarta.variable} data-scroll-behavior="smooth">
      <body className="antialiased min-h-[100svh] flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
