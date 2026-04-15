import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Move, ZoomIn, ZoomOut, RotateCcw, Save, Trash2 } from "lucide-react";

interface EditorCanvasProps {
  artworkUrl: string;
  productMockupUrl: string;
  onSave: (placement: any) => void;
}

export const EditorCanvas = ({
  artworkUrl,
  productMockupUrl,
  onSave,
}: EditorCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "transparent",
    });
    fabricCanvasRef.current = canvas;

    // Load Product Mockup as Background
    fabric.Image.fromURL(productMockupUrl, {
      crossOrigin: "anonymous",
    }).then((img) => {
      img.set({
        selectable: false,
        evented: false,
      });
      // Scale and center the mockup
      img.scaleToWidth(canvas.width!);
      canvas.add(img);
      canvas.moveObjectTo(img, 0);
    });

    // Load Artwork
    fabric.Image.fromURL(artworkUrl, {
      crossOrigin: "anonymous",
    }).then((img) => {
      img.set({
        left: canvas.width! / 2,
        top: canvas.height! / 2,
        originX: "center",
        originY: "center",
        transparentCorners: false,
        borderColor: "#8b5cf6",
        cornerColor: "#8b5cf6",
        cornerStyle: "circle",
        cornerStrokeColor: "#ffffff",
        padding: 10,
      });
      img.scaleToWidth(200);
      canvas.add(img);
      canvas.setActiveObject(img);
    });

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, [artworkUrl, productMockupUrl]);

  const handleZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(zoom + delta, 0.5), 2);
    setZoom(newZoom);
    fabricCanvasRef.current?.setZoom(newZoom);
  };

  const handleResetRotation = () => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      activeObject.set({ angle: 0 });
      fabricCanvasRef.current?.renderAll();
    }
  };

  const handleSave = () => {
    const activeObject = fabricCanvasRef.current?.getActiveObject();
    if (activeObject) {
      const placement = {
        x: activeObject.left,
        y: activeObject.top,
        scale: activeObject.scaleX,
        rotation: activeObject.angle,
        width: activeObject.width! * activeObject.scaleX!,
        height: activeObject.height! * activeObject.scaleY!,
      };
      onSave(placement);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative glass-morphism rounded-3xl overflow-hidden shadow-2xl p-1 bg-zinc-900">
        <canvas ref={canvasRef} />

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={handleResetRotation}
            className="p-3 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
            <Move className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Drag to reposition artwork
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full max-w-[500px]">
        <button
          onClick={handleSave}
          className="flex-1 py-4 bg-violet-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-violet-500 shadow-xl transition-all active:scale-95"
        >
          <Save className="w-5 h-5" />
          Save & Preview
        </button>
        <button className="p-4 bg-white/5 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-500/10 transition-all">
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
