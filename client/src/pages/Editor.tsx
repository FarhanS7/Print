import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { EditorCanvas } from "../components/editor/EditorCanvas";
import { EditorToolbar } from "../components/editor/EditorToolbar";
import { EditorLeftPanel } from "../components/editor/EditorLeftPanel";
import { EditorRightPanel } from "../components/editor/EditorRightPanel";
import { useEditorCanvas } from "../components/editor/hooks/useEditorCanvas";
import { useKeyboardShortcuts } from "../components/editor/hooks/useKeyboardShortcuts";
import { PRODUCTS } from "../components/editor/utils/printableZones";
import { Sparkles } from "lucide-react";

const Editor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [artworkUrl, setArtworkUrl] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const canvasElRef = useRef<HTMLCanvasElement>(null);

  // Extract artwork URL from query params
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const url = query.get("artwork");
    if (url) setArtworkUrl(url);
  }, [location]);

  // Initialize the editor canvas hook
  const editor = useEditorCanvas(canvasElRef, artworkUrl, selectedProduct, selectedColorIndex);

  // Handle product change — reset color index
  const handleSelectProduct = useCallback((product: typeof selectedProduct) => {
    setSelectedProduct(product);
    setSelectedColorIndex(0);
  }, []);

  // Flip handlers
  const handleFlipH = useCallback(() => {
    if (editor.activeObject) {
      editor.updateObjectProperty("flipX", !editor.activeObject.flipX);
    }
  }, [editor]);

  const handleFlipV = useCallback(() => {
    if (editor.activeObject) {
      editor.updateObjectProperty("flipY", !editor.activeObject.flipY);
    }
  }, [editor]);

  // Try-on handler
  const handleTryOn = useCallback(async () => {
    try {
      const placement = editor.getPlacementData();
      const designResp = await fetch(`${import.meta.env.VITE_API_URL}/api/designs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          artworkUrl: artworkUrl,
          artworkPlacement: placement,
          title: "Custom Creation",
          tryOnEnabled: true,
        }),
      });
      const designData = await designResp.json();
      if (designData.success) {
        navigate(`/try-on?designId=${designData.data.design._id}`);
      }
    } catch (error) {
      console.error("Failed to transition to try-on:", error);
    }
  }, [selectedProduct, artworkUrl, editor, navigate]);

  // Keyboard shortcuts
  const shortcutActions = useMemo(() => ({
    undo: editor.undo,
    redo: editor.redo,
    deleteSelected: editor.deleteSelected,
    duplicateSelected: editor.duplicateSelected,
    selectAll: editor.selectAll,
    deselect: editor.deselect,
    nudge: editor.nudge,
    zoomIn: () => editor.handleZoom(0.1),
    zoomOut: () => editor.handleZoom(-0.1),
  }), [editor]);

  useKeyboardShortcuts(shortcutActions);

  // Loading state
  if (!artworkUrl) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/5 border-t-violet-500 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-violet-400 animate-pulse" />
        </div>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Loading Editor...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 flex flex-col overflow-hidden">
      {/* Atmospheric flares */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-violet-600/[0.03] to-transparent pointer-events-none z-0" />
      <div className="absolute top-[20%] -right-48 w-96 h-96 glow-aura-fuchsia opacity-10 pointer-events-none z-0" />

      <Navbar />

      {/* Editor layout: full viewport below navbar */}
      <main className="flex-1 flex relative z-10 pt-[72px] overflow-hidden">
        {/* Left Panel */}
        <div className="w-[280px] shrink-0 border-r border-white/[0.04] bg-black/20 backdrop-blur-sm flex flex-col">
          <EditorLeftPanel
            products={PRODUCTS}
            selectedProduct={selectedProduct}
            selectedColorIndex={selectedColorIndex}
            onSelectProduct={handleSelectProduct}
            onSelectColor={setSelectedColorIndex}
            onAddText={editor.addText}
            onAddShape={editor.addShape}
            onAddImage={editor.addImage}
            objects={editor.objects}
            activeObject={editor.activeObject}
            onSelectObject={editor.selectObject}
            onToggleVisibility={editor.toggleVisibility}
            onToggleLock={editor.toggleLock}
            onUpdateProperty={editor.updateObjectProperty}
          />
        </div>

        {/* Center: Canvas + Toolbar */}
        <div className="flex-1 flex flex-col items-center justify-center relative bg-zinc-950/80 overflow-hidden">
          {/* Canvas area */}
          <div className="flex-1 flex items-center justify-center p-6">
            <EditorCanvas canvasRef={canvasElRef} />
          </div>

          {/* Floating toolbar at bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-slide-up">
            <EditorToolbar
              canUndo={editor.canUndo}
              canRedo={editor.canRedo}
              zoom={editor.zoom}
              onUndo={editor.undo}
              onRedo={editor.redo}
              onZoomIn={() => editor.handleZoom(0.1)}
              onZoomOut={() => editor.handleZoom(-0.1)}
              onFitToScreen={editor.fitToScreen}
              onDuplicate={editor.duplicateSelected}
              onDelete={editor.deleteSelected}
              onBringForward={editor.bringForward}
              onSendBackward={editor.sendBackward}
              onExport={editor.exportDesign}
              onFlipH={handleFlipH}
              onFlipV={handleFlipV}
              hasSelection={!!editor.activeObject}
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[280px] shrink-0 border-l border-white/[0.04] bg-black/20 backdrop-blur-sm flex flex-col">
          <EditorRightPanel
            activeObject={editor.activeObject}
            onUpdateProperty={editor.updateObjectProperty}
            onExport={editor.exportDesign}
            artworkUrl={artworkUrl}
            productName={selectedProduct.name}
            onTryOn={handleTryOn}
          />
        </div>
      </main>
    </div>
  );
};

export default Editor;
