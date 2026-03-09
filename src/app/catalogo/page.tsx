"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Plus, ChevronRight, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { MOCK_PRODUCTS, type CatalogProduct } from "@/lib/catalog";
import { useQuoteStore } from "@/store/quoteStore";
import Link from "next/link";
import Image from "next/image";
import { ImageLightbox } from "@/components/ImageLightbox";

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const addItem = useQuoteStore((s) => s.addItem);

  const filtered = useMemo(() => {
    let list = MOCK_PRODUCTS;
    if (category) {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, category]);

  return (
    <div className="min-h-[100svh] bg-zinc-50">
      {/* Cabecera */}
      <div className="bg-zinc-900 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Catálogo de productos
              </h1>
              <p className="mt-2 text-zinc-400 max-w-xl">
                Refrigeradores, licuadoras, lavadoras, soldadura y más. Añade a cotización para solicitar disponibilidad.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="font-medium text-white">{filtered.length}</span>
              <span>productos</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filtros (desktop) */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center gap-2 text-zinc-900 font-semibold">
                <SlidersHorizontal className="h-4 w-4" />
                Categorías
              </div>
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                <button
                  type="button"
                  onClick={() => setCategory(null)}
                  className={`shrink-0 lg:w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    category === null
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  Todos
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`shrink-0 lg:w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      category === cat.id
                        ? "bg-zinc-900 text-white"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenido principal */}
          <div className="flex-1 min-w-0">
            {/* Barra de búsqueda */}
            <div className="mb-6">
              <label htmlFor="catalogo-search" className="sr-only">
                Buscar por nombre o código (SKU)
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  id="catalogo-search"
                  name="q"
                  type="search"
                  autoComplete="off"
                  placeholder="Buscar por nombre o código (SKU)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-shadow"
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
                  className="rounded-2xl border border-zinc-200 bg-white p-16 text-center"
                >
                  <Package className="h-12 w-12 text-zinc-300 mx-auto" />
                  <p className="mt-4 text-zinc-500 font-medium">No hay productos que coincidan</p>
                  <p className="mt-1 text-sm text-zinc-400">Prueba otra búsqueda o categoría</p>
                </motion.div>
              ) : (
                <motion.ul
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch"
                >
                  {filtered.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      onAddToQuote={() => addItem(product)}
                      onOpenImage={product.image ? () => setLightbox({ src: product.image!, alt: product.name }) : undefined}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            {filtered.length > 0 && (
              <div className="mt-10 flex justify-center">
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
                >
                  Ver mi cotización
                  <ChevronRight className="h-4 w-4" />
                </Link>
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

function ProductCard({
  product,
  index,
  onAddToQuote,
  onOpenImage,
}: {
  product: CatalogProduct;
  index: number;
  onAddToQuote: () => void;
  onOpenImage?: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.id === product.category);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2) }}
      className="group flex flex-col h-full rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-zinc-300 transition-all duration-200"
    >
      {/* Imagen del producto o placeholder — clic para ver completa */}
      <div
        className={`relative h-36 shrink-0 bg-zinc-100 overflow-hidden ${onOpenImage ? "cursor-zoom-in" : ""}`}
        onClick={onOpenImage}
        onKeyDown={onOpenImage ? (e) => e.key === "Enter" && onOpenImage() : undefined}
        role={onOpenImage ? "button" : undefined}
        tabIndex={onOpenImage ? 0 : undefined}
        aria-label={onOpenImage ? "Ver imagen completa" : undefined}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200">
            <Package className="h-12 w-12 text-zinc-400 group-hover:text-zinc-500 transition-colors" />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0">
          {cat && (
            <span className="inline-block rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 mb-3">
              {cat.label}
            </span>
          )}
          <h3 className="font-semibold text-zinc-900 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          {product.sku && (
            <p className="mt-1.5 text-sm text-zinc-500 font-mono">SKU: {product.sku}</p>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-100 shrink-0">
          <button
            type="button"
            onClick={onAddToQuote}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border-2 border-zinc-900 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <Plus className="h-4 w-4" />
            Añadir a cotización
          </button>
        </div>
      </div>
    </motion.li>
  );
}
