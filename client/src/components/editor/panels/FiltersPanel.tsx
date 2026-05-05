import { COLOR_PRESETS } from "../utils/printableZones";
import { SunMedium, Contrast, Droplets } from "lucide-react";

interface FiltersPanelProps {
  activeObject: any | null;
  onUpdateProperty: (prop: string, value: any) => void;
}

export const FiltersPanel = ({ activeObject, onUpdateProperty }: FiltersPanelProps) => {
  const isImage = activeObject && activeObject.type === "image";

  if (!activeObject) {
    return (
      <div className="text-center py-10 space-y-3">
        <SunMedium className="w-10 h-10 text-zinc-700 mx-auto" />
        <p className="text-sm font-bold text-zinc-500">Select an object</p>
        <p className="text-[10px] text-zinc-600">to adjust its properties</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Opacity — works for all objects */}
      <div>
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Opacity</p>
        <div className="flex items-center gap-3">
          <input type="range" min="0" max="100" value={Math.round((activeObject.opacity ?? 1) * 100)}
            onChange={(e) => onUpdateProperty("opacity", parseInt(e.target.value) / 100)}
            className="flex-1 accent-violet-500" />
          <span className="text-white text-sm font-mono w-10 text-right tabular-nums">
            {Math.round((activeObject.opacity ?? 1) * 100)}%
          </span>
        </div>
      </div>

      {/* Fill color — for shapes */}
      {activeObject.type !== "image" && activeObject.type !== "i-text" && (
        <div>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Fill Color</p>
          <div className="flex flex-wrap gap-1.5">
            {COLOR_PRESETS.slice(0, 10).map((color) => (
              <button key={color} onClick={() => onUpdateProperty("fill", color)}
                className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${activeObject.fill === color ? "border-violet-500 scale-110" : "border-white/10"}`}
                style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="color" value={typeof activeObject.fill === "string" ? activeObject.fill : "#8b5cf6"}
              onChange={(e) => onUpdateProperty("fill", e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="text" value={typeof activeObject.fill === "string" ? activeObject.fill : ""}
              onChange={(e) => onUpdateProperty("fill", e.target.value)}
              className="flex-1 p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500/40" />
          </div>
        </div>
      )}

      {/* Stroke */}
      {activeObject.type !== "image" && (
        <div>
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Stroke</p>
          <div className="flex items-center gap-2">
            <input type="color" value={activeObject.stroke || "#ffffff"}
              onChange={(e) => onUpdateProperty("stroke", e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <input type="range" min="0" max="10" value={activeObject.strokeWidth || 0}
              onChange={(e) => onUpdateProperty("strokeWidth", parseInt(e.target.value))}
              className="flex-1 accent-violet-500" />
            <span className="text-white text-xs font-mono w-6 text-right">{activeObject.strokeWidth || 0}</span>
          </div>
        </div>
      )}

      {/* Image-specific filters */}
      {isImage && (
        <div className="space-y-4 pt-3 border-t border-white/5">
          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1">Image Adjustments</p>
          <p className="text-[10px] text-zinc-600 px-1">Brightness, contrast, and saturation filters are applied via Fabric.js image filters on export.</p>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <SunMedium className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[10px] text-zinc-400 font-medium">Brightness</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <Contrast className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-[10px] text-zinc-400 font-medium">Contrast</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[10px] text-zinc-400 font-medium">Saturation</span>
          </div>
        </div>
      )}
    </div>
  );
};
