import { Upload, ImagePlus } from "lucide-react";
import { useRef } from "react";

interface UploadPanelProps {
  onAddImage: (url: string) => void;
}

export const UploadPanel = ({ onAddImage }: UploadPanelProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) onAddImage(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-white/10 hover:border-violet-500/30 rounded-2xl p-8 text-center cursor-pointer hover:bg-violet-500/5 transition-all group"
      >
        <Upload className="w-10 h-10 text-zinc-600 mx-auto mb-3 group-hover:text-violet-400 transition-colors" />
        <p className="text-sm font-bold text-zinc-400 group-hover:text-white transition-colors">Drop image here</p>
        <p className="text-[10px] text-zinc-600 mt-1">or click to browse</p>
        <p className="text-[9px] text-zinc-700 mt-2">PNG, JPG, SVG, WebP</p>
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />

      <button onClick={() => fileRef.current?.click()}
        className="w-full p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all flex items-center gap-3 group">
        <ImagePlus className="w-5 h-5 text-violet-400" />
        <span className="text-sm font-bold text-violet-300">Browse Files</span>
      </button>
    </div>
  );
};
