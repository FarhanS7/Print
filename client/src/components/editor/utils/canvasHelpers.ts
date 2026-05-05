// ─── Canvas helper utilities ──────────────────────────────────────────────────
import * as fabric from "fabric";
import type { PrintZone } from "./printableZones";

// ─── Snap-to-guide system ─────────────────────────────────────────────────────
const SNAP_THRESHOLD = 6;

interface GuideLine {
  position: number;
  orientation: "horizontal" | "vertical";
}

export function getSnapGuides(
  canvas: fabric.Canvas,
  activeObject: fabric.FabricObject,
  printZone: PrintZone
): GuideLine[] {
  const guides: GuideLine[] = [];
  if (!activeObject) return guides;

  const objCenter = activeObject.getCenterPoint();
  const objBounds = activeObject.getBoundingRect();

  // Print zone center guides
  const zoneCenterX = printZone.x + printZone.width / 2;
  const zoneCenterY = printZone.y + printZone.height / 2;

  // Snap to horizontal center
  if (Math.abs(objCenter.x - zoneCenterX) < SNAP_THRESHOLD) {
    activeObject.set({ left: zoneCenterX - (objBounds.width / 2) + (objCenter.x - objBounds.left) });
    guides.push({ position: zoneCenterX, orientation: "vertical" });
  }

  // Snap to vertical center
  if (Math.abs(objCenter.y - zoneCenterY) < SNAP_THRESHOLD) {
    activeObject.set({ top: zoneCenterY - (objBounds.height / 2) + (objCenter.y - objBounds.top) });
    guides.push({ position: zoneCenterY, orientation: "horizontal" });
  }

  // Snap to print zone edges
  if (Math.abs(objBounds.left - printZone.x) < SNAP_THRESHOLD) {
    guides.push({ position: printZone.x, orientation: "vertical" });
  }
  if (Math.abs(objBounds.left + objBounds.width - (printZone.x + printZone.width)) < SNAP_THRESHOLD) {
    guides.push({ position: printZone.x + printZone.width, orientation: "vertical" });
  }
  if (Math.abs(objBounds.top - printZone.y) < SNAP_THRESHOLD) {
    guides.push({ position: printZone.y, orientation: "horizontal" });
  }
  if (Math.abs(objBounds.top + objBounds.height - (printZone.y + printZone.height)) < SNAP_THRESHOLD) {
    guides.push({ position: printZone.y + printZone.height, orientation: "horizontal" });
  }

  return guides;
}

// ─── Draw snap guides on canvas ───────────────────────────────────────────────
export function drawGuideLines(
  canvas: fabric.Canvas,
  guides: GuideLine[]
) {
  // Remove existing guide lines
  clearGuideLines(canvas);

  guides.forEach((guide) => {
    const points =
      guide.orientation === "vertical"
        ? [guide.position, 0, guide.position, canvas.height!]
        : [0, guide.position, canvas.width!, guide.position];

    const line = new fabric.Line(points, {
      stroke: "#8b5cf6",
      strokeWidth: 1,
      strokeDashArray: [4, 4],
      selectable: false,
      evented: false,
      opacity: 0.7,
      // @ts-ignore — custom property for identification
      isGuideLine: true,
    });
    canvas.add(line);
  });
  canvas.renderAll();
}

export function clearGuideLines(canvas: fabric.Canvas) {
  const guides = canvas.getObjects().filter((obj: any) => obj.isGuideLine);
  guides.forEach((g) => canvas.remove(g));
}

// ─── Create printable zone overlay ────────────────────────────────────────────
export function createPrintZoneOverlay(
  printZone: PrintZone,
  canvasWidth: number,
  canvasHeight: number
): fabric.Group {
  // Semi-transparent overlays around the print zone (to dim non-printable areas)
  const overlayColor = "rgba(0, 0, 0, 0.45)";

  // Top overlay
  const top = new fabric.Rect({
    left: 0, top: 0,
    width: canvasWidth, height: printZone.y,
    fill: overlayColor,
  });

  // Bottom overlay
  const bottom = new fabric.Rect({
    left: 0, top: printZone.y + printZone.height,
    width: canvasWidth, height: canvasHeight - printZone.y - printZone.height,
    fill: overlayColor,
  });

  // Left overlay
  const left = new fabric.Rect({
    left: 0, top: printZone.y,
    width: printZone.x, height: printZone.height,
    fill: overlayColor,
  });

  // Right overlay
  const right = new fabric.Rect({
    left: printZone.x + printZone.width, top: printZone.y,
    width: canvasWidth - printZone.x - printZone.width, height: printZone.height,
    fill: overlayColor,
  });

  // Print zone border (dashed)
  const border = new fabric.Rect({
    left: printZone.x,
    top: printZone.y,
    width: printZone.width,
    height: printZone.height,
    fill: "transparent",
    stroke: "rgba(139, 92, 246, 0.5)",
    strokeWidth: 1.5,
    strokeDashArray: [6, 4],
  });

  const group = new fabric.Group([top, bottom, left, right, border], {
    selectable: false,
    evented: false,
    // @ts-ignore
    isPrintZoneOverlay: true,
  });

  return group;
}

// ─── Export design from printable zone at high resolution ──────────────────────
export function exportPrintZone(
  canvas: fabric.Canvas,
  printZone: PrintZone,
  scale: number = 3 // 3x for ~300 DPI at typical sizes
): string {
  // Temporarily hide overlay and guides
  const objectsToHide: fabric.FabricObject[] = [];
  canvas.getObjects().forEach((obj: any) => {
    if (obj.isPrintZoneOverlay || obj.isGuideLine || obj.isMockupBackground) {
      obj.set({ visible: false });
      objectsToHide.push(obj);
    }
  });

  const dataUrl = canvas.toDataURL({
    format: "png",
    quality: 1,
    left: printZone.x,
    top: printZone.y,
    width: printZone.width,
    height: printZone.height,
    multiplier: scale,
  } as any);

  // Restore hidden objects
  objectsToHide.forEach((obj) => obj.set({ visible: true }));
  canvas.renderAll();

  return dataUrl;
}

// ─── Download helper ──────────────────────────────────────────────────────────
export function downloadDataUrl(dataUrl: string, filename: string = "design.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ─── Create star polygon ─────────────────────────────────────────────────────
export function createStarPoints(
  spikes: number,
  outerRadius: number,
  innerRadius: number
): fabric.Point[] {
  const points: fabric.Point[] = [];
  const step = Math.PI / spikes;

  for (let i = 0; i < 2 * spikes; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    points.push(
      new fabric.Point(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      )
    );
  }
  return points;
}

// ─── Fabric object custom name helper ─────────────────────────────────────────
let objectCounter = 0;
export function getNextObjectName(type: string): string {
  objectCounter++;
  return `${type} ${objectCounter}`;
}

export function resetObjectCounter() {
  objectCounter = 0;
}
