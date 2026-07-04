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
import {
  getPrimaryPosition,
  getSecondaryPosition,
  POS_POSITION,
  type LayoutPoint,
} from "./layout";

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
  position: LayoutPoint;
  parentId?: string;
};

export const POS_CENTER = POS_POSITION;

/** Ring 1 — six core modules, always visible */
export const PRIMARY_MODULES: EcosystemModule[] = [
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Route tickets to stations instantly.",
    icon: ChefHat,
    iconAnimation: "steam",
    tier: "primary",
    position: getPrimaryPosition("kitchen"),
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest and preference.",
    icon: Users,
    iconAnimation: "users-pulse",
    tier: "primary",
    position: getPrimaryPosition("crm"),
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free orders from your site.",
    icon: ShoppingCart,
    iconAnimation: "default",
    tier: "primary",
    position: getPrimaryPosition("online-ordering"),
  },
  {
    id: "website",
    title: "Website",
    description: "Branded site with ordering built in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    tier: "primary",
    position: getPrimaryPosition("website"),
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cards, wallets, and tap-to-pay.",
    icon: CreditCard,
    iconAnimation: "card-pulse",
    tier: "primary",
    position: getPrimaryPosition("payments"),
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Live sales and performance insights.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    tier: "primary",
    position: getPrimaryPosition("analytics"),
  },
];

/** Ring 2 — revealed on second scroll act */
export const SECONDARY_MODULES: EcosystemModule[] = [
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock and cut waste.",
    icon: Package,
    iconAnimation: "cube-rotate",
    tier: "secondary",
    parentId: "crm",
    position: getSecondaryPosition("inventory"),
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns that bring guests back.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    tier: "secondary",
    parentId: "website",
    position: getSecondaryPosition("marketing"),
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points.",
    icon: Award,
    iconAnimation: "badge-shine",
    tier: "secondary",
    parentId: "crm",
    position: getSecondaryPosition("loyalty"),
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Your brand on every phone.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    tier: "secondary",
    parentId: "online-ordering",
    position: getSecondaryPosition("mobile-app"),
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Smart booking, fewer no-shows.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    tier: "secondary",
    parentId: "online-ordering",
    position: getSecondaryPosition("reservations"),
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote and fulfill large orders.",
    icon: Truck,
    iconAnimation: "default",
    tier: "secondary",
    parentId: "analytics",
    position: getSecondaryPosition("catering"),
  },
];

export const ALL_MODULES = [...PRIMARY_MODULES, ...SECONDARY_MODULES];

export const PRIMARY_ORDER = [
  "kitchen",
  "crm",
  "online-ordering",
  "website",
  "payments",
  "analytics",
] as const;

export const SECONDARY_ORDER = [
  "inventory",
  "marketing",
  "loyalty",
  "mobile-app",
  "reservations",
  "catering",
] as const;

export const CHILD_MAP: Record<string, string> = {
  crm: "loyalty",
  website: "marketing",
  "online-ordering": "mobile-app",
  analytics: "catering",
};

/** CRM has two children in layout — loyalty + inventory */
export const RELATED_MAP: Record<string, string[]> = {
  crm: ["loyalty", "inventory"],
  website: ["marketing"],
  "online-ordering": ["mobile-app", "reservations"],
  analytics: ["catering"],
  inventory: ["crm"],
  marketing: ["website"],
  loyalty: ["crm"],
  "mobile-app": ["online-ordering"],
  reservations: ["online-ordering"],
  catering: ["analytics"],
};

export const PARENT_MAP: Record<string, string> = Object.fromEntries(
  SECONDARY_MODULES.map((m) => [m.id, m.parentId!])
);

export const NAV_DOTS = [
  { id: "core", label: "POS and core products", progress: 0 },
  { id: "expanded", label: "Full ecosystem", progress: 0.42 },
  { id: "wired", label: "Connected ecosystem", progress: 0.64 },
] as const;

export function buildCurvePath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  bend = 0.16
): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const c1x = mx - dy * bend;
  const c1y = my + dx * bend;
  const c2x = mx + dy * bend * 0.4;
  const c2y = my - dx * bend * 0.4;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function getModule(id: string): EcosystemModule | undefined {
  return ALL_MODULES.find((m) => m.id === id);
}

/** Cards appear first; wiring draws only after every card has animated in */
export const SCROLL_PHASES = {
  header: { start: 0, end: 0.05 },
  pos: { start: 0.05, end: 0.15 },
  platform: { start: 0.12, end: 0.18 },
  primaryCards: { start: 0.18, end: 0.38 },
  secondaryCards: { start: 0.42, end: 0.58 },
  primaryLines: { start: 0.64, end: 0.8 },
  secondaryLines: { start: 0.8, end: 0.95 },
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

export function isRelatedModule(hoverId: string | null, moduleId: string): boolean {
  if (!hoverId) return false;
  if (hoverId === moduleId) return true;
  const related = RELATED_MAP[hoverId] ?? [];
  if (related.includes(moduleId)) return true;
  if (PARENT_MAP[moduleId] === hoverId) return true;
  if (PARENT_MAP[hoverId] === moduleId) return true;
  return false;
}
