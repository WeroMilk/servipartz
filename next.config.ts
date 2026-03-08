import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";
    // Next.js, React y algunas librerías (ej. Framer Motion) pueden usar eval en runtime.
    // Para evitar el error de CSP en producción, se permite 'unsafe-eval'.
    // Si en el futuro eliminas dependencias que usen eval, puedes quitarlo por seguridad.
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https:",
      "blob:",
      ...(isDev ? ["'unsafe-hashes'"] : []),
    ].join(" ");
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `script-src ${scriptSrc}; object-src 'self'; base-uri 'self';`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
