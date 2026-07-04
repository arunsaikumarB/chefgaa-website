/**
 * Manually designed ecosystem composition.
 * All positions are fixed pixels — never auto-calculated.
 * Scale the entire canvas on smaller viewports; never reposition cards.
 */

export const COMPOSITION = {
  width: 1400,
  height: 1080,
} as const;

/** POS — exact center of the composition */
export const POS_POSITION = {
  x: 700,
  y: 480,
} as const;

/**
 * Ring 1 — 320px from POS center.
 * Symmetrical core products, permanently visible.
 */
export const PRIMARY_POSITIONS = {
  kitchen: { x: 700, y: 160 },
  crm: { x: 380, y: 480 },
  "online-ordering": { x: 1020, y: 480 },
  website: { x: 420, y: 800 },
  analytics: { x: 700, y: 800 },
  payments: { x: 980, y: 800 },
} as const;

/**
 * Ring 2 — ~180px outside Ring 1.
 * Always outside POS → Primary → Secondary. Never between POS and a primary card.
 */
export const SECONDARY_POSITIONS = {
  inventory: { x: 110, y: 240 },
  marketing: { x: 110, y: 560 },
  loyalty: { x: 110, y: 720 },
  "mobile-app": { x: 1280, y: 280 },
  reservations: { x: 1280, y: 480 },
  catering: { x: 760, y: 980 },
} as const;

export type LayoutPoint = { x: number; y: number };

export function getPrimaryPosition(id: string): LayoutPoint {
  return PRIMARY_POSITIONS[id as keyof typeof PRIMARY_POSITIONS];
}

export function getSecondaryPosition(id: string): LayoutPoint {
  return SECONDARY_POSITIONS[id as keyof typeof SECONDARY_POSITIONS];
}
