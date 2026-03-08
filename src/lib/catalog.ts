import { CATEGORIES } from "./constants";

export type ProductCategory = (typeof CATEGORIES)[number]["id"];

export interface CatalogProduct {
  id: string;
  name: string;
  category: ProductCategory;
  description?: string;
  price?: number;
  image?: string;
  sku?: string;
}

// Catálogo de ejemplo para la demo. En producción vendría de CMS o API.
// Imágenes genéricas por categoría en /products/
export const MOCK_PRODUCTS: CatalogProduct[] = [
  { id: "1", name: "Compresor refrigerador 1/4 HP", category: "refrigeradores", description: "Compresor hermético", sku: "COMP-025", image: "/products/refrigeradores.png" },
  { id: "2", name: "Evaporador refrigerador doméstico", category: "refrigeradores", sku: "EVA-DOM", image: "/products/refrigeradores.png" },
  { id: "3", name: "Motor licuadora Oster", category: "licuadoras", sku: "MOT-OST", image: "/products/licuadoras.png" },
  { id: "4", name: "Cuchilla licuadora universal", category: "licuadoras", sku: "CUC-LIC", image: "/products/licuadoras.png" },
  { id: "5", name: "Bomba de agua lavadora", category: "lavadoras", sku: "BOM-LAV", image: "/products/lavadoras.png" },
  { id: "6", name: "Resistencia lavadora", category: "lavadoras", sku: "RES-LAV", image: "/products/lavadoras.png" },
  { id: "7", name: "Magnetrón microondas", category: "microondas", sku: "MAG-MIC", image: "/products/microondas.png" },
  { id: "8", name: "Plato giratorio microondas", category: "microondas", sku: "PLA-MIC", image: "/products/microondas.png" },
  { id: "9", name: "Quemador estufa", category: "estufas", sku: "QUE-EST", image: "/products/estufas.png" },
  { id: "10", name: "Termostato estufa", category: "estufas", sku: "TER-EST", image: "/products/estufas.png" },
  { id: "11", name: "Condensador minisplit", category: "aires", sku: "CON-MIN", image: "/products/aires.png" },
  { id: "12", name: "Ventilador evaporador", category: "aires", sku: "VEN-EVA", image: "/products/aires.png" },
  { id: "13", name: "Electrodo soldadura", category: "soldadura", sku: "ELE-SOL", image: "/products/soldadura.png" },
  { id: "14", name: "Careta soldadura", category: "soldadura", sku: "CAR-SOL", image: "/products/soldadura.png" },
  { id: "15", name: "Compresor refrigeración industrial", category: "industrial", sku: "COMP-IND", image: "/products/industrial.png" },
  { id: "16", name: "Válvula expansión industrial", category: "industrial", sku: "VAL-IND", image: "/products/industrial.png" },
  { id: "17", name: "Capacitor arranque universal", category: "otros", sku: "CAP-UNI", image: "/products/otros.png" },
  { id: "18", name: "Relé de arranque", category: "otros", sku: "REL-ARR", image: "/products/otros.png" },
];

export function getProductsByCategory(category: ProductCategory): CatalogProduct[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(id: string): CatalogProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}
