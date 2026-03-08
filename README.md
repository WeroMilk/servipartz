# Servipartz - Sitio web

Sitio web para **Servipartz**, proveedor de repuestos de electrodomésticos en Hermosillo, Sonora.

## Tecnologías

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **Zustand** (estado del carrito de cotización)

## Funcionalidades

- **Inicio**: Hero, servicios e información de contacto
- **Catálogo**: Productos por categoría (refrigeradores, licuadoras, lavadoras, microondas, estufas, aires, soldadura, refrigeración industrial, etc.) con búsqueda
- **Cotización**: Carrito de piezas; el cliente envía la cotización y recibe confirmación por correo ("Nos reportaremos a la brevedad, estamos buscando tu pieza"); el correo llega a la tienda
- **Agendar cita**: Formulario para solicitar visita de técnico a domicilio (fecha, horario, dirección)
- **Chatbot**: Asistente experto en electrodomésticos (respuestas locales por defecto; opcionalmente OpenAI con `OPENAI_API_KEY`)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno (producción / Vercel)

Crea un archivo `.env.local` en desarrollo o configura en Vercel:

| Variable | Uso |
|----------|-----|
| `RESEND_API_KEY` | Envío de correos (cotización y cita). Sin esto, las solicitudes se registran en logs pero no se envían emails. |
| `OPENAI_API_KEY` | (Opcional) Chatbot con IA. Sin esto, el chatbot usa respuestas locales por categoría. |

Para correos con [Resend](https://resend.com): crea una cuenta, verifica tu dominio (o usa `onboarding@resend.dev` en pruebas) y añade la API key en Vercel.

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com) importa el repositorio.
3. Añade las variables de entorno (`RESEND_API_KEY` y opcionalmente `OPENAI_API_KEY`).
4. Deploy automático en cada push.

## Estructura

```
src/
├── app/
│   ├── api/           # cotizacion, agendar-cita, chatbot
│   ├── catalogo/
│   ├── cotizacion/
│   ├── agendar-cita/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/        # Header, Footer
│   └── chat/          # ChatbotWidget
├── lib/               # constants, catalog
└── store/             # quoteStore (Zustand)
```

## Contacto del negocio

- **Dirección:** Av. José San Healy 385, Olivares, 83180 Hermosillo, Son.
- **Teléfono:** 662 404 9965
- **Horario:** Lun–Vie 8:00–18:30, Sáb 8:00–14:00, Dom cerrado
