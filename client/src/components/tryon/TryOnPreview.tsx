import { Download, IterationCcw, Share2, ZoomIn } from "lucide-react";

interface TryOnPreviewProps {
  previewUrl: string;
  onRegenerate: () => void;
  onReset: () => void;
}

export const TryOnPreview = ({ previewUrl, onRegenerate, onReset }: TryOnPreviewProps) => {
  
  const handleDownload = async () => {
    try {
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `printify-tryon-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error("Failed to download image", e);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both">
      
      {/* Result Container (8 Cols) */}
      <div className="lg:col-span-8 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 relative group aspect-[3/4] lg:aspect-auto min-h-[500px]">
        <img 
          src={previewUrl} 
          alt="Virtual Try-On Result" 
          className="w-full h-full object-cover"
        />
        
        {/* Floating actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-3 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Watermark/Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
           <span className="text-white text-[10px] font-bold uppercase tracking-widest">AI Generated</span>
        </div>
      </div>

      {/* Actions (4 Cols) */}
      <div className="lg:col-span-4 space-y-6">
         <div className="glass-morphism p-6 rounded-3xl space-y-4">
            <h3 className="text-2xl font-black text-white">Your Try-On</h3>
            <p className="text-zinc-400 text-sm">
              Here is your preview! Note that AI generation may have slight variations from real-life physical garments.
            </p>

            <div className="pt-4 space-y-3">
              <button 
                onClick={handleDownload}
                className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Download className="w-5 h-5" />
                Download Image
              </button>
              
              <button 
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors border border-white/5"
              >
                <Share2 className="w-5 h-5 text-zinc-400" />
                Share Creation
              </button>
            </div>
         </div>

         <div className="glass-morphism p-6 rounded-3xl space-y-4 border border-zinc-800">
            <h4 className="text-white font-bold">Want changes?</h4>
            <div className="space-y-2">
               <button 
                 onClick={onRegenerate}
                 className="w-full py-3 bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5"
               >
                 <IterationCcw className="w-4 h-4 text-violet-400" />
                 Regenerate
               </button>
               <button 
                 onClick={onReset}
                 className="w-full py-3 bg-transparent hover:bg-white/5 text-zinc-500 text-sm font-bold rounded-xl flex items-center justify-center transition-colors"
               >
                 Try Another Design
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};
