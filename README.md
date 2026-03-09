# SERVIPARTZ - Sitio web

Sitio web para **SERVIPARTZ**, proveedor de repuestos de electrodomésticos en Hermosillo, Sonora.

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

Crea un archivo `.env.local` en la raíz del proyecto (copia de `.env.example`) y rellena las variables. En Vercel, configúralas en el proyecto.

### Correo (Gmail recomendado)

Para que **cotización** y **agendar cita** envíen correos reales necesitas **una** de estas dos opciones:

| Variable | Uso |
|----------|-----|
| `GMAIL_USER` | Tu correo de Gmail (ej: `tunegocio@gmail.com`). |
| `GMAIL_APP_PASSWORD` | Contraseña de aplicación de Gmail (no tu contraseña normal). |

**Cómo obtener la contraseña de aplicación (Gmail):**
1. Activa [verificación en 2 pasos](https://myaccount.google.com/signinoptions/two-step-verification) en tu cuenta de Google.
2. Entra en [Contraseñas de aplicación](https://myaccount.google.com/apppasswords).
3. Crea una contraseña para "Correo" / "Otro" (nombre ej: SERVIPARTZ).
4. Copia la contraseña de 16 caracteres y pégala en `GMAIL_APP_PASSWORD` en `.env.local`.

Si no configuras Gmail, puedes usar **Resend**:

| Variable | Uso |
|----------|-----|
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) (obligatoria para Resend). |
| `RESEND_FROM_EMAIL` | (Opcional) Correo desde el que enviar, ej. `notificaciones@tudominio.com`. Para enviar a cualquier destinatario debes [verificar tu dominio en Resend](https://resend.com/domains). Sin esto se usa `onboarding@resend.dev` (solo pruebas). |
| `RESEND_FROM_NAME` | (Opcional) Nombre del remitente; por defecto "SERVIPARTZ". |

**Importante:** Para que el envío de correo funcione debes configurar **una** de las dos opciones (Gmail o Resend) en `.env.local` en local y en **Vercel → Project → Settings → Environment Variables** en producción. Si no está configurado, la API devuelve 503 y se indica al usuario que contacte por teléfono.

### Firebase (opcional)

Para funciones que usen Firebase en el futuro (auth, etc.):

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_FIREBASE_*` | Configuración del proyecto en [Firebase Console](https://console.firebase.google.com) (API Key, Auth Domain, Project ID, etc.). |

### Otros

| Variable | Uso |
|----------|-----|
| `OPENAI_API_KEY` | (Opcional) Chatbot con IA. Sin esto, el chatbot usa respuestas locales por categoría. |

## Deploy en Vercel

1. Sube el proyecto a GitHub.
2. En [vercel.com](https://vercel.com) importa el repositorio.
3. Añade las variables de entorno: **Gmail** (`GMAIL_USER`, `GMAIL_APP_PASSWORD`) o **Resend** (`RESEND_API_KEY`), y opcionalmente `OPENAI_API_KEY` y Firebase.
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
