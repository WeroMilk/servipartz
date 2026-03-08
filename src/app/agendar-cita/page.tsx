"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, MapPin, MessageSquare, Send, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { addDays, format, isSaturday, isSunday } from "date-fns";

const DIA_SEMANA_3: Record<number, string> = {
  0: "dom", 1: "lun", 2: "mar", 3: "mie", 4: "jue", 5: "vie", 6: "sab",
};

function formatDateSpanish(d: Date): string {
  const diaSemana = DIA_SEMANA_3[d.getDay()];
  const dia = d.getDate();
  const mes = d.toLocaleDateString("es-MX", { month: "long" });
  return `${diaSemana} ${dia} ${mes}`;
}

// Lun–Vie 8:00–18:00; Sáb 8:00–14:00 (lapsos de 1 hora)
const HORARIOS = [
  "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];
const HORARIOS_SABADO = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

export default function AgendarCitaPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const getAvailableDates = () => {
    const dates: { value: string; label: string }[] = [];
    for (let i = 1; i <= 14; i++) {
      const d = addDays(new Date(), i);
      if (isSunday(d)) continue;
      dates.push({
        value: format(d, "yyyy-MM-dd"),
        label: formatDateSpanish(d),
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const isSaturdaySelected = form.date ? isSaturday(new Date(form.date)) : false;
  const availableTimes = isSaturdaySelected ? HORARIOS_SABADO : HORARIOS;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/agendar-cita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSent(true);
      else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Error al enviar.");
      }
    } catch {
      alert("Error de conexión.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[calc(100svh-10rem)] bg-zinc-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center rounded-2xl bg-white p-8 shadow-xl border border-zinc-200"
        >
          <div className="h-16 w-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto text-zinc-700">
            <Calendar className="h-8 w-8" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900">
            Cita solicitada
          </h2>
          <p className="mt-2 text-zinc-600">
            Nos pondremos en contacto para confirmar tu cita a domicilio.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-red-600 font-medium hover:underline"
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-zinc-50">
      <div className="bg-zinc-900 text-white pt-4 pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white mb-6 text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Agendar cita con técnico
          </h1>
          <p className="mt-2 text-zinc-400">
            Un técnico puede ir a tu domicilio. Elige fecha, horario y déjanos tus datos.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative z-10">
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  placeholder="Tu nombre"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Teléfono *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900"
                  placeholder="662 123 4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Fecha preferida *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <select
                  required
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, time: "" }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm"
                >
                  <option value="">Selecciona una fecha</option>
                  {availableDates.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Horario preferido *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <select
                  required
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-sm"
                >
                  <option value="">Selecciona un horario</option>
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Lun–Vie 8:00–18:00, Sáb 8:00–14:00.
              </p>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Dirección del servicio *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <textarea
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 resize-none"
                  placeholder="Calle, colonia, ciudad"
                />
              </div>
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <label className="block text-sm font-medium text-zinc-700 mb-1">Descripción del problema (opcional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-900 resize-none"
                  placeholder="Ej.: Refrigerador no enfría, lavadora hace ruido..."
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {sending ? "Enviando…" : "Solicitar cita"}
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
