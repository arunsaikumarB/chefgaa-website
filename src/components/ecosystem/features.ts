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

export type CardAnchor = "left" | "center" | "right";

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
  /** SVG line endpoint (viewBox coords) */
  svg: { x: number; y: number };
};

/** Percent-based viewBox — matches card % layout for responsive curves */
export const SVG_VIEWBOX = { width: 100, height: 100 } as const;
export const SVG_CENTER = { x: 50, y: 46 } as const;
export const HUB_POSITION = { left: 50, top: 46 } as const;

const mk = (
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  iconAnimation: IconAnimation,
  accent: string,
  left: number,
  top: number,
  anchor: CardAnchor,
  svg: { x: number; y: number }
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
  svg,
});

/** Balanced radial layout — ~8% / ~92% wings, ≥32px gaps, no overlap */
export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  mk("ai-insights", "AI Insights", "AI-powered insights and smart recommendations.", Brain, "brain-pulse", "#8b5cf6", 50, 6, "center", { x: 50, y: 6 }),
  mk("marketing", "Marketing", "Run campaigns, promotions and grow your brand.", Megaphone, "megaphone-wiggle", "#f97316", 8, 17, "left", { x: 22, y: 17 }),
  mk("kitchen", "Kitchen Display", "Real-time orders, seamless kitchen flow.", ChefHat, "steam", "#f97316", 92, 17, "right", { x: 78, y: 17 }),
  mk("inventory", "Inventory", "Track stock, manage suppliers, reduce waste.", Package, "cube-rotate", "#22c55e", 8, 31, "left", { x: 22, y: 31 }),
  mk("online-ordering", "Online Ordering", "Accept orders online, increase revenue.", ShoppingCart, "cart-slide", "#3b82f6", 92, 31, "right", { x: 78, y: 31 }),
  mk("crm", "CRM", "Know your customers, build lasting relationships.", Users, "users-pulse", "#8b5cf6", 9, 45, "left", { x: 23, y: 45 }),
  mk("catering", "Catering", "Manage catering, events and bulk orders.", Truck, "default", "#ec4899", 91, 45, "right", { x: 77, y: 45 }),
  mk("loyalty", "Loyalty", "Reward customers, boost repeat visits.", Award, "badge-shine", "#ec4899", 11, 59, "left", { x: 24, y: 59 }),
  mk("reservations", "Reservations", "Manage bookings, tables and waitlists.", Calendar, "calendar-flip", "#ef4444", 89, 59, "right", { x: 76, y: 59 }),
  mk("mobile-app", "Mobile App", "Manage on the go, anytime, anywhere.", Smartphone, "phone-float", "#3b82f6", 8, 73, "left", { x: 22, y: 73 }),
  mk("website", "Website", "Beautiful restaurant website in minutes.", Globe, "globe-rotate", "#3b82f6", 50, 73, "center", { x: 50, y: 73 }),
  mk("payments", "Payments", "Multiple payment options, fast and secure.", CreditCard, "card-flip", "#f97316", 92, 73, "right", { x: 78, y: 73 }),
  mk("analytics", "Analytics", "Real-time reports, smarter decisions.", BarChart3, "bars-animate", "#8b5cf6", 50, 90, "center", { x: 50, y: 90 }),
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

export function buildCurvePath(sx: number, sy: number, ex: number, ey: number, bend = 0.18): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  const c1x = mx - dy * bend;
  const c1y = my + dx * bend;
  const c2x = mx + dy * bend * 0.38;
  const c2y = my - dx * bend * 0.38;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function getFeature(id: string): EcosystemFeature | undefined {
  return ECOSYSTEM_FEATURES.find((f) => f.id === id);
}

export function anchorTransform(anchor: CardAnchor): string {
  if (anchor === "left") return "translateY(-50%)";
  if (anchor === "right") return "translate(-100%, -50%)";
  return "translate(-50%, -50%)";
}
