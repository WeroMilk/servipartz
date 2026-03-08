"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { MAPS_LINK } from "@/lib/constants";
import { useQuoteStore } from "@/store/quoteStore";

const CotizationNavLink = dynamic(
  () => import("./CotizationNavLink").then((m) => ({ default: m.CotizationNavLink })),
  { ssr: false, loading: () => <>Cotización</> }
);

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/seminuevos", label: "Seminuevos" },
  { href: "/cotizacion", labelKey: "cotizacion" },
  { href: "/agendar-cita", label: "Agendar cita" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const flashMenu = useQuoteStore((s) => s.flashMenu);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-sm border-b border-white/5 relative">
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2 shrink-0 ml-0 md:ml-10 lg:ml-24">
          <span className="relative block h-11 w-[10rem] sm:h-12 sm:w-[11rem]">
            <Image
              src="/logo.png"
              alt="Servipartz"
              fill
              className="object-contain object-left"
              sizes="176px"
              priority
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 rounded-md text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              {"labelKey" in link && link.labelKey === "cotizacion" ? (
                <CotizationNavLink />
              ) : (
                "label" in link && link.label
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center mr-10 sm:mr-16 lg:mr-24">
          <a
            href="tel:6624049965"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white font-medium transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            662 404 9965
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden relative p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
          aria-label="Menú"
        >
          {flashMenu && (
            <motion.span
              className="absolute inset-0 rounded-xl border-2 border-red-500"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.3, 1, 0.3, 1, 0.3, 1] }}
              transition={{ duration: 2.5, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] }}
              aria-hidden
            />
          )}
          <span className="relative z-10 flex">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, overflow: "hidden" }}
            animate={{ height: "auto", overflow: "hidden" }}
            exit={{ height: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 border-t border-white/10"
          >
            {/* Fondo primero, luego el texto */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-black absolute inset-0"
            />
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
              className="flex flex-col py-3 px-2 relative z-10"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-md text-white hover:bg-white/10 font-medium text-sm transition-colors"
                >
                  {"labelKey" in link && link.labelKey === "cotizacion" ? (
                    <CotizationNavLink />
                  ) : (
                    "label" in link && link.label
                  )}
                </Link>
              ))}
              <a href="tel:6624049965" className="flex items-center gap-2 px-4 py-2.5 text-white hover:bg-white/10 text-sm transition-colors">
                <Phone className="h-3.5 w-3.5" />
                662 404 9965
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:text-red-400 hover:bg-white/5 text-sm transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                Cómo llegar
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
