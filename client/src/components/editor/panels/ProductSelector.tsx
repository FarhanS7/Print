// ─── Product selector panel ───────────────────────────────────────────────────
import { type ProductConfig } from "../utils/printableZones";

interface ProductSelectorProps {
  products: ProductConfig[];
  selectedProduct: ProductConfig;
  selectedColorIndex: number;
  onSelectProduct: (product: ProductConfig) => void;
  onSelectColor: (index: number) => void;
}

export const ProductSelector = ({
  products,
  selectedProduct,
  selectedColorIndex,
  onSelectProduct,
  onSelectColor,
}: ProductSelectorProps) => {
  return (
    <div className="space-y-3">
      {/* Product cards */}
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onSelectProduct(product)}
          className={`w-full p-3 rounded-2xl border transition-all duration-300 text-left flex items-center gap-3 group relative overflow-hidden ${
            selectedProduct.id === product.id
              ? "bg-violet-600/10 border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.08)]"
              : "bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]"
          }`}
        >
          <div className="w-11 h-11 bg-zinc-900 rounded-xl overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-500 shrink-0">
            <img
              src={product.colors[0].mockupUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 min-w-0">
            <h4 className="text-white font-bold text-sm truncate">{product.name}</h4>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-0.5">
              {product.category}
            </p>
          </div>
          {selectedProduct.id === product.id && (
            <div className="ml-auto w-2 h-2 rounded-full bg-violet-500 shrink-0 animate-pulse" />
          )}
        </button>
      ))}

      {/* Color selector for selected product */}
      {selectedProduct.colors.length > 1 && (
        <div className="pt-3 border-t border-white/5">
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5 px-1">
            Color Variant
          </p>
          <div className="flex gap-2 flex-wrap">
            {selectedProduct.colors.map((color, i) => (
              <button
                key={color.hex}
                onClick={() => onSelectColor(i)}
                title={color.name}
                className={`w-8 h-8 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                  selectedColorIndex === i
                    ? "border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.3)] scale-110"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ backgroundColor: color.hex }}
              >
                {selectedColorIndex === i && (
                  <svg className="w-full h-full p-1" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke={color.hex === "#FFFFFF" || color.hex === "#f5f0e8" ? "#000" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
