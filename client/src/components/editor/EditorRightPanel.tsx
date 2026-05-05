import { Wand2, Sparkles, Download } from "lucide-react";
import { FiltersPanel } from "./panels/FiltersPanel";
import { useNavigate } from "react-router-dom";

interface EditorRightPanelProps {
  activeObject: any;
  onUpdateProperty: (prop: string, value: any) => void;
  onExport: () => void;
  artworkUrl: string | null;
  productName: string;
  onTryOn: () => void;
}

export const EditorRightPanel = ({
  activeObject, onUpdateProperty, onExport, artworkUrl, productName, onTryOn,
}: EditorRightPanelProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Properties inspector */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeObject ? (
          <div className="p-4 space-y-5">
            {/* Object info header */}
            <div className="pb-3 border-b border-white/5">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Properties</p>
              <p className="text-sm font-bold text-white mt-1">{(activeObject as any).objectName || activeObject.type}</p>
            </div>

            {/* Transform controls */}
            <div>
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5 px-1">Transform</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "X", prop: "left", value: Math.round(activeObject.left || 0) },
                  { label: "Y", prop: "top", value: Math.round(activeObject.top || 0) },
                  { label: "W", prop: "width", value: Math.round((activeObject.width || 0) * (activeObject.scaleX || 1)) },
                  { label: "H", prop: "height", value: Math.round((activeObject.height || 0) * (activeObject.scaleY || 1)) },
                  { label: "R", prop: "angle", value: Math.round(activeObject.angle || 0) },
                ].map(({ label, prop, value }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-zinc-600 w-4">{label}</span>
                    <input type="number" value={value}
                      onChange={(e) => {
                        const v = parseInt(e.target.value) || 0;
                        if (prop === "width") {
                          const scale = v / (activeObject.width || 1);
                          onUpdateProperty("scaleX", scale);
                        } else if (prop === "height") {
                          const scale = v / (activeObject.height || 1);
                          onUpdateProperty("scaleY", scale);
                        } else {
                          onUpdateProperty(prop, v);
                        }
                      }}
                      className="flex-1 p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-mono text-center focus:outline-none focus:border-violet-500/40 w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Filters / appearance */}
            <FiltersPanel activeObject={activeObject} onUpdateProperty={onUpdateProperty} />
          </div>
        ) : (
          /* No selection — show design info */
          <div className="p-4 space-y-6">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Design</p>
              <h3 className="text-lg font-black text-white">Custom Creation</h3>
              <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest italic">
                {productName}
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Quick Tips</p>
              <ul className="space-y-2 text-[11px] text-zinc-400 leading-relaxed">
                <li className="flex gap-2"><span className="text-violet-400">⌨</span> Ctrl+Z to undo</li>
                <li className="flex gap-2"><span className="text-violet-400">⌨</span> Del to delete</li>
                <li className="flex gap-2"><span className="text-violet-400">⌨</span> Ctrl+D to duplicate</li>
                <li className="flex gap-2"><span className="text-violet-400">🖱</span> Scroll to zoom</li>
                <li className="flex gap-2"><span className="text-violet-400">↕</span> Arrow keys to nudge</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/5 space-y-3 shrink-0">
        <button onClick={onExport}
          className="w-full py-3.5 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <Download className="w-4 h-4" />
          Export Design
        </button>

        <button onClick={onTryOn}
          className="w-full py-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all shadow-[0_10px_30px_-5px_rgba(139,92,246,0.35)] active:scale-[0.98]">
          <Sparkles className="w-5 h-5 fill-white" />
          Try It On Me!
        </button>

        <div onClick={() => navigate("/generate")}
          className="p-3 flex items-center gap-3 group cursor-pointer hover:bg-white/[0.03] rounded-xl transition-all">
          <div className="w-9 h-9 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform shrink-0">
            <Wand2 className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">Not feeling it?</p>
            <p className="text-xs text-white font-bold group-hover:text-violet-400 transition-colors">New AI Artwork</p>
          </div>
        </div>
      </div>
    </div>
  );
};
