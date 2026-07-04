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

export type IconAnimation =
  | "megaphone-wiggle"
  | "cube-rotate"
  | "bars-animate"
  | "globe-rotate"
  | "calendar-flip"
  | "steam"
  | "users-pulse"
  | "badge-shine"
  | "phone-float"
  | "card-pulse"
  | "default";

export type ModuleTier = "primary" | "secondary";

export type EcosystemModule = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconAnimation: IconAnimation;
  tier: ModuleTier;
  x: number;
  y: number;
  parentId?: string;
};

export const CENTER = { x: 50, y: 50 };

/** Six core modules — first scroll act */
export const PRIMARY_MODULES: EcosystemModule[] = [
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Route tickets to stations in real time.",
    icon: ChefHat,
    iconAnimation: "steam",
    tier: "primary",
    x: 50,
    y: 14,
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest and their preferences.",
    icon: Users,
    iconAnimation: "users-pulse",
    tier: "primary",
    x: 17,
    y: 44,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free orders from your site.",
    icon: ShoppingCart,
    iconAnimation: "default",
    tier: "primary",
    x: 83,
    y: 44,
  },
  {
    id: "website",
    title: "Website",
    description: "A branded site with ordering built in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    tier: "primary",
    x: 24,
    y: 76,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cards, wallets, and contactless in one flow.",
    icon: CreditCard,
    iconAnimation: "card-pulse",
    tier: "primary",
    x: 76,
    y: 76,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Sales and performance the moment they happen.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    tier: "primary",
    x: 50,
    y: 86,
  },
];

/** Organic growth — second scroll act */
export const SECONDARY_MODULES: EcosystemModule[] = [
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points and tiers.",
    icon: Award,
    iconAnimation: "badge-shine",
    tier: "secondary",
    parentId: "crm",
    x: 10,
    y: 56,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns and offers that bring guests back.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    tier: "secondary",
    parentId: "website",
    x: 14,
    y: 90,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "A branded app on every guest's phone.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    tier: "secondary",
    parentId: "online-ordering",
    x: 90,
    y: 56,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock and reduce waste automatically.",
    icon: Package,
    iconAnimation: "cube-rotate",
    tier: "secondary",
    parentId: "kitchen",
    x: 36,
    y: 26,
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Smart booking with no-show protection.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    tier: "secondary",
    parentId: "payments",
    x: 86,
    y: 64,
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote and deliver large-format orders.",
    icon: Truck,
    iconAnimation: "default",
    tier: "secondary",
    parentId: "analytics",
    x: 58,
    y: 94,
  },
];

export const ALL_MODULES = [...PRIMARY_MODULES, ...SECONDARY_MODULES];

export const PRIMARY_ORDER = PRIMARY_MODULES.map((m) => m.id);

export const SECONDARY_ORDER = SECONDARY_MODULES.map((m) => m.id);

/** Parent → child for hover highlighting */
export const CHILD_MAP: Record<string, string> = Object.fromEntries(
  SECONDARY_MODULES.map((m) => [m.parentId!, m.id])
);

export const PARENT_MAP: Record<string, string> = Object.fromEntries(
  SECONDARY_MODULES.map((m) => [m.id, m.parentId!])
);

export const NAV_DOTS = [
  { id: "core", label: "Core ecosystem", progress: 0 },
  { id: "expanded", label: "Expanded ecosystem", progress: 0.65 },
] as const;

/** Smooth cubic bezier — no straight lines */
export function buildCurvePath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  bend = 0.18
): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const c1x = mx - dy * bend;
  const c1y = my + dx * bend;
  const c2x = mx + dy * bend * 0.45;
  const c2y = my - dx * bend * 0.45;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function getModule(id: string): EcosystemModule | undefined {
  return ALL_MODULES.find((m) => m.id === id);
}

/** Scroll phase breakpoints (0–1 across 180vh) */
export const SCROLL_PHASES = {
  header: { start: 0, end: 0.07 },
  pos: { start: 0.07, end: 0.22 },
  platform: { start: 0.2, end: 0.28 },
  primary: { start: 0.28, end: 0.55 },
  secondary: { start: 0.58, end: 0.95 },
} as const;

export function phaseProgress(
  scroll: number,
  phase: { start: number; end: number }
): number {
  return Math.max(0, Math.min(1, (scroll - phase.start) / (phase.end - phase.start)));
}

export function itemProgress(
  scroll: number,
  phase: { start: number; end: number },
  index: number,
  total: number
): number {
  const local = phaseProgress(scroll, phase);
  const slot = 1 / total;
  const itemStart = index * slot;
  return Math.max(0, Math.min(1, (local - itemStart) / slot));
}
