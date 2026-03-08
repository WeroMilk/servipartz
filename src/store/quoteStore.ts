import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CatalogProduct } from "@/lib/catalog";

export interface QuoteItem {
  product: CatalogProduct;
  quantity: number;
  notes?: string;
}

interface QuoteState {
  items: QuoteItem[];
  addItem: (product: CatalogProduct, quantity?: number, notes?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1, notes) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity, notes: notes ?? i.notes }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity, notes }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "servipartz-quote",
      skipHydration: true,
    }
  )
);
