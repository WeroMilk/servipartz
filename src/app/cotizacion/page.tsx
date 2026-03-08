"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, Send, ArrowLeft } from "lucide-react";
import { useQuoteStore } from "@/store/quoteStore";

export default function CotizacionPage() {
  const { items, removeItem, updateQuantity, clear } = useQuoteStore();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSending(true);
    try {
      const res = await fetch("/api/cotizacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, ...form }),
      });
      if (res.ok) {
        setSent(true);
        clear();
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Error al enviar. Intenta de nuevo.");
      }
    } catch {
      alert("Error de conexión. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center rounded-2xl bg-white p-8 shadow-xl border border-zinc-200"
        >
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600">
            <Send className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">
            Cotización enviada
          </h2>
          <p className="mt-2 text-zinc-600">
            Nos reportaremos a la brevedad. Estamos buscando tu pieza.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-flex items-center gap-2 text-red-600 font-medium hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Seguir buscando productos
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-red-600" />
              Solicitar cotización
            </h1>
            <p className="mt-2 text-zinc-600">
              Revisa las piezas, completa tus datos y envíanos la cotización. Te contestaremos para confirmar disponibilidad.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-red-600 font-medium hover:underline shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Añadir más productos
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-zinc-200 bg-white p-12 text-center"
          >
            <ShoppingCart className="h-12 w-12 text-zinc-400 mx-auto" />
            <p className="mt-4 text-zinc-600">No hay productos en tu cotización.</p>
            <Link
              href="/catalogo"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-white font-medium hover:bg-red-700"
            >
              Ir al catálogo
            </Link>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
              <ul className="divide-y divide-zinc-200">
                {items.map((item) => (
                  <li key={item.product.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5">
                    <div className="flex-1">
                      <p className="font-medium text-zinc-900">{item.product.name}</p>
                      {item.product.sku && (
                        <p className="text-sm text-zinc-500">SKU: {item.product.sku}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Tus datos para la cotización
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1">
                    Correo *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 mb-1">
                    Comentarios (opcional)
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => clear()}
                className="px-5 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-100"
              >
                Vaciar cotización
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Enviando…" : "Enviar cotización"}
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
