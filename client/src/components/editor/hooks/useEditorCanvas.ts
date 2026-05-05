// ─── Core editor canvas state management ──────────────────────────────────────
import { useEffect, useRef, useState, useCallback } from "react";
import * as fabric from "fabric";
import type { ProductConfig } from "../utils/printableZones";
import { EDITOR_FONTS } from "../utils/printableZones";
import {
  createPrintZoneOverlay,
  getSnapGuides,
  drawGuideLines,
  clearGuideLines,
  createStarPoints,
  getNextObjectName,
  exportPrintZone,
  downloadDataUrl,
} from "../utils/canvasHelpers";
import { useHistory } from "./useHistory";

export interface EditorObject {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  fabricObject: fabric.FabricObject;
}

export function useEditorCanvas(
  canvasElRef: React.RefObject<HTMLCanvasElement | null>,
  artworkUrl: string | null,
  product: ProductConfig,
  selectedColorIndex: number
) {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [activeObject, setActiveObject] = useState<fabric.FabricObject | null>(null);
  const [objects, setObjects] = useState<EditorObject[]>([]);
  const [zoom, setZoom] = useState(1);
  const [canvasReady, setCanvasReady] = useState(false);

  const { saveState, undo, redo, canUndo, canRedo, clearHistory, isRestoring } = useHistory(canvasRef);

  // Sync object list from canvas
  const syncObjectList = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const editorObjects: EditorObject[] = [];
    canvas.getObjects().forEach((obj: any) => {
      if (obj.isPrintZoneOverlay || obj.isMockupBackground || obj.isGuideLine) return;
      editorObjects.push({
        id: obj.__uid || String(Math.random()),
        name: obj.objectName || obj.type || "Object",
        type: obj.type || "unknown",
        visible: obj.visible !== false,
        locked: !obj.selectable,
        fabricObject: obj,
      });
    });
    setObjects(editorObjects);
  }, []);

  // ─── Initialize canvas ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasElRef.current) return;

    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 500,
      height: 600,
      backgroundColor: "#1a1a2e",
      preserveObjectStacking: true,
      selection: true,
      selectionColor: "rgba(139, 92, 246, 0.15)",
      selectionBorderColor: "#8b5cf6",
      selectionLineWidth: 1.5,
    });

    // Set default object controls styling
    fabric.FabricObject.prototype.set({
      transparentCorners: false,
      borderColor: "#8b5cf6",
      cornerColor: "#8b5cf6",
      cornerStyle: "circle",
      cornerStrokeColor: "#ffffff",
      cornerSize: 9,
      padding: 8,
      borderDashArray: [4, 3],
    });

    canvasRef.current = canvas;

    // ─── Canvas events ────────────────────────────────────────────────────
    canvas.on("selection:created", (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    canvas.on("selection:updated", (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    canvas.on("selection:cleared", () => {
      setActiveObject(null);
    });

    // Save history on modifications
    canvas.on("object:modified", () => {
      saveState();
      syncObjectList();
    });
    canvas.on("object:added", () => {
      if (!isRestoring.current) {
        syncObjectList();
      }
    });
    canvas.on("object:removed", () => {
      syncObjectList();
    });

    // Snap guides on object moving
    canvas.on("object:moving", (e) => {
      if (e.target) {
        const guides = getSnapGuides(canvas, e.target, product.printZone);
        drawGuideLines(canvas, guides);
      }
    });
    canvas.on("object:moved", () => {
      clearGuideLines(canvas);
    });

    // Mouse wheel zoom
    canvas.on("mouse:wheel", (opt) => {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom();
      newZoom *= 0.999 ** delta;
      newZoom = Math.min(Math.max(0.3, newZoom), 3);
      canvas.zoomToPoint(new fabric.Point(opt.e.offsetX, opt.e.offsetY), newZoom);
      setZoom(newZoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    setCanvasReady(true);

    return () => {
      canvas.dispose();
      canvasRef.current = null;
      setCanvasReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Load product mockup + artwork when product/color changes ───────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasReady) return;

    const loadMockup = async () => {
      // Remove existing mockup and overlay
      const toRemove = canvas.getObjects().filter(
        (obj: any) => obj.isMockupBackground || obj.isPrintZoneOverlay
      );
      toRemove.forEach((obj) => canvas.remove(obj));

      try {
        // Load product mockup
        const mockupImg = await fabric.Image.fromURL(
          product.colors[selectedColorIndex].mockupUrl,
          { crossOrigin: "anonymous" }
        );

        mockupImg.set({
          selectable: false,
          evented: false,
          // @ts-ignore
          isMockupBackground: true,
          objectName: "Product Mockup",
        });
        mockupImg.scaleToWidth(canvas.width!);
        canvas.insertAt(0, mockupImg);

        // Create print zone overlay
        const overlay = createPrintZoneOverlay(
          product.printZone,
          canvas.width!,
          canvas.height!
        );
        canvas.add(overlay);
        // Move overlay to top
        canvas.moveObjectTo(overlay, canvas.getObjects().length - 1);

        // Load initial artwork if provided and canvas is empty of user objects
        const userObjects = canvas.getObjects().filter(
          (obj: any) => !obj.isMockupBackground && !obj.isPrintZoneOverlay && !obj.isGuideLine
        );

        if (artworkUrl && userObjects.length === 0) {
          const artImg = await fabric.Image.fromURL(artworkUrl, {
            crossOrigin: "anonymous",
          });

          const name = getNextObjectName("Artwork");
          artImg.set({
            left: product.printZone.x + product.printZone.width / 2,
            top: product.printZone.y + product.printZone.height / 2,
            originX: "center",
            originY: "center",
            // @ts-ignore
            objectName: name,
            __uid: `art_${Date.now()}`,
          });

          // Scale to fit inside print zone
          const maxW = product.printZone.width * 0.85;
          const maxH = product.printZone.height * 0.85;
          const scaleW = maxW / artImg.width!;
          const scaleH = maxH / artImg.height!;
          const scale = Math.min(scaleW, scaleH);
          artImg.scale(scale);

          // Insert artwork above mockup but below overlay
          const overlayIndex = canvas.getObjects().indexOf(overlay);
          canvas.insertAt(overlayIndex, artImg);
          canvas.setActiveObject(artImg);
          setActiveObject(artImg);
        }

        // Ensure overlay stays on top
        canvas.moveObjectTo(overlay, canvas.getObjects().length - 1);
        canvas.renderAll();
        syncObjectList();
        saveState();
      } catch (err) {
        console.error("Failed to load mockup:", err);
      }
    };

    loadMockup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, selectedColorIndex, canvasReady]);

  // ─── Canvas actions ─────────────────────────────────────────────────────────

  const ensureUnderOverlay = useCallback((obj: fabric.FabricObject) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const overlay = canvas.getObjects().find((o: any) => o.isPrintZoneOverlay);
    if (overlay) {
      const overlayIdx = canvas.getObjects().indexOf(overlay);
      canvas.moveObjectTo(obj, overlayIdx - 1);
    }
  }, []);

  const addText = useCallback((preset: "heading" | "subheading" | "body" = "heading") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const configs = {
      heading: { text: "Your Heading", fontSize: 36, fontWeight: "bold" },
      subheading: { text: "Subheading", fontSize: 24, fontWeight: "600" },
      body: { text: "Body text here", fontSize: 16, fontWeight: "normal" },
    };
    const cfg = configs[preset];
    const name = getNextObjectName("Text");

    const textObj = new fabric.IText(cfg.text, {
      left: product.printZone.x + product.printZone.width / 2,
      top: product.printZone.y + product.printZone.height / 2,
      originX: "center",
      originY: "center",
      fontFamily: EDITOR_FONTS[0].family,
      fontSize: cfg.fontSize,
      fontWeight: cfg.fontWeight as any,
      fill: "#ffffff",
      editable: true,
      // @ts-ignore
      objectName: name,
      __uid: `text_${Date.now()}`,
    });

    canvas.add(textObj);
    ensureUnderOverlay(textObj);
    canvas.setActiveObject(textObj);
    setActiveObject(textObj);
    canvas.renderAll();
    saveState();
  }, [product, saveState, ensureUnderOverlay]);

  const addShape = useCallback((type: string, fill: string = "#8b5cf6") => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cx = product.printZone.x + product.printZone.width / 2;
    const cy = product.printZone.y + product.printZone.height / 2;
    const name = getNextObjectName(type.charAt(0).toUpperCase() + type.slice(1));
    let shape: fabric.FabricObject;

    switch (type) {
      case "rect":
        shape = new fabric.Rect({
          left: cx, top: cy, originX: "center", originY: "center",
          width: 80, height: 60, fill, rx: 4, ry: 4,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          left: cx, top: cy, originX: "center", originY: "center",
          radius: 40, fill,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          left: cx, top: cy, originX: "center", originY: "center",
          width: 80, height: 70, fill,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      case "diamond": {
        const points = [
          new fabric.Point(0, -45),
          new fabric.Point(40, 0),
          new fabric.Point(0, 45),
          new fabric.Point(-40, 0),
        ];
        shape = new fabric.Polygon(points, {
          left: cx, top: cy, originX: "center", originY: "center", fill,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      }
      case "star": {
        const starPoints = createStarPoints(5, 45, 20);
        shape = new fabric.Polygon(starPoints, {
          left: cx, top: cy, originX: "center", originY: "center", fill,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      }
      case "line":
        shape = new fabric.Line([cx - 50, cy, cx + 50, cy], {
          stroke: fill, strokeWidth: 3, fill: undefined,
          // @ts-ignore
          objectName: name, __uid: `shape_${Date.now()}`,
        });
        break;
      default:
        return;
    }

    canvas.add(shape);
    ensureUnderOverlay(shape);
    canvas.setActiveObject(shape);
    setActiveObject(shape);
    canvas.renderAll();
    saveState();
  }, [product, saveState, ensureUnderOverlay]);

  const addImage = useCallback(async (url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const img = await fabric.Image.fromURL(url, { crossOrigin: "anonymous" });
      const name = getNextObjectName("Image");
      img.set({
        left: product.printZone.x + product.printZone.width / 2,
        top: product.printZone.y + product.printZone.height / 2,
        originX: "center",
        originY: "center",
        // @ts-ignore
        objectName: name,
        __uid: `img_${Date.now()}`,
      });

      const maxW = product.printZone.width * 0.7;
      const maxH = product.printZone.height * 0.7;
      const scaleW = maxW / img.width!;
      const scaleH = maxH / img.height!;
      img.scale(Math.min(scaleW, scaleH));

      canvas.add(img);
      ensureUnderOverlay(img);
      canvas.setActiveObject(img);
      setActiveObject(img);
      canvas.renderAll();
      saveState();
    } catch (err) {
      console.error("Failed to load image:", err);
    }
  }, [product, saveState, ensureUnderOverlay]);

  const deleteSelected = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObjects();
    if (active.length === 0) return;
    active.forEach((obj: any) => {
      if (!obj.isMockupBackground && !obj.isPrintZoneOverlay) {
        canvas.remove(obj);
      }
    });
    canvas.discardActiveObject();
    setActiveObject(null);
    canvas.renderAll();
    saveState();
  }, [saveState]);

  const duplicateSelected = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active || (active as any).isMockupBackground || (active as any).isPrintZoneOverlay) return;

    const cloned = await active.clone();
    cloned.set({
      left: (active.left || 0) + 15,
      top: (active.top || 0) + 15,
      // @ts-ignore
      objectName: getNextObjectName((active as any).objectName?.split(" ")[0] || "Copy"),
      __uid: `clone_${Date.now()}`,
    });
    canvas.add(cloned);
    ensureUnderOverlay(cloned);
    canvas.setActiveObject(cloned);
    setActiveObject(cloned);
    canvas.renderAll();
    saveState();
  }, [saveState, ensureUnderOverlay]);

  const selectAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const selectable = canvas.getObjects().filter(
      (obj: any) => !obj.isMockupBackground && !obj.isPrintZoneOverlay && !obj.isGuideLine && obj.selectable
    );
    if (selectable.length === 0) return;
    const sel = new fabric.ActiveSelection(selectable, { canvas });
    canvas.setActiveObject(sel);
    canvas.renderAll();
  }, []);

  const deselect = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.discardActiveObject();
    setActiveObject(null);
    canvas.renderAll();
  }, []);

  const nudge = useCallback((dx: number, dy: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    active.set({
      left: (active.left || 0) + dx,
      top: (active.top || 0) + dy,
    });
    active.setCoords();
    canvas.renderAll();
  }, []);

  const handleZoom = useCallback((delta: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newZoom = Math.min(Math.max(zoom + delta, 0.3), 3);
    setZoom(newZoom);
    const center = new fabric.Point(canvas.width! / 2, canvas.height! / 2);
    canvas.zoomToPoint(center, newZoom);
  }, [zoom]);

  const fitToScreen = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setZoom(1);
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  }, []);

  const bringForward = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    // Don't move past overlay
    const overlay = canvas.getObjects().find((o: any) => o.isPrintZoneOverlay);
    const activeIdx = canvas.getObjects().indexOf(active);
    const overlayIdx = overlay ? canvas.getObjects().indexOf(overlay) : canvas.getObjects().length;
    if (activeIdx < overlayIdx - 1) {
      canvas.moveObjectTo(active, activeIdx + 1);
      canvas.renderAll();
      syncObjectList();
      saveState();
    }
  }, [saveState, syncObjectList]);

  const sendBackward = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;
    const mockup = canvas.getObjects().find((o: any) => o.isMockupBackground);
    const activeIdx = canvas.getObjects().indexOf(active);
    const mockupIdx = mockup ? canvas.getObjects().indexOf(mockup) : 0;
    if (activeIdx > mockupIdx + 1) {
      canvas.moveObjectTo(active, activeIdx - 1);
      canvas.renderAll();
      syncObjectList();
      saveState();
    }
  }, [saveState, syncObjectList]);

  const toggleLock = useCallback((obj: fabric.FabricObject) => {
    const locked = obj.selectable;
    obj.set({
      selectable: !locked,
      evented: !locked,
      // @ts-ignore
      layerLocked: locked,
    });
    canvasRef.current?.renderAll();
    syncObjectList();
  }, [syncObjectList]);

  const toggleVisibility = useCallback((obj: fabric.FabricObject) => {
    obj.set({ visible: !obj.visible });
    canvasRef.current?.renderAll();
    syncObjectList();
  }, [syncObjectList]);

  const selectObject = useCallback((obj: fabric.FabricObject) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setActiveObject(obj);
    setActiveObject(obj);
    canvas.renderAll();
  }, []);

  const updateObjectProperty = useCallback((prop: string, value: any) => {
    const canvas = canvasRef.current;
    if (!canvas || !activeObject) return;
    (activeObject as any).set({ [prop]: value });
    canvas.renderAll();
    saveState();
  }, [activeObject, saveState]);

  const exportDesign = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = exportPrintZone(canvas, product.printZone, 4);
    downloadDataUrl(dataUrl, `${product.name.replace(/\s+/g, "-").toLowerCase()}-design.png`);
  }, [product]);

  const getPlacementData = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const userObjects = canvas.getObjects().filter(
      (obj: any) => !obj.isMockupBackground && !obj.isPrintZoneOverlay && !obj.isGuideLine
    );
    if (userObjects.length === 0) return null;

    return {
      objects: userObjects.map((obj) => ({
        type: obj.type,
        left: obj.left,
        top: obj.top,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        angle: obj.angle,
        width: obj.width! * (obj.scaleX || 1),
        height: obj.height! * (obj.scaleY || 1),
      })),
      printZone: product.printZone,
      productId: product.id,
    };
  }, [product]);

  return {
    canvasRef,
    activeObject,
    objects,
    zoom,
    canUndo,
    canRedo,
    // Actions
    addText,
    addShape,
    addImage,
    deleteSelected,
    duplicateSelected,
    selectAll,
    deselect,
    nudge,
    undo,
    redo,
    handleZoom,
    fitToScreen,
    bringForward,
    sendBackward,
    toggleLock,
    toggleVisibility,
    selectObject,
    updateObjectProperty,
    exportDesign,
    getPlacementData,
    saveState,
  };
}
