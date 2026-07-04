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

export type CardAnchor = "left" | "right" | "center";

export type EcosystemFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconAnimation: IconAnimation;
  accent: string;
  /** % position in full-width canvas */
  left: number;
  top: number;
  anchor: CardAnchor;
};

export const SVG_VIEWBOX = { width: 2400, height: 1200 } as const;
export const SVG_CENTER = { x: 1200, y: 540 } as const;

const mk = (
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  iconAnimation: IconAnimation,
  accent: string,
  left: number,
  top: number,
  anchor: CardAnchor
): EcosystemFeature => ({
  id,
  title,
  description,
  icon,
  iconAnimation,
  accent,
  left,
  top,
  anchor,
});

/** Balanced radial layout — ~8% from edges, equal breathing room */
export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  mk("ai-insights", "AI Insights", "AI-powered insights and smart recommendations.", Brain, "brain-pulse", "#8b5cf6", 50, 4, "center"),
  mk("marketing", "Marketing", "Run campaigns, promotions and grow your brand.", Megaphone, "megaphone-wiggle", "#f97316", 8, 13, "left"),
  mk("kitchen", "Kitchen Display", "Real-time orders, seamless kitchen flow.", ChefHat, "steam", "#f97316", 92, 13, "right"),
  mk("inventory", "Inventory", "Track stock, manage suppliers, reduce waste.", Package, "cube-rotate", "#22c55e", 7, 29, "left"),
  mk("online-ordering", "Online Ordering", "Accept orders online, increase revenue.", ShoppingCart, "cart-slide", "#3b82f6", 93, 29, "right"),
  mk("crm", "CRM", "Know your customers, build lasting relationships.", Users, "users-pulse", "#8b5cf6", 9, 45, "left"),
  mk("catering", "Catering", "Manage catering, events and bulk orders.", Truck, "default", "#ec4899", 91, 45, "right"),
  mk("loyalty", "Loyalty", "Reward customers, boost repeat visits.", Award, "badge-shine", "#ec4899", 12, 59, "left"),
  mk("reservations", "Reservations", "Manage bookings, tables and waitlists.", Calendar, "calendar-flip", "#ef4444", 88, 59, "right"),
  mk("mobile-app", "Mobile App", "Manage on the go, anytime, anywhere.", Smartphone, "phone-float", "#3b82f6", 7, 73, "left"),
  mk("website", "Website", "Beautiful restaurant website in minutes.", Globe, "globe-rotate", "#3b82f6", 50, 77, "center"),
  mk("payments", "Payments", "Multiple payment options, fast and secure.", CreditCard, "card-flip", "#f97316", 93, 73, "right"),
  mk("analytics", "Analytics", "Real-time reports, smarter decisions.", BarChart3, "bars-animate", "#8b5cf6", 50, 91, "center"),
];

export const ANIMATION_ORDER = [
  "ai-insights",
  "kitchen",
  "online-ordering",
  "reservations",
  "payments",
  "analytics",
  "website",
  "crm",
  "inventory",
  "marketing",
  "loyalty",
  "mobile-app",
  "catering",
] as const;

export const METRICS = [
  { value: 20, suffix: "+", label: "Modules" },
  { value: 100, suffix: "%", label: "Unified Platform" },
  { text: "Real-time", label: "Synchronization" },
  { text: "Unlimited", label: "Integrations" },
] as const;

export function toSvgPoint(left: number, top: number) {
  return {
    x: (left / 100) * SVG_VIEWBOX.width,
    y: (top / 100) * SVG_VIEWBOX.height,
  };
}

/** Card edge facing the hub — keeps Bézier endpoints aligned with visible cards */
const CARD_HALF_W = 210;
const CARD_HALF_H = 78;
const HUB_TOP_PCT = (SVG_CENTER.y / SVG_VIEWBOX.height) * 100;

export function getConnectionPoint(feature: EcosystemFeature) {
  const pt = toSvgPoint(feature.left, feature.top);

  if (feature.anchor === "left") {
    return { x: pt.x + CARD_HALF_W, y: pt.y };
  }
  if (feature.anchor === "right") {
    return { x: pt.x - CARD_HALF_W, y: pt.y };
  }
  if (feature.top < HUB_TOP_PCT) {
    return { x: pt.x, y: pt.y + CARD_HALF_H };
  }
  return { x: pt.x, y: pt.y - CARD_HALF_H };
}

export function buildCurvePath(sx: number, sy: number, ex: number, ey: number, bend = 0.17): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * bend} ${my + dx * bend}, ${mx + dy * bend * 0.38} ${my - dx * bend * 0.38}, ${ex} ${ey}`;
}

export function getFeature(id: string): EcosystemFeature | undefined {
  return ECOSYSTEM_FEATURES.find((f) => f.id === id);
}

export function anchorClass(anchor: CardAnchor): string {
  if (anchor === "left") return "left-[var(--pos-left)] -translate-y-1/2";
  if (anchor === "right") return "right-[var(--pos-right)] left-auto -translate-y-1/2";
  return "left-[var(--pos-left)] -translate-x-1/2 -translate-y-1/2";
}
