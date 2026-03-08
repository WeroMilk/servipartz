import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CatalogProduct } from "@/lib/catalog";
import type { ProductCategory } from "@/lib/catalog";
import type { SeminuevoItem } from "@/lib/seminuevos";

export interface QuoteItem {
  product: CatalogProduct;
  quantity: number;
  notes?: string;
}

const SEM_CATEGORY_TO_PRODUCT: Record<string, ProductCategory> = {
  Refrigeradores: "refrigeradores",
  Lavadoras: "lavadoras",
  Estufas: "estufas",
  "Aires acondicionados": "aires",
  Microondas: "microondas",
  Licuadoras: "licuadoras",
  "Refrigeración industrial": "industrial",
};

function seminuevoToProduct(item: SeminuevoItem): CatalogProduct {
  return {
    id: `sem-${item.id}`,
    name: item.name,
    category: SEM_CATEGORY_TO_PRODUCT[item.category] ?? "otros",
    description: `Seminuevo - Estado: ${item.condition}`,
    image: item.image,
    price: undefined,
  };
}

interface QuoteState {
  items: QuoteItem[];
  flashMenu: boolean;
  addItem: (product: CatalogProduct, quantity?: number, notes?: string) => void;
  addSeminuevoItem: (item: SeminuevoItem, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  triggerFlash: () => void;
}

const FLASH_DURATION_MS = 2500;

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],
      flashMenu: false,
      addItem: (product, quantity = 1, notes) => {
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          const newItems = existing
            ? state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity, notes: notes ?? i.notes }
                  : i
              )
            : [...state.items, { product, quantity, notes }];
          return { items: newItems };
        });
        get().triggerFlash();
      },
      addSeminuevoItem: (item, quantity = 1) => {
        get().addItem(seminuevoToProduct(item), quantity);
      },
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      triggerFlash: () => {
        set({ flashMenu: true });
        setTimeout(() => set({ flashMenu: false }), FLASH_DURATION_MS);
      },
    }),
    {
      name: "servipartz-quote",
      skipHydration: true,
      partialize: (state) => ({ items: state.items }),
    }
  )
);
