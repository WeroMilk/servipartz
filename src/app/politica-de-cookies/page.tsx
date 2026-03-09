import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Política de cookies | SERVIPARTZ",
  description: "Información sobre el uso de cookies en este sitio web.",
};

export default function PoliticaCookiesPage() {
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

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Política de cookies</h1>
        <p className="text-sm text-slate-500 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX")}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (ordenador,
              tablet o móvil) cuando los visita. Permiten que el sitio recuerde sus acciones y preferencias durante
              un período de tiempo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Tipos de cookies utilizadas</h2>
            <p>
              Este sitio web puede utilizar las siguientes cookies:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio (por ejemplo, preferencias de sesión).</li>
              <li><strong>Cookies de preferencias:</strong> Permiten recordar configuraciones como idioma o región.</li>
              <li><strong>Cookies de análisis:</strong> Ayudan a comprender cómo los visitantes interactúan con el sitio (si se utilizan).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Cómo gestionar las cookies</h2>
            <p>
              Puede configurar su navegador para rechazar o eliminar cookies. Tenga en cuenta que desactivar ciertas
              cookies puede afectar la funcionalidad del sitio web. Las opciones de configuración suelen encontrarse
              en el menú de preferencias o configuración de su navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Más información</h2>
            <p>
              Para cualquier consulta sobre el uso de cookies en este sitio web, puede contactarnos a través de los
              datos de contacto indicados en el Aviso legal.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
