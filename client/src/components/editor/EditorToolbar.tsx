import { Undo2, Redo2, ZoomIn, ZoomOut, Maximize2, Copy, Trash2, Lock, ArrowUpToLine, ArrowDownToLine, Download, FlipHorizontal, FlipVertical } from "lucide-react";

interface EditorToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onExport: () => void;
  onFlipH: () => void;
  onFlipV: () => void;
  hasSelection: boolean;
}

export const EditorToolbar = ({
  canUndo, canRedo, zoom, onUndo, onRedo, onZoomIn, onZoomOut,
  onFitToScreen, onDuplicate, onDelete, onBringForward, onSendBackward,
  onExport, onFlipH, onFlipV, hasSelection,
}: EditorToolbarProps) => {
  const Btn = ({ onClick, disabled, children, title }: { onClick: () => void; disabled?: boolean; children: React.ReactNode; title: string }) => (
    <button onClick={onClick} disabled={disabled} title={title}
      className={`p-2 rounded-lg transition-all ${disabled ? "text-zinc-700 cursor-not-allowed" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-white/5 mx-1" />;

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-2xl">
      {/* History */}
      <Btn onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)"><Undo2 className="w-4 h-4" /></Btn>
      <Btn onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)"><Redo2 className="w-4 h-4" /></Btn>

      <Divider />

      {/* Zoom */}
      <Btn onClick={onZoomOut} title="Zoom Out"><ZoomOut className="w-4 h-4" /></Btn>
      <span className="text-[10px] font-bold text-zinc-500 w-10 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
      <Btn onClick={onZoomIn} title="Zoom In"><ZoomIn className="w-4 h-4" /></Btn>
      <Btn onClick={onFitToScreen} title="Fit to Screen"><Maximize2 className="w-4 h-4" /></Btn>

      <Divider />

      {/* Object actions */}
      <Btn onClick={onDuplicate} disabled={!hasSelection} title="Duplicate (Ctrl+D)"><Copy className="w-4 h-4" /></Btn>
      <Btn onClick={onDelete} disabled={!hasSelection} title="Delete"><Trash2 className="w-4 h-4" /></Btn>

      <Divider />

      {/* Flip */}
      <Btn onClick={onFlipH} disabled={!hasSelection} title="Flip Horizontal"><FlipHorizontal className="w-4 h-4" /></Btn>
      <Btn onClick={onFlipV} disabled={!hasSelection} title="Flip Vertical"><FlipVertical className="w-4 h-4" /></Btn>

      <Divider />

      {/* Order */}
      <Btn onClick={onBringForward} disabled={!hasSelection} title="Bring Forward"><ArrowUpToLine className="w-4 h-4" /></Btn>
      <Btn onClick={onSendBackward} disabled={!hasSelection} title="Send Backward"><ArrowDownToLine className="w-4 h-4" /></Btn>

      <Divider />

      {/* Export */}
      <Btn onClick={onExport} title="Export as PNG"><Download className="w-4 h-4" /></Btn>
    </div>
  );
};
