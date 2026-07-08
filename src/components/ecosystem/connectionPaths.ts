import type { CardZone } from "./features";

export type Point = { x: number; y: number };

export type ConnectionLayout = {
  width: number;
  height: number;
  hub: Point;
  anchors: Record<string, Point>;
};

/** Convert an element's center into coordinates relative to the SVG container. */
export function elementCenterInContainer(
  element: HTMLElement,
  container: HTMLElement
): Point {
  const containerRect = container.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - containerRect.left,
    y: rect.top + rect.height / 2 - containerRect.top,
  };
}

/** Cubic Bézier from hub to card anchor — zone-aware control points for smooth spokes. */
export function buildCurvePath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  zone?: CardZone
): string {
  const dx = ex - sx;
  const dy = ey - sy;
  const dist = Math.hypot(dx, dy);
  const tension = Math.min(Math.max(dist * 0.28, 48), 200);

  let c1x: number;
  let c1y: number;
  let c2x: number;
  let c2y: number;

  switch (zone) {
    case "left":
      c1x = sx - tension * 0.5;
      c1y = sy;
      c2x = ex + tension * 0.5;
      c2y = ey;
      break;
    case "right":
      c1x = sx + tension * 0.5;
      c1y = sy;
      c2x = ex - tension * 0.5;
      c2y = ey;
      break;
    case "top":
      c1x = sx;
      c1y = sy - tension * 0.5;
      c2x = ex;
      c2y = ey + tension * 0.5;
      break;
    case "bottom-left":
    case "bottom-right":
      c1x = sx;
      c1y = sy + tension * 0.5;
      c2x = ex;
      c2y = ey - tension * 0.5;
      break;
    default: {
      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2;
      const bend = 0.16;
      c1x = mx - dy * bend;
      c1y = my + dx * bend;
      c2x = mx + dy * bend * 0.35;
      c2y = my - dx * bend * 0.35;
    }
  }

  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function anchorClassForZone(zone: CardZone): string {
  switch (zone) {
    case "left":
      return "right-0 top-1/2 -translate-y-1/2";
    case "right":
      return "left-0 top-1/2 -translate-y-1/2";
    case "top":
      return "bottom-0 left-1/2 -translate-x-1/2";
    case "bottom-left":
    case "bottom-right":
      return "top-0 left-1/2 -translate-x-1/2";
  }
}
