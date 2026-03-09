/** Ubicación correcta del negocio en Google Maps */
export const MAPS_LINK = "https://maps.app.goo.gl/er7MTwpmCVtZFiAQ7";

/** URL del sistema POS (punto de venta). Configurar en .env como NEXT_PUBLIC_POS_URL */
export const POS_URL = process.env.NEXT_PUBLIC_POS_URL || "";

/** Enlace para leer opiniones en Google */
export const GOOGLE_REVIEWS_LINK = "https://www.google.com/search?q=servipartz+hermosillo+opiniones";

/** Coordenadas del local (para centrar el mapa en el embed) */
export const SITE_COORDS = { lat: 29.0722, lng: -110.964 } as const;

export const SITE = {
  name: "Servipartz",
  phone: "662 404 9965",
  phoneRaw: "6624049965",
  address: "Av. José San Healy 385, Olivares, 83180 Hermosillo, Son.",
  email: "asilvasm97@gmail.com",
  googleReviews: "4.4",
  schedule: {
    weekdays: "8:00 a.m. – 6:30 p.m.",
    saturday: "8:00 a.m. – 2:00 p.m.",
    sunday: "Cerrado",
  },
} as const;

export const CATEGORIES = [
  { id: "refrigeradores", label: "Refrigeradores", slug: "refrigeradores" },
  { id: "licuadoras", label: "Licuadoras", slug: "licuadoras" },
  { id: "lavadoras", label: "Lavadoras", slug: "lavadoras" },
  { id: "microondas", label: "Microondas", slug: "microondas" },
  { id: "estufas", label: "Estufas", slug: "estufas" },
  { id: "aires", label: "Aires acondicionados", slug: "aires" },
  { id: "soldadura", label: "Soldadura", slug: "soldadura" },
  { id: "industrial", label: "Refrigeración industrial", slug: "industrial" },
  { id: "otros", label: "Otros", slug: "otros" },
] as const;
