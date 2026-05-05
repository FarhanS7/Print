// ─── Undo / Redo history system ───────────────────────────────────────────────
import { useState, useCallback, useRef } from "react";
import type * as fabric from "fabric";

const MAX_HISTORY = 50;

export function useHistory(canvasRef: React.MutableRefObject<fabric.Canvas | null>) {
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const isRestoring = useRef(false);

  // Save current canvas state to undo stack
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRestoring.current) return;

    const json = JSON.stringify(canvas.toJSON(["isGuideLine", "isPrintZoneOverlay", "isMockupBackground", "objectName", "layerLocked"] as any));
    undoStack.current.push(json);

    // Trim if too long
    if (undoStack.current.length > MAX_HISTORY) {
      undoStack.current.shift();
    }

    // Clear redo stack on new action
    redoStack.current = [];
    setCanUndo(true);
    setCanRedo(false);
  }, [canvasRef]);

  // Undo last action
  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.current.length === 0) return;

    isRestoring.current = true;

    // Save current state to redo
    const currentState = JSON.stringify(canvas.toJSON(["isGuideLine", "isPrintZoneOverlay", "isMockupBackground", "objectName", "layerLocked"] as any));
    redoStack.current.push(currentState);

    // Pop last state from undo
    const prevState = undoStack.current.pop()!;
    
    canvas.loadFromJSON(prevState).then(() => {
      // Re-lock special objects
      canvas.getObjects().forEach((obj: any) => {
        if (obj.isPrintZoneOverlay || obj.isMockupBackground || obj.isGuideLine) {
          obj.set({ selectable: false, evented: false });
        }
      });
      canvas.renderAll();
      isRestoring.current = false;
      setCanUndo(undoStack.current.length > 0);
      setCanRedo(true);
    });
  }, [canvasRef]);

  // Redo last undone action
  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.current.length === 0) return;

    isRestoring.current = true;

    // Save current state to undo
    const currentState = JSON.stringify(canvas.toJSON(["isGuideLine", "isPrintZoneOverlay", "isMockupBackground", "objectName", "layerLocked"] as any));
    undoStack.current.push(currentState);

    // Pop last state from redo
    const nextState = redoStack.current.pop()!;

    canvas.loadFromJSON(nextState).then(() => {
      canvas.getObjects().forEach((obj: any) => {
        if (obj.isPrintZoneOverlay || obj.isMockupBackground || obj.isGuideLine) {
          obj.set({ selectable: false, evented: false });
        }
      });
      canvas.renderAll();
      isRestoring.current = false;
      setCanUndo(true);
      setCanRedo(redoStack.current.length > 0);
    });
  }, [canvasRef]);

  const clearHistory = useCallback(() => {
    undoStack.current = [];
    redoStack.current = [];
    setCanUndo(false);
    setCanRedo(false);
  }, []);

  return { saveState, undo, redo, canUndo, canRedo, clearHistory, isRestoring };
}
