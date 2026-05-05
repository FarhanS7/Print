import { Eye, EyeOff, Lock, Unlock, GripVertical } from "lucide-react";
import type { EditorObject } from "../hooks/useEditorCanvas";

interface LayersPanelProps {
  objects: EditorObject[];
  activeObjectId: string | null;
  onSelect: (obj: any) => void;
  onToggleVisibility: (obj: any) => void;
  onToggleLock: (obj: any) => void;
}

export const LayersPanel = ({ objects, activeObjectId, onSelect, onToggleVisibility, onToggleLock }: LayersPanelProps) => {
  const reversed = [...objects].reverse();

  if (objects.length === 0) {
    return (
      <div className="text-center py-10 space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mx-auto">
          <GripVertical className="w-6 h-6 text-zinc-700" />
        </div>
        <p className="text-sm font-bold text-zinc-500">No layers yet</p>
        <p className="text-[10px] text-zinc-600 mt-1">Add text, shapes, or images</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    if (type === "i-text" || type === "text") return "T";
    if (type === "image") return "🖼";
    if (type === "rect") return "□";
    if (type === "circle") return "○";
    if (type === "triangle") return "△";
    if (type === "line") return "─";
    return "◆";
  };

  return (
    <div className="space-y-1">
      <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5 px-1">Layers ({objects.length})</p>
      {reversed.map((obj) => {
        const isActive = activeObjectId === obj.id || (obj.fabricObject as any).__uid === activeObjectId;
        return (
          <div key={obj.id} onClick={() => onSelect(obj.fabricObject)}
            className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all group ${isActive ? "bg-violet-500/10 border border-violet-500/30" : "border border-transparent hover:bg-white/[0.03]"}`}>
            <GripVertical className="w-3.5 h-3.5 text-zinc-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${isActive ? "bg-violet-500/20 text-violet-400" : "bg-white/[0.03] text-zinc-500"}`}>
              {getIcon(obj.type)}
            </div>
            <span className={`flex-1 text-xs font-medium truncate ${isActive ? "text-white" : "text-zinc-400"} ${!obj.visible ? "opacity-40 line-through" : ""}`}>{obj.name}</span>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(obj.fabricObject); }} className="p-1.5 rounded-md hover:bg-white/10">
                {obj.visible ? <Eye className="w-3.5 h-3.5 text-zinc-400" /> : <EyeOff className="w-3.5 h-3.5 text-zinc-600" />}
              </button>
              <button onClick={(e) => { e.stopPropagation(); onToggleLock(obj.fabricObject); }} className="p-1.5 rounded-md hover:bg-white/10">
                {obj.locked ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Unlock className="w-3.5 h-3.5 text-zinc-400" />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
