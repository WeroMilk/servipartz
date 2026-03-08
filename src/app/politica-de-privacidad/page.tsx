import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Política de privacidad | Servipartz",
  description: "Política de privacidad y protección de datos personales.",
};

export default function PoliticaPrivacidadPage() {
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

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Política de privacidad</h1>
        <p className="text-sm text-slate-500 mb-10">Última actualización: {new Date().toLocaleDateString("es-MX")}</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Responsable del tratamiento</h2>
            <p>
              Los datos personales que nos proporcione serán tratados por {SITE.name}, con domicilio en {SITE.address}.
              Puede contactarnos en {SITE.email} o al teléfono {SITE.phone}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Finalidad del tratamiento</h2>
            <p>
              Los datos que recabamos a través de los formularios de cotización y agendar cita se utilizan exclusivamente
              para gestionar su solicitud, responder a sus consultas y, en su caso, contactarle para ofrecer nuestros
              productos y servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Legitimación</h2>
            <p>
              La base legal para el tratamiento de sus datos es su consentimiento al enviar el formulario, así como
              la ejecución de medidas precontractuales o la relación comercial que pudiera derivarse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Conservación de datos</h2>
            <p>
              Conservaremos sus datos personales mientras sea necesario para la finalidad para la que fueron recabados
              y durante el tiempo que exijan las obligaciones legales aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Derechos del interesado</h2>
            <p>
              Puede ejercer sus derechos de acceso, rectificación, supresión, limitación del tratamiento, portabilidad
              y oposición contactando con nosotros en la dirección de correo indicada. Asimismo, tiene derecho a
              presentar una reclamación ante la autoridad de control competente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Cookies</h2>
            <p>
              Este sitio web puede utilizar cookies técnicas necesarias para su funcionamiento. Para más información,
              consulte nuestra Política de cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
