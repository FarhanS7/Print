import { useState } from "react";
import { Package, Type, Shapes, Layers, Upload, Sparkles } from "lucide-react";
import { ProductSelector } from "./panels/ProductSelector";
import { TextPanel } from "./panels/TextPanel";
import { ShapesPanel } from "./panels/ShapesPanel";
import { LayersPanel } from "./panels/LayersPanel";
import { UploadPanel } from "./panels/UploadPanel";
import type { ProductConfig } from "./utils/printableZones";
import type { EditorObject } from "./hooks/useEditorCanvas";

type TabId = "products" | "text" | "shapes" | "layers" | "upload";

interface EditorLeftPanelProps {
  products: ProductConfig[];
  selectedProduct: ProductConfig;
  selectedColorIndex: number;
  onSelectProduct: (p: ProductConfig) => void;
  onSelectColor: (i: number) => void;
  onAddText: (preset: "heading" | "subheading" | "body") => void;
  onAddShape: (type: string, fill: string) => void;
  onAddImage: (url: string) => void;
  objects: EditorObject[];
  activeObject: any;
  onSelectObject: (obj: any) => void;
  onToggleVisibility: (obj: any) => void;
  onToggleLock: (obj: any) => void;
  onUpdateProperty: (prop: string, value: any) => void;
}

const TABS: { id: TabId; icon: any; label: string }[] = [
  { id: "products", icon: Package, label: "Products" },
  { id: "text", icon: Type, label: "Text" },
  { id: "shapes", icon: Shapes, label: "Shapes" },
  { id: "upload", icon: Upload, label: "Upload" },
  { id: "layers", icon: Layers, label: "Layers" },
];

export const EditorLeftPanel = (props: EditorLeftPanelProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("products");

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="flex border-b border-white/5 shrink-0">
        {TABS.map(({ id, icon: Icon, label }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 flex flex-col items-center gap-1 transition-all relative ${
              activeTab === id ? "text-violet-400" : "text-zinc-600 hover:text-zinc-400"
            }`}>
            <Icon className="w-4 h-4" />
            <span className="text-[8px] font-bold uppercase tracking-wider">{label}</span>
            {activeTab === id && (
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-violet-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === "products" && (
          <ProductSelector
            products={props.products}
            selectedProduct={props.selectedProduct}
            selectedColorIndex={props.selectedColorIndex}
            onSelectProduct={props.onSelectProduct}
            onSelectColor={props.onSelectColor}
          />
        )}
        {activeTab === "text" && (
          <TextPanel
            onAddText={props.onAddText}
            activeObject={props.activeObject}
            onUpdateProperty={props.onUpdateProperty}
          />
        )}
        {activeTab === "shapes" && <ShapesPanel onAddShape={props.onAddShape} />}
        {activeTab === "upload" && <UploadPanel onAddImage={props.onAddImage} />}
        {activeTab === "layers" && (
          <LayersPanel
            objects={props.objects}
            activeObjectId={(props.activeObject as any)?.__uid || null}
            onSelect={props.onSelectObject}
            onToggleVisibility={props.onToggleVisibility}
            onToggleLock={props.onToggleLock}
          />
        )}
      </div>

      {/* Bottom info */}
      <div className="p-3 border-t border-white/5 shrink-0">
        <div className="p-3 bg-violet-600/5 border border-violet-500/10 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-violet-300/50 leading-relaxed font-medium">
            Designs are auto-scaled for production quality output.
          </p>
        </div>
      </div>
    </div>
  );
};
