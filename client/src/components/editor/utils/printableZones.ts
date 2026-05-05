// ─── Product definitions with printable zone coordinates ──────────────────────
// All coordinates are relative to a 500×600 canvas

export interface PrintZone {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  mockupUrl: string;
}

export interface ProductConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: ProductColor[];
  printZone: PrintZone;
}

export const PRODUCTS: ProductConfig[] = [
  {
    id: "tee-1",
    name: "Premium Tee",
    category: "T-SHIRT",
    description: "Heavyweight 100% cotton, DTG print",
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        mockupUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Black",
        hex: "#0a0a0a",
        mockupUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Navy",
        hex: "#1e293b",
        mockupUrl: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&auto=format&fit=crop&q=60",
      },
    ],
    printZone: { x: 150, y: 115, width: 200, height: 260 },
  },
  {
    id: "hoodie-1",
    name: "Classic Hoodie",
    category: "APPAREL",
    description: "Fleece-lined pullover, sublimation print",
    colors: [
      {
        name: "Charcoal",
        hex: "#374151",
        mockupUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Black",
        hex: "#0a0a0a",
        mockupUrl: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&auto=format&fit=crop&q=60",
      },
    ],
    printZone: { x: 140, y: 130, width: 220, height: 240 },
  },
  {
    id: "case-1",
    name: "Phone Case",
    category: "ACCESSORIES",
    description: "Snap-fit polycarbonate, UV print",
    colors: [
      {
        name: "Clear",
        hex: "#FFFFFF",
        mockupUrl: "https://images.unsplash.com/photo-1541873676947-06c836934c9c?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Matte Black",
        hex: "#18181b",
        mockupUrl: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=60",
      },
    ],
    printZone: { x: 165, y: 80, width: 170, height: 350 },
  },
  {
    id: "tote-1",
    name: "Canvas Tote",
    category: "BAGS",
    description: "12oz organic cotton, screen print",
    colors: [
      {
        name: "Natural",
        hex: "#f5f0e8",
        mockupUrl: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&auto=format&fit=crop&q=60",
      },
      {
        name: "Black",
        hex: "#0a0a0a",
        mockupUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=60",
      },
    ],
    printZone: { x: 125, y: 100, width: 250, height: 280 },
  },
  {
    id: "mug-1",
    name: "Ceramic Mug",
    category: "DRINKWARE",
    description: "11oz ceramic, sublimation wrap",
    colors: [
      {
        name: "White",
        hex: "#FFFFFF",
        mockupUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=60",
      },
    ],
    printZone: { x: 100, y: 120, width: 300, height: 260 },
  },
];

// ─── Curated font list for text tool ──────────────────────────────────────────
export const EDITOR_FONTS = [
  { name: "Inter", family: "Inter, sans-serif", style: "Modern Sans" },
  { name: "Poppins", family: "Poppins, sans-serif", style: "Geometric" },
  { name: "Playfair Display", family: "'Playfair Display', serif", style: "Elegant Serif" },
  { name: "Bebas Neue", family: "'Bebas Neue', sans-serif", style: "Bold Display" },
  { name: "Permanent Marker", family: "'Permanent Marker', cursive", style: "Handwritten" },
  { name: "Oswald", family: "Oswald, sans-serif", style: "Condensed" },
  { name: "Raleway", family: "Raleway, sans-serif", style: "Thin Modern" },
  { name: "Montserrat", family: "Montserrat, sans-serif", style: "Classic Sans" },
  { name: "Roboto Slab", family: "'Roboto Slab', serif", style: "Slab Serif" },
  { name: "Dancing Script", family: "'Dancing Script', cursive", style: "Script" },
  { name: "Anton", family: "Anton, sans-serif", style: "Impact" },
  { name: "Pacifico", family: "Pacifico, cursive", style: "Fun Script" },
  { name: "Space Grotesk", family: "'Space Grotesk', sans-serif", style: "Tech" },
  { name: "Archivo Black", family: "'Archivo Black', sans-serif", style: "Ultra Bold" },
];

// ─── Color palette presets ────────────────────────────────────────────────────
export const COLOR_PRESETS = [
  "#FFFFFF", "#000000", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f43f5e", "#14b8a6", "#6366f1", "#a855f7", "#d946ef",
  "#0ea5e9", "#10b981", "#f59e0b", "#64748b", "#334155",
];

// ─── Shape presets ────────────────────────────────────────────────────────────
export type ShapeType = "rect" | "circle" | "triangle" | "star" | "line" | "diamond";

export const SHAPE_PRESETS: { type: ShapeType; label: string; icon: string }[] = [
  { type: "rect", label: "Rectangle", icon: "□" },
  { type: "circle", label: "Circle", icon: "○" },
  { type: "triangle", label: "Triangle", icon: "△" },
  { type: "diamond", label: "Diamond", icon: "◇" },
  { type: "star", label: "Star", icon: "☆" },
  { type: "line", label: "Line", icon: "─" },
];
