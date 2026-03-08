"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Calendar, FileText, MessageCircle, ArrowRight, Star, MapPin, Phone, Clock, RefreshCw } from "lucide-react";
import { MAPS_LINK, SITE, SITE_COORDS, GOOGLE_REVIEWS_LINK } from "@/lib/constants";

// Iframe: usar coordenadas (q=lat,lng) para que el mapa quede centrado en el pin en desktop
const MAPS_EMBED = `https://www.google.com/maps?q=${SITE_COORDS.lat},${SITE_COORDS.lng}&z=18&output=embed`;

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
              Reparación de electrodomésticos en Hermosillo, Son.
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
            {[
              { icon: Package, title: "Catálogo", desc: "Refrigeradores, licuadoras, soldadura y más. Busca la pieza que necesitas.", href: "/catalogo" },
              { icon: RefreshCw, title: "Seminuevos", desc: "Electrodomésticos de segunda mano en excelente estado.", href: "/seminuevos" },
              { icon: FileText, title: "Cotización", desc: "Arma tu lista de piezas y envíanos una cotización. Te respondemos a la brevedad.", href: "/cotizacion" },
              { icon: Calendar, title: "Agendar cita", desc: "Un técnico puede ir a tu domicilio. Agenda tu cita en línea.", href: "/agendar-cita" },
              { icon: MessageCircle, title: "Asistente", desc: "Cuéntale el problema de tu electrodoméstico y te ayuda a diagnosticar.", href: "#" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="h-full"
              >
                <Link
                  href={item.href}
                  className="flex flex-col h-full rounded-xl border border-slate-100 bg-slate-50/50 p-5 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm group-hover:text-primary-600 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-medium text-slate-900 text-base group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1 min-h-0">
                    {item.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 group-hover:text-primary-600 transition-colors">
                    Ir
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visítanos + mapa */}
      <section className="py-16 sm:py-24 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0 lg:items-stretch">
              {/* Columna izquierda: datos + horario */}
              <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col justify-center min-h-0">
                <h2 className="text-xl font-semibold text-slate-900">Visítanos</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Av. José San Healy 385, Olivares, 83180 Hermosillo, Son.
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-red-600 font-medium hover:text-red-700"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Cómo llegar
                </a>
                <div className="mt-4">
                  <a href="tel:6624049965" className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium">
                    <Phone className="h-3.5 w-3.5" />
                    662 404 9965
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400" />
                    Horario
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
                    <li>Lunes a Viernes: 8:00 a.m. – 6:30 p.m.</li>
                    <li>Sábado: 8:00 a.m. – 2:00 p.m.</li>
                    <li>Domingo: Cerrado</li>
                  </ul>
                </div>
              </div>
              {/* Mapa Google — margen en todos los lados para verse centrado */}
              <div className="lg:col-span-3 h-64 sm:h-72 min-h-[240px] p-4 sm:p-6 lg:p-8 lg:min-h-0 lg:flex lg:items-center lg:justify-center lg:rounded-r-xl">
                <div className="w-full h-full lg:h-80 lg:max-h-[340px] relative overflow-hidden rounded-lg">
                <iframe
                  title="Ubicación Servipartz"
                  src={MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
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
