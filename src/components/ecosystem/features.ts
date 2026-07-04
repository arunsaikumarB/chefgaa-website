import type { LucideIcon } from "lucide-react";
import {
  Megaphone,
  ChefHat,
  Package,
  ShoppingCart,
  Users,
  Award,
  Globe,
  Calendar,
  Truck,
  BarChart3,
  Smartphone,
  CreditCard,
} from "lucide-react";

export type StoryModule = {
  id: string;
  title: string;
  line: string;
  icon: LucideIcon;
  x: number;
  y: number;
  tier: "primary" | "secondary";
  parentId?: string;
};

export const CANVAS = { width: 1600, height: 1000 } as const;
export const POS = { x: 800, y: 500 } as const;

/** Fixed label positions — manually composed, no auto-layout */
export const MODULES: StoryModule[] = [
  { id: "kitchen", title: "Kitchen", line: "Tickets routed in real time.", icon: ChefHat, x: 800, y: 160, tier: "primary" },
  { id: "crm", title: "CRM", line: "Every guest, remembered.", icon: Users, x: 460, y: 500, tier: "primary" },
  { id: "online-ordering", title: "Online Ordering", line: "Orders flow straight in.", icon: ShoppingCart, x: 1140, y: 500, tier: "primary" },
  { id: "website", title: "Website", line: "Your brand, online.", icon: Globe, x: 560, y: 780, tier: "primary" },
  { id: "payments", title: "Payments", line: "Tap, swipe, done.", icon: CreditCard, x: 1040, y: 780, tier: "primary" },
  { id: "analytics", title: "Analytics", line: "Insights as they happen.", icon: BarChart3, x: 800, y: 780, tier: "primary" },

  { id: "inventory", title: "Inventory", line: "Stock tracked automatically.", icon: Package, x: 640, y: 280, tier: "secondary", parentId: "kitchen" },
  { id: "marketing", title: "Marketing", line: "Campaigns that convert.", icon: Megaphone, x: 280, y: 620, tier: "secondary", parentId: "crm" },
  { id: "loyalty", title: "Loyalty", line: "Reward your regulars.", icon: Award, x: 280, y: 780, tier: "secondary", parentId: "crm" },
  { id: "reservations", title: "Reservations", line: "Tables booked seamlessly.", icon: Calendar, x: 1320, y: 620, tier: "secondary", parentId: "online-ordering" },
  { id: "mobile-app", title: "Mobile App", line: "Your restaurant in every pocket.", icon: Smartphone, x: 1320, y: 300, tier: "secondary", parentId: "online-ordering" },
  { id: "catering", title: "Catering", line: "Large orders, handled.", icon: Truck, x: 920, y: 920, tier: "secondary", parentId: "analytics" },
];

export const PRIMARY_ORDER = [
  "kitchen",
  "crm",
  "online-ordering",
  "website",
  "payments",
  "analytics",
] as const;

/** Phase 3 reveal sequence — parent expands, then children */
export const EXPANSION_ORDER = [
  { parent: "kitchen", children: ["inventory"] },
  { parent: "crm", children: ["marketing", "loyalty"] },
  { parent: "online-ordering", children: ["reservations", "mobile-app"] },
  { parent: "analytics", children: ["catering"] },
] as const;

export const SECONDARY_ORDER = [
  "inventory",
  "marketing",
  "loyalty",
  "reservations",
  "mobile-app",
  "catering",
] as const;

export function getModule(id: string): StoryModule | undefined {
  return MODULES.find((m) => m.id === id);
}

export function buildCurvePath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  bend = 0.14
): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const c1x = mx - dy * bend;
  const c1y = my + dx * bend;
  const c2x = mx + dy * bend * 0.35;
  const c2y = my - dx * bend * 0.35;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

/**
 * Scroll timeline across 220vh.
 * Phase 1: POS only · Phase 2: primaries one-by-one · Phase 3: expansions · Phase 4: wiring
 */
export const TIMELINE = {
  phase1: { start: 0, end: 0.1 },
  primary: { start: 0.1, end: 0.52 },
  expansion: { start: 0.54, end: 0.82 },
  wiring: { start: 0.84, end: 0.98 },
} as const;

export function phaseT(scroll: number, phase: { start: number; end: number }): number {
  return Math.max(0, Math.min(1, (scroll - phase.start) / (phase.end - phase.start)));
}

/** Which primary index is currently revealing (0–5), -1 if before/after */
export function activePrimaryIndex(scroll: number): number {
  const t = phaseT(scroll, TIMELINE.primary);
  if (t <= 0) return -1;
  if (t >= 1) return PRIMARY_ORDER.length;
  const slot = 1 / PRIMARY_ORDER.length;
  return Math.min(PRIMARY_ORDER.length - 1, Math.floor(t / slot));
}

export function primaryVisible(scroll: number, index: number): boolean {
  const t = phaseT(scroll, TIMELINE.primary);
  const slot = 1 / PRIMARY_ORDER.length;
  const threshold = index * slot + slot * 0.55;
  return t >= threshold;
}

export function primaryPulseActive(scroll: number, index: number): boolean {
  const t = phaseT(scroll, TIMELINE.primary);
  const slot = 1 / PRIMARY_ORDER.length;
  const start = index * slot;
  const end = index * slot + slot * 0.5;
  return t >= start && t < end;
}

/** Flat secondary index for expansion timeline */
export function secondaryVisible(scroll: number, secondaryIndex: number): boolean {
  const t = phaseT(scroll, TIMELINE.expansion);
  const slot = 1 / SECONDARY_ORDER.length;
  const threshold = secondaryIndex * slot + slot * 0.6;
  return t >= threshold;
}

export function secondaryPulseActive(scroll: number, secondaryIndex: number): boolean {
  const t = phaseT(scroll, TIMELINE.expansion);
  const slot = 1 / SECONDARY_ORDER.length;
  const start = secondaryIndex * slot;
  const end = secondaryIndex * slot + slot * 0.45;
  return t >= start && t < end;
}

export function wiringProgress(scroll: number, lineIndex: number, total: number): number {
  const t = phaseT(scroll, TIMELINE.wiring);
  const slot = 1 / total;
  const start = lineIndex * slot;
  return Math.max(0, Math.min(1, (t - start) / slot));
}

export function currentPhase(scroll: number): "pos" | "primary" | "expansion" | "wiring" | "complete" {
  if (scroll < TIMELINE.phase1.end) return "pos";
  if (scroll < TIMELINE.primary.end) return "primary";
  if (scroll < TIMELINE.expansion.end) return "expansion";
  if (scroll < TIMELINE.wiring.end) return "wiring";
  return "complete";
}
