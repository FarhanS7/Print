import { useRef } from "react";

interface EditorCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const EditorCanvas = ({ canvasRef }: EditorCanvasProps) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Decorative ambient glow */}
      <div className="absolute inset-0 bg-violet-600/[0.03] blur-[80px] rounded-full pointer-events-none" />

      {/* Canvas container with subtle border */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/[0.06]">
        {/* Top shine line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10 pointer-events-none" />

        <canvas ref={canvasRef} />

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};
