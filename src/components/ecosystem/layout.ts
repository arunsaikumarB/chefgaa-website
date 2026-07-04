/**
 * Manually designed ecosystem composition — 1800px canvas.
 * Fixed pixel positions only. Never auto-calculated.
 * Minimum 80px gap between all card bounding boxes.
 */

export const COMPOSITION = {
  width: 1800,
  height: 1200,
} as const;

/** Card dimensions — never scale below these */
export const CARD_SIZES = {
  primary: { width: 260, height: 140 },
  secondary: { width: 220, height: 120 },
} as const;

/** POS — exact center, ~30% visual weight of section */
export const POS_POSITION = {
  x: 900,
  y: 540,
} as const;

/** Ring 1 — core products, 80px+ clearance from POS */
export const PRIMARY_POSITIONS = {
  kitchen: { x: 900, y: 140 },
  crm: { x: 460, y: 540 },
  "online-ordering": { x: 1340, y: 540 },
  website: { x: 560, y: 940 },
  analytics: { x: 900, y: 940 },
  payments: { x: 1240, y: 940 },
} as const;

/** Ring 2 — supporting products, outside Ring 1 */
export const SECONDARY_POSITIONS = {
  inventory: { x: 140, y: 360 },
  marketing: { x: 140, y: 680 },
  loyalty: { x: 140, y: 860 },
  "mobile-app": { x: 1660, y: 320 },
  reservations: { x: 1660, y: 540 },
  catering: { x: 980, y: 1150 },
} as const;

export type LayoutPoint = { x: number; y: number };

export function getPrimaryPosition(id: string): LayoutPoint {
  return PRIMARY_POSITIONS[id as keyof typeof PRIMARY_POSITIONS];
}

export function getSecondaryPosition(id: string): LayoutPoint {
  return SECONDARY_POSITIONS[id as keyof typeof SECONDARY_POSITIONS];
}
