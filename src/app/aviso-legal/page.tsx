import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Aviso legal | SERVIPARTZ",
  description: "Aviso legal e información sobre el responsable del sitio web.",
};

export default function AvisoLegalPage() {
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

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Aviso legal</h1>
        <p className="text-sm text-slate-500 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX")}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Datos identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
              Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Denominación social:</strong> {SITE.name}</li>
              <li><strong>Domicilio:</strong> {SITE.address}</li>
              <li><strong>Correo electrónico:</strong> {SITE.email}</li>
              <li><strong>Teléfono:</strong> {SITE.phone}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Objeto</h2>
            <p>
              El presente aviso legal regula el uso y utilización del sitio web. La navegación por el sitio web atribuye
              la condición de usuario e implica la aceptación plena y sin reservas de todas y cada una de las
              disposiciones incluidas en este aviso legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Condiciones de uso</h2>
            <p>
              El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen a través
              de este sitio web y a no emplearlos para realizar actividades ilícitas o contrarias a la buena fe y al
              orden legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Propiedad intelectual</h2>
            <p>
              Los contenidos de este sitio web, incluyendo textos, imágenes, logotipos y diseños, son propiedad del
              titular o de sus licenciantes y están protegidos por la legislación aplicable en materia de propiedad
              intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Modificaciones</h2>
            <p>
              El titular se reserva el derecho de modificar el presente aviso legal para adaptarlo a novedades
              legislativas o jurisprudenciales, así como a prácticas del sector.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
