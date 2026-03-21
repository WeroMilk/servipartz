"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Package, Calendar, FileText, ArrowRight, Star, MapPin, Phone, Clock, RefreshCw } from "lucide-react";
import { MAPS_LINK, SITE, GOOGLE_REVIEWS_LINK } from "@/lib/constants";

// Iframe: usar la dirección exacta del negocio para que el mapa muestre la ubicación correcta
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(SITE.address)}&z=18&output=embed`;

const WHATSAPP_ASSIST_HREF = `https://wa.me/526624049965?text=${encodeURIComponent("Hola, necesito asesoría!")}`;

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type ActionCard = {
  key: string;
  icon: LucideIcon | "whatsapp";
  title: string;
  desc: string;
  href: string;
  external?: boolean;
  cta?: string;
};

const actionCards: ActionCard[] = [
  { key: "catalogo", icon: Package, title: "Catálogo", desc: "Refrigeradores, licuadoras, soldadura y más. Busca la pieza que necesitas.", href: "/catalogo" },
  { key: "seminuevos", icon: RefreshCw, title: "Seminuevos", desc: "Electrodomésticos de segunda mano en excelente estado.", href: "/seminuevos" },
  { key: "cotizacion", icon: FileText, title: "Cotización", desc: "Arma tu lista de piezas y envíanos una cotización. Te respondemos a la brevedad.", href: "/cotizacion" },
  { key: "agendar", icon: Calendar, title: "Agendar cita", desc: "Un técnico puede ir a tu domicilio. Agenda tu cita en línea.", href: "/agendar-cita" },
  {
    key: "asistente-wa",
    icon: "whatsapp",
    title: "Asistente",
    desc: "Cuéntale el problema de tu electrodoméstico y te da una solución.",
    href: WHATSAPP_ASSIST_HREF,
    external: true,
    cta: "Whatsapp",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-[100svh] bg-primary-700 md:bg-transparent">
      {/* Hero - en móvil contenido fluido sin espacio vacío; en desktop la sección azul abarca más */}
      <section className="relative min-h-0 md:min-h-0 lg:min-h-[88svh] bg-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.12)_100%)]" />
        {/* Imagen del local - solo desktop, integrada con suavidad */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          <div className="absolute right-0 top-0 bottom-0 w-[50%] max-w-2xl">
            <Image
              src="/local-servipartz.png"
              alt=""
              fill
              priority
              className="object-cover object-right blur-[8px] scale-105 opacity-70"
              sizes="(max-width: 1024px) 0px, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary-700 via-primary-700/30 to-transparent" />
          </div>
        </div>
        {/* Móvil: imagen + contenido bien distribuido sin márgenes excesivos */}
        <div className="lg:hidden w-full flex-shrink-0 relative overflow-hidden rounded-b-2xl">
          <div className="w-full aspect-[16/10] max-h-44 relative">
            <Image
              src="/local-servipartz.png"
              alt=""
              fill
              priority
              className="object-cover object-center blur-[4px]"
              sizes="(max-width: 1023px) 96vw, 0px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary-700/30 via-transparent to-primary-700/50" />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-0 pt-5 sm:pt-10 lg:pt-24 pb-14 sm:pb-24 lg:pb-28 flex flex-col items-center lg:items-stretch justify-start lg:justify-between lg:flex-row lg:gap-16">
          {/* Texto del hero: en móvil menos padding y flujo natural */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-xl w-full text-center lg:text-left"
          >
            <p className="text-xs lg:text-sm font-medium text-white/70 uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 lg:mb-6">
              Reparación y servicio técnico
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
              Tu solución en electrodomésticos. Hermosillo, Son.
            </h1>
            <p className="mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Catálogo amplio, cotizaciones rápidas y servicio técnico a domicilio. Desde soldaduras hasta reparación y mantenimiento de refrigeraciones industriales.
            </p>
            <div className="mt-6 lg:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 justify-center lg:justify-start">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-primary-700 border-2 border-primary-600 px-5 py-3 lg:px-6 lg:py-3 text-sm lg:text-base font-medium hover:bg-white/95 transition-colors"
              >
                Ver catálogo
                <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              </Link>
              <Link
                href="/cotizacion"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary-400 px-5 py-3 lg:px-6 lg:py-3 text-sm lg:text-base font-medium text-white hover:bg-white/10 hover:border-white/80 transition-colors"
              >
                Solicitar cotización
              </Link>
            </div>
            <div className="mt-6 lg:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-x-6 sm:gap-y-1 text-sm lg:text-base text-white/60">
              <a
                href={GOOGLE_REVIEWS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Star className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-amber-400 fill-amber-400 shrink-0" />
                {SITE.googleReviews} opiniones
              </a>
              <a href="tel:6624049965" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0" />
                662 404 9965
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-red-300 hover:text-red-200 transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 lg:h-4 lg:w-4 shrink-0" />
                Cómo llegar
              </a>
            </div>
          </motion.div>
          <div className="hidden lg:block flex-1 max-w-md min-h-[260px]" aria-hidden />
        </div>
      </section>

      {/* Servicios - tarjetas minimalistas: en desktop margen negativo para reducir espacio arriba; móvil con menos pt para subir el bloque */}
      <section className="pt-10 sm:pt-24 lg:pt-40 lg:-mt-10 pb-16 sm:pb-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
              Qué puedes hacer aquí
            </h2>
            <p className="mt-3 text-slate-500 text-base">
              Encuéntranos, cotiza piezas, agenda un técnico o resuelve dudas con nuestro asistente.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {actionCards.map((item, i) => {
              const className =
                "flex flex-col h-full rounded-xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 group";
              const inner = (
                <>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition-colors ${
                      item.icon === "whatsapp"
                        ? "text-[#25D366] group-hover:text-[#128C7E]"
                        : "text-slate-600 group-hover:text-primary-600"
                    }`}
                  >
                    {item.icon === "whatsapp" ? (
                      <WhatsAppGlyph className="h-5 w-5" />
                    ) : (
                      <item.icon className="h-5 w-5" />
                    )}
                  </div>
                  <h3 className="mt-4 font-medium text-slate-900 text-base group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1 min-h-0">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 group-hover:text-primary-600 transition-colors">
                    {item.cta ?? "Ir"}
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </>
              );
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="h-full"
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visítanos + mapa — sección organizada y profesional, sin espacio sobrante */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 bg-slate-100/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white shadow-lg shadow-slate-200/60 ring-1 ring-slate-200/80 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-0 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]">
              {/* Columna izquierda: información de contacto */}
              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 order-2 lg:order-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-4">
                  Ubicación
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                  Visítanos
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Av. José San Healy 385, Olivares
                  <br />
                  <span className="text-slate-500">83180 Hermosillo, Son.</span>
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  <MapPin className="h-4 w-4 shrink-0" />
                  Cómo llegar
                </a>
                <a
                  href="tel:6624049965"
                  className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-slate-500" />
                  662 404 9965
                </a>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    Horario
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>Lunes a Viernes: 8:00 a.m. – 6:30 p.m.</li>
                    <li>Sábado: 8:00 a.m. – 2:00 p.m.</li>
                    <li className="text-slate-500">Domingo: Cerrado</li>
                  </ul>
                </div>
              </div>
              {/* Mapa: altura consistente, borde redondeado a la derecha */}
              <div className="relative min-h-[240px] sm:min-h-[280px] lg:min-h-0 lg:aspect-auto order-1 lg:order-2">
                <div className="absolute inset-0 lg:rounded-r-2xl overflow-hidden bg-slate-100">
                  <iframe
                    title="Ubicación SERVIPARTZ"
                    src={MAPS_EMBED}
                    width="100%"
                    height="100%"
                    style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
