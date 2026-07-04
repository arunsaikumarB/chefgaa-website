import type { LucideIcon } from "lucide-react";
import {
  Brain,
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
  | "brain-pulse"
  | "megaphone-wiggle"
  | "cube-rotate"
  | "globe-rotate"
  | "calendar-flip"
  | "steam"
  | "users-pulse"
  | "badge-shine"
  | "phone-float"
  | "card-flip"
  | "bars-animate"
  | "cart-slide"
  | "default";

export type EcosystemFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconAnimation: IconAnimation;
  accent: string;
  x: number;
  y: number;
};

/** Wide canvas — cards spread edge-to-edge, scaled by width to fill the section */
export const CANVAS = { width: 1720, height: 1240 } as const;
export const CENTER = { x: 860, y: 560 } as const;
export const POS_IMAGE = "/ecosystem/pos-hardware.png";

/**
 * Five columns of balance: 5 left · 3 center · 5 right around the POS.
 * Card box ≈ 380 × 156 → outer columns sit at the section edges.
 */
export const FEATURES: EcosystemFeature[] = [
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns and offers that bring guests back again and again.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    accent: "#ff6e14",
    x: 230,
    y: 110,
  },
  {
    id: "ai-insights",
    title: "AI Insights",
    description: "Smart recommendations that boost revenue and reduce waste.",
    icon: Brain,
    iconAnimation: "brain-pulse",
    accent: "#8b5cf6",
    x: 860,
    y: 110,
  },
  {
    id: "kitchen",
    title: "Kitchen Display",
    description: "Route tickets to stations in real time with zero confusion.",
    icon: ChefHat,
    iconAnimation: "steam",
    accent: "#ff6e14",
    x: 1490,
    y: 110,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock levels and cut waste before it costs you.",
    icon: Package,
    iconAnimation: "cube-rotate",
    accent: "#22c55e",
    x: 230,
    y: 360,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free orders flowing straight into your kitchen.",
    icon: ShoppingCart,
    iconAnimation: "cart-slide",
    accent: "#0071e3",
    x: 1490,
    y: 360,
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest, their preferences, and visit history.",
    icon: Users,
    iconAnimation: "users-pulse",
    accent: "#8b5cf6",
    x: 230,
    y: 610,
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote, schedule, and deliver large-format orders easily.",
    icon: Truck,
    iconAnimation: "default",
    accent: "#ec4899",
    x: 1490,
    y: 610,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points, tiers, and exclusive perks.",
    icon: Award,
    iconAnimation: "badge-shine",
    accent: "#ec4899",
    x: 230,
    y: 860,
  },
  {
    id: "website",
    title: "Website",
    description: "A beautiful branded site with ordering built right in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    accent: "#0071e3",
    x: 860,
    y: 870,
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Smart table booking with no-show protection built in.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    accent: "#ef4444",
    x: 1490,
    y: 860,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Your restaurant in every guest's pocket, fully branded.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    accent: "#0071e3",
    x: 230,
    y: 1110,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Sales, labor, and performance insights the moment they happen.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    accent: "#8b5cf6",
    x: 860,
    y: 1120,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cards, wallets, and contactless — all in one seamless flow.",
    icon: CreditCard,
    iconAnimation: "card-flip",
    accent: "#eab308",
    x: 1490,
    y: 1110,
  },
];

/** Clockwise wiring + reveal order */
export const ANIMATION_ORDER = [
  "ai-insights",
  "kitchen",
  "online-ordering",
  "catering",
  "reservations",
  "payments",
  "analytics",
  "website",
  "mobile-app",
  "loyalty",
  "crm",
  "inventory",
  "marketing",
] as const;

/** Scroll-scrub helper — 0..1 slice for the item at `index` within a phase */
export function itemProgress(
  progress: number,
  start: number,
  end: number,
  index: number,
  total: number
): number {
  const span = end - start;
  const slot = span / total;
  const s = start + index * slot;
  return Math.max(0, Math.min(1, (progress - s) / slot));
}

export const METRICS = [
  { value: 20, suffix: "+", label: "Modules", icon: "modules" as const },
  { value: 100, suffix: "%", label: "Unified Platform", icon: "unified" as const },
  { value: 0, suffix: "", label: "Synchronization", text: "Real-time", icon: "sync" as const },
  { value: 0, suffix: "", label: "Integrations", text: "Unlimited", icon: "infinity" as const },
  { value: 0, suffix: "", label: "Ready", text: "Enterprise", icon: "enterprise" as const },
] as const;

export function getFeature(id: string): EcosystemFeature | undefined {
  return FEATURES.find((f) => f.id === id);
}

/** Hero tile + card footprint used for line anchoring */
export const POS_BOUNDS = { width: 660, height: 372 } as const;
export const CARD_BOUNDS = { width: 380, height: 150 } as const;

export function getRectEdgePoint(
  cx: number,
  cy: number,
  halfW: number,
  halfH: number,
  targetX: number,
  targetY: number
): { x: number; y: number } {
  const dx = targetX - cx;
  const dy = targetY - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };

  const angle = Math.atan2(dy, dx);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const absCos = Math.abs(cos) || 1e-6;
  const absSin = Math.abs(sin) || 1e-6;
  const t = Math.min(halfW / absCos, halfH / absSin);
  return { x: cx + cos * t, y: cy + sin * t };
}

/** Full connection geometry: edge-anchored cubic Bezier + endpoints */
export function buildConnection(ex: number, ey: number) {
  const start = getRectEdgePoint(
    CENTER.x,
    CENTER.y,
    POS_BOUNDS.width / 2,
    POS_BOUNDS.height / 2,
    ex,
    ey
  );
  const end = getRectEdgePoint(
    ex,
    ey,
    CARD_BOUNDS.width / 2,
    CARD_BOUNDS.height / 2,
    CENTER.x,
    CENTER.y
  );

  const sx = start.x;
  const sy = start.y;
  const dx = end.x - sx;
  const dy = end.y - sy;
  const dist = Math.hypot(dx, dy) || 1;

  const outX = ex - CENTER.x;
  const outY = ey - CENTER.y;
  const outLen = Math.hypot(outX, outY) || 1;
  const radialX = outX / outLen;
  const radialY = outY / outLen;
  const perpX = -radialY;
  const perpY = radialX;

  const bow = Math.min(dist * 0.28, 140);
  const c1x = sx + dx * 0.38 + perpX * bow * 0.55 + radialX * bow * 0.15;
  const c1y = sy + dy * 0.38 + perpY * bow * 0.55 + radialY * bow * 0.15;
  const c2x = sx + dx * 0.72 + perpX * bow * 0.25;
  const c2y = sy + dy * 0.72 + perpY * bow * 0.25;

  return {
    pathD: `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
    start,
    end,
  };
}
