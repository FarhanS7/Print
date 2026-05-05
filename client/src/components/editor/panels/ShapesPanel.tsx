// ─── Shapes panel ─────────────────────────────────────────────────────────────
import { SHAPE_PRESETS, COLOR_PRESETS } from "../utils/printableZones";
import { useState } from "react";

interface ShapesPanelProps {
  onAddShape: (type: string, fill: string) => void;
}

export const ShapesPanel = ({ onAddShape }: ShapesPanelProps) => {
  const [selectedColor, setSelectedColor] = useState("#8b5cf6");

  return (
    <div className="space-y-5">
      {/* Shape presets */}
      <div>
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5 px-1">Shapes</p>
        <div className="grid grid-cols-3 gap-2">
          {SHAPE_PRESETS.map((shape) => (
            <button
              key={shape.type}
              onClick={() => onAddShape(shape.type, selectedColor)}
              className="aspect-square rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all flex flex-col items-center justify-center gap-1.5 group"
            >
              <span className="text-2xl text-zinc-400 group-hover:text-violet-400 transition-colors" style={{ color: selectedColor }}>
                {shape.icon}
              </span>
              <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
                {shape.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shape color */}
      <div>
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Fill Color</p>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_PRESETS.slice(0, 10).map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${
                selectedColor === color
                  ? "border-violet-500 scale-110 shadow-[0_0_8px_rgba(139,92,246,0.3)]"
                  : "border-white/10"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500/40"
          />
        </div>
      </div>
    </div>
  );
};
