export interface SeminuevoItem {
  id: string;
  name: string;
  category: string;
  condition: string;
  price?: string;
  description?: string;
  image?: string;
}

export const MOCK_SEMINUEVOS: SeminuevoItem[] = [
  { id: "1", name: "Refrigerador Samsung 2 puertas", category: "Refrigeradores", condition: "Excelente", price: "Consultar", image: "/seminuevos/seminuevo-refrigerador.png" },
  { id: "2", name: "Lavadora Mabe automática 17 kg", category: "Lavadoras", condition: "Muy bueno", price: "Consultar", image: "/seminuevos/seminuevo-lavadora.png" },
  { id: "3", name: "Estufa de 4 quemadores", category: "Estufas", condition: "Bueno", price: "Consultar", image: "/seminuevos/seminuevo-estufa.png" },
  { id: "4", name: "Minisplit 1.5 ton", category: "Aires acondicionados", condition: "Excelente", price: "Consultar", image: "/seminuevos/seminuevo-minisplit.png" },
  { id: "5", name: "Microondas LG", category: "Microondas", condition: "Muy bueno", price: "Consultar", image: "/seminuevos/seminuevo-microondas.png" },
  { id: "6", name: "Refrigerador comercial", category: "Refrigeración industrial", condition: "Bueno", price: "Consultar", image: "/seminuevos/seminuevo-comercial.png" },
  { id: "7", name: "Licuadora industrial", category: "Licuadoras", condition: "Excelente", price: "Consultar", image: "/seminuevos/seminuevo-licuadora.png" },
  { id: "8", name: "Secadora de ropa", category: "Lavadoras", condition: "Muy bueno", price: "Consultar", image: "/seminuevos/seminuevo-secadora.png" },
  { id: "9", name: "Horno de microondas Samsung", category: "Microondas", condition: "Bueno", price: "Consultar", image: "/seminuevos/seminuevo-horno.png" },
  { id: "10", name: "Congelador vertical", category: "Refrigeradores", condition: "Excelente", price: "Consultar", image: "/seminuevos/seminuevo-congelador.png" },
];

const CATEGORIES_SEM = Array.from(new Set(MOCK_SEMINUEVOS.map((s) => s.category)));

export function getSeminuevosByCategory(category: string | null): SeminuevoItem[] {
  if (!category) return MOCK_SEMINUEVOS;
  return MOCK_SEMINUEVOS.filter((s) => s.category === category);
}

export { CATEGORIES_SEM };
