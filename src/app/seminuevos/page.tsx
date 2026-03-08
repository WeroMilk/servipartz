"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, RefreshCw, Phone, ChevronRight, Plus } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { MOCK_SEMINUEVOS, CATEGORIES_SEM, type SeminuevoItem } from "@/lib/seminuevos";
import { useQuoteStore } from "@/store/quoteStore";

export default function SeminuevosPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const addSeminuevoItem = useQuoteStore((s) => s.addSeminuevoItem);

  const filtered = useMemo(() => {
    let list = MOCK_SEMINUEVOS;
    if (category) {
      list = list.filter((s) => s.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, category]);

  return (
    <div className="min-h-[100svh] bg-slate-50">
      {/* Cabecera azul */}
      <div className="bg-primary-700 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Seminuevos
              </h1>
              <p className="mt-2 text-primary-100 max-w-xl">
                Electrodomésticos de segunda mano en excelente estado. Refrigeradores, lavadoras, estufas y más.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-200">
              <span className="font-medium text-white">{filtered.length}</span>
              <span>disponibles</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtros */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <h3 className="font-semibold text-slate-800">Categorías</h3>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className={`shrink-0 lg:w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    category === null
                      ? "bg-primary-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  Todos
                </button>
                {CATEGORIES_SEM.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`shrink-0 lg:w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === cat
                        ? "bg-primary-600 text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="search"
                  placeholder="Buscar por nombre o categoría..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl border border-slate-200 bg-white p-16 text-center"
                >
                  <RefreshCw className="h-12 w-12 text-slate-300 mx-auto" />
                  <p className="mt-4 text-slate-500 font-medium">No hay seminuevos que coincidan</p>
                  <p className="mt-1 text-sm text-slate-400">Prueba otra búsqueda o categoría</p>
                </motion.div>
              ) : (
                <motion.ul
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.map((item, i) => (
                    <SeminuevoCard
                      key={item.id}
                      item={item}
                      index={i}
                      onAddToQuote={() => addSeminuevoItem(item)}
                      onOpenImage={item.image ? () => setLightbox({ src: item.image!, alt: item.name }) : undefined}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center p-6 rounded-xl bg-white border border-slate-200">
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  Ver mi cotización
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href="tel:6624049965"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-6 py-3.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Llamar para consultar
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <ImageLightbox
        open={!!lightbox}
        onClose={() => setLightbox(null)}
        src={lightbox?.src ?? ""}
        alt={lightbox?.alt ?? ""}
      />
    </div>
  );
}

function SeminuevoCard({
  item,
  index,
  onAddToQuote,
  onOpenImage,
}: {
  item: SeminuevoItem;
  index: number;
  onAddToQuote: () => void;
  onOpenImage?: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2) }}
      className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-200"
    >
      <div
        className={`relative h-36 bg-primary-50 overflow-hidden ${onOpenImage ? "cursor-zoom-in" : ""}`}
        onClick={onOpenImage}
        onKeyDown={onOpenImage ? (e) => e.key === "Enter" && onOpenImage() : undefined}
        role={onOpenImage ? "button" : undefined}
        tabIndex={onOpenImage ? 0 : undefined}
        aria-label={onOpenImage ? "Ver imagen completa" : undefined}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
            <RefreshCw className="h-12 w-12 text-primary-300 group-hover:text-primary-400 transition-colors" />
          </div>
        )}
      </div>
      <div className="p-5">
        <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 mb-3">
          {item.category}
        </span>
        <h3 className="font-semibold text-slate-900 line-clamp-2 leading-snug">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm text-slate-500">
          Estado: <span className="font-medium text-slate-700">{item.condition}</span>
        </p>
        {item.price && (
          <p className="mt-1 text-sm font-medium text-primary-600">{item.price}</p>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={onAddToQuote}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 text-white py-2.5 text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Añadir a cotización
          </button>
          <a
            href="tel:6624049965"
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-600 text-primary-600 py-2.5 text-sm font-semibold hover:bg-primary-50 transition-colors"
          >
            Consultar
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.li>
  );
}
