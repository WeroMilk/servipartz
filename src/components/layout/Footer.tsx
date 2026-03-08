import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock } from "lucide-react";
import { MAPS_LINK, SITE, GOOGLE_REVIEWS_LINK } from "@/lib/constants";

const horario = [
  { dia: "Lunes a Viernes", hora: "8:00 a.m. – 6:30 p.m." },
  { dia: "Sábado", hora: "8:00 a.m. – 2:00 p.m." },
  { dia: "Domingo", hora: "Cerrado" },
];

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/seminuevos", label: "Seminuevos" },
  { href: "/cotizacion", label: "Cotización" },
  { href: "/agendar-cita", label: "Agendar cita" },
];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <span className="relative block h-9 w-[8.2rem] md:-ml-1">
              <Image
                src="/logo.png"
                alt="Servipartz"
                fill
                className="object-contain object-center md:object-left"
                sizes="131px"
              />
            </span>
            <p className="text-sm text-white/90 max-w-xs">
              Proveedor de repuestos de electrodomésticos en Hermosillo. Encuéntranos, cotiza y agenda servicio técnico.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2.5 flex flex-col items-center md:items-start">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white hover:text-white/80 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white flex flex-col items-center md:items-start">
              <li>
                <a href="tel:6624049965" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  662 404 9965
                </a>
              </li>
              <li>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors md:items-start"
                >
                  <MapPin className="h-4 w-4 shrink-0 md:mt-0.5" />
                  <span>{SITE.address}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-white mb-4">Horario</h3>
            <ul className="space-y-2.5 text-sm text-white flex flex-col items-center md:items-start">
              {horario.map((item) => (
                <li key={item.dia} className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-white" />
                  <span>{item.dia}: {item.hora}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-4 text-sm text-white text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/aviso-legal" className="text-white/80 hover:text-white transition-colors">
              Aviso legal
            </Link>
            <span className="text-white/40">·</span>
            <Link href="/terminos-y-condiciones" className="text-white/80 hover:text-white transition-colors">
              Términos y condiciones
            </Link>
            <span className="text-white/40">·</span>
            <Link href="/politica-de-privacidad" className="text-white/80 hover:text-white transition-colors">
              Política de privacidad
            </Link>
            <span className="text-white/40">·</span>
            <Link href="/politica-de-cookies" className="text-white/80 hover:text-white transition-colors">
              Política de cookies
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Servipartz. Todos los derechos reservados.</p>
            <a
              href={GOOGLE_REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
            >
              <span className="text-amber-500">★</span>
              {SITE.googleReviews} opiniones en Google
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
