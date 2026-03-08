import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Términos y condiciones | Servipartz",
  description: "Términos y condiciones de uso del sitio web y servicios.",
};

export default function TerminosCondicionesPage() {
  return (
    <div className="min-h-[100svh] bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Términos y condiciones</h1>
        <p className="text-sm text-slate-500 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX")}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar este sitio web, usted acepta quedar vinculado por estos términos y condiciones.
              Si no está de acuerdo con alguna parte de los mismos, le rogamos que no utilice nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Descripción del servicio</h2>
            <p>
              Este sitio web ofrece información sobre productos y servicios de repuestos de electrodomésticos,
              cotizaciones y agendamiento de citas para servicio técnico. Las cotizaciones enviadas a través del
              formulario no constituyen una oferta vinculante hasta su confirmación por parte de {SITE.name}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Precios y disponibilidad</h2>
            <p>
              Los precios mostrados son orientativos y pueden variar. La disponibilidad de productos está sujeta a
              confirmación. Nos reservamos el derecho de modificar precios y disponibilidad sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Uso del sitio</h2>
            <p>
              El usuario se compromete a utilizar el sitio de forma lícita y respetuosa. Queda prohibido el uso del
              sitio para fines fraudulentos, difamatorios o que infrinjan derechos de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con estos términos y condiciones, puede contactarnos en {SITE.email}
              o al teléfono {SITE.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
