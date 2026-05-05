// ─── Keyboard shortcuts for the editor ────────────────────────────────────────
import { useEffect } from "react";

interface ShortcutActions {
  undo: () => void;
  redo: () => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  selectAll: () => void;
  deselect: () => void;
  nudge: (dx: number, dy: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export function useKeyboardShortcuts(actions: ShortcutActions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture when typing in input fields
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const key = e.key.toLowerCase();

      // Undo: Ctrl+Z
      if (ctrl && !shift && key === "z") {
        e.preventDefault();
        actions.undo();
        return;
      }

      // Redo: Ctrl+Shift+Z or Ctrl+Y
      if ((ctrl && shift && key === "z") || (ctrl && key === "y")) {
        e.preventDefault();
        actions.redo();
        return;
      }

      // Delete: Delete or Backspace
      if (key === "delete" || key === "backspace") {
        e.preventDefault();
        actions.deleteSelected();
        return;
      }

      // Duplicate: Ctrl+D
      if (ctrl && key === "d") {
        e.preventDefault();
        actions.duplicateSelected();
        return;
      }

      // Select All: Ctrl+A
      if (ctrl && key === "a") {
        e.preventDefault();
        actions.selectAll();
        return;
      }

      // Deselect: Escape
      if (key === "escape") {
        e.preventDefault();
        actions.deselect();
        return;
      }

      // Nudge: Arrow keys (1px), Shift+Arrow (10px)
      const nudgeAmount = shift ? 10 : 1;
      if (key === "arrowleft") {
        e.preventDefault();
        actions.nudge(-nudgeAmount, 0);
      } else if (key === "arrowright") {
        e.preventDefault();
        actions.nudge(nudgeAmount, 0);
      } else if (key === "arrowup") {
        e.preventDefault();
        actions.nudge(0, -nudgeAmount);
      } else if (key === "arrowdown") {
        e.preventDefault();
        actions.nudge(0, nudgeAmount);
      }

      // Zoom: Ctrl++ / Ctrl+-
      if (ctrl && (key === "=" || key === "+")) {
        e.preventDefault();
        actions.zoomIn();
      }
      if (ctrl && key === "-") {
        e.preventDefault();
        actions.zoomOut();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [actions]);
}
