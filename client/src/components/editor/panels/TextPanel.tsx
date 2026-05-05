// ─── Text panel ───────────────────────────────────────────────────────────────
import { Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";
import { EDITOR_FONTS, COLOR_PRESETS } from "../utils/printableZones";

interface TextPanelProps {
  onAddText: (preset: "heading" | "subheading" | "body") => void;
  activeObject: any | null;
  onUpdateProperty: (prop: string, value: any) => void;
}

export const TextPanel = ({ onAddText, activeObject, onUpdateProperty }: TextPanelProps) => {
  const isTextSelected = activeObject && (activeObject.type === "i-text" || activeObject.type === "textbox" || activeObject.type === "text");

  return (
    <div className="space-y-5">
      {/* Quick add buttons */}
      <div className="space-y-2">
        <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-1">Add Text</p>
        {[
          { preset: "heading" as const, label: "Add Heading", size: "text-lg font-black" },
          { preset: "subheading" as const, label: "Add Subheading", size: "text-sm font-bold" },
          { preset: "body" as const, label: "Add Body Text", size: "text-xs font-medium" },
        ].map(({ preset, label, size }) => (
          <button
            key={preset}
            onClick={() => onAddText(preset)}
            className="w-full p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all text-left flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 group-hover:bg-violet-500/20 transition-colors">
              <Type className="w-4 h-4 text-violet-400" />
            </div>
            <span className={`text-zinc-300 ${size} group-hover:text-white transition-colors`}>
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Text editing controls (shown when text is selected) */}
      {isTextSelected && (
        <div className="space-y-4 pt-4 border-t border-white/5 animate-slide-up">
          {/* Font family */}
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Font Family</p>
            <select
              value={activeObject.fontFamily || "Inter, sans-serif"}
              onChange={(e) => onUpdateProperty("fontFamily", e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500/40 appearance-none cursor-pointer"
            >
              {EDITOR_FONTS.map((font) => (
                <option key={font.name} value={font.family} style={{ fontFamily: font.family, background: "#1a1a2e" }}>
                  {font.name} — {font.style}
                </option>
              ))}
            </select>
          </div>

          {/* Font size */}
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Font Size</p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="8"
                max="120"
                value={activeObject.fontSize || 24}
                onChange={(e) => onUpdateProperty("fontSize", parseInt(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <span className="text-white text-sm font-mono w-10 text-right tabular-nums">
                {activeObject.fontSize || 24}
              </span>
            </div>
          </div>

          {/* Style toggles */}
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Style</p>
            <div className="flex gap-1.5">
              <button
                onClick={() => onUpdateProperty("fontWeight", activeObject.fontWeight === "bold" ? "normal" : "bold")}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.fontWeight === "bold"
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateProperty("fontStyle", activeObject.fontStyle === "italic" ? "normal" : "italic")}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.fontStyle === "italic"
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateProperty("underline", !activeObject.underline)}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.underline
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <Underline className="w-4 h-4" />
              </button>

              <div className="w-px bg-white/5 mx-1" />

              <button
                onClick={() => onUpdateProperty("textAlign", "left")}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.textAlign === "left"
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateProperty("textAlign", "center")}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.textAlign === "center"
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => onUpdateProperty("textAlign", "right")}
                className={`p-2.5 rounded-lg border transition-all ${
                  activeObject.textAlign === "right"
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-400"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20"
                }`}
              >
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Letter spacing */}
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Letter Spacing</p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="-100"
                max="800"
                value={activeObject.charSpacing || 0}
                onChange={(e) => onUpdateProperty("charSpacing", parseInt(e.target.value))}
                className="flex-1 accent-violet-500"
              />
              <span className="text-white text-sm font-mono w-10 text-right tabular-nums">
                {activeObject.charSpacing || 0}
              </span>
            </div>
          </div>

          {/* Text color */}
          <div>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Color</p>
            <div className="flex flex-wrap gap-1.5">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => onUpdateProperty("fill", color)}
                  className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${
                    activeObject.fill === color
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
                value={typeof activeObject.fill === "string" ? activeObject.fill : "#ffffff"}
                onChange={(e) => onUpdateProperty("fill", e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input
                type="text"
                value={typeof activeObject.fill === "string" ? activeObject.fill : "#ffffff"}
                onChange={(e) => onUpdateProperty("fill", e.target.value)}
                className="flex-1 p-2 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-violet-500/40"
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
