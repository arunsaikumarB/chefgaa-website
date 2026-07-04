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

export type CardZone = "left" | "right" | "top" | "bottom-left" | "bottom-right";

export type EcosystemFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconAnimation: IconAnimation;
  accent: string;
  zone: CardZone;
  /** SVG anchor for connection lines */
  svg: { x: number; y: number };
};

export const SVG_VIEWBOX = { width: 2400, height: 1200 } as const;
export const SVG_CENTER = { x: 1200, y: 520 } as const;

export const LEFT_COLUMN = [
  "marketing",
  "inventory",
  "crm",
  "loyalty",
  "mobile-app",
] as const;

export const RIGHT_COLUMN = [
  "kitchen",
  "online-ordering",
  "catering",
  "reservations",
  "payments",
] as const;

const mk = (
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  iconAnimation: IconAnimation,
  accent: string,
  zone: CardZone,
  svg: { x: number; y: number }
): EcosystemFeature => ({
  id,
  title,
  description,
  icon,
  iconAnimation,
  accent,
  zone,
  svg,
});

export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  mk("ai-insights", "AI Insights", "AI-powered insights and smart recommendations.", Brain, "brain-pulse", "#8b5cf6", "top", { x: 1200, y: 70 }),
  mk("marketing", "Marketing", "Run campaigns, promotions and grow your brand.", Megaphone, "megaphone-wiggle", "#f97316", "left", { x: 240, y: 130 }),
  mk("kitchen", "Kitchen Display", "Real-time orders, seamless kitchen flow.", ChefHat, "steam", "#f97316", "right", { x: 2160, y: 130 }),
  mk("inventory", "Inventory", "Track stock, manage suppliers, reduce waste.", Package, "cube-rotate", "#22c55e", "left", { x: 240, y: 310 }),
  mk("online-ordering", "Online Ordering", "Accept orders online, increase revenue.", ShoppingCart, "cart-slide", "#3b82f6", "right", { x: 2160, y: 310 }),
  mk("crm", "CRM", "Know your customers, build lasting relationships.", Users, "users-pulse", "#8b5cf6", "left", { x: 240, y: 490 }),
  mk("loyalty", "Loyalty", "Reward customers, boost repeat visits.", Award, "badge-shine", "#ec4899", "left", { x: 240, y: 670 }),
  mk("website", "Website", "Beautiful restaurant website in minutes.", Globe, "globe-rotate", "#3b82f6", "bottom-left", { x: 960, y: 1060 }),
  mk("reservations", "Reservations", "Manage bookings, tables and waitlists.", Calendar, "calendar-flip", "#ef4444", "right", { x: 2160, y: 670 }),
  mk("catering", "Catering", "Manage catering, events and bulk orders.", Truck, "default", "#ec4899", "right", { x: 2160, y: 490 }),
  mk("analytics", "Analytics", "Real-time reports, smarter decisions.", BarChart3, "bars-animate", "#8b5cf6", "bottom-right", { x: 1440, y: 1060 }),
  mk("mobile-app", "Mobile App", "Manage on the go, anytime, anywhere.", Smartphone, "phone-float", "#3b82f6", "left", { x: 240, y: 850 }),
  mk("payments", "Payments", "Multiple payment options, fast and secure.", CreditCard, "card-flip", "#f97316", "right", { x: 2160, y: 850 }),
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

export function buildCurvePath(sx: number, sy: number, ex: number, ey: number, bend = 0.16): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * bend} ${my + dx * bend}, ${mx + dy * bend * 0.35} ${my - dx * bend * 0.35}, ${ex} ${ey}`;
}

export function getFeature(id: string): EcosystemFeature | undefined {
  return ECOSYSTEM_FEATURES.find((f) => f.id === id);
}

export function featuresByZone(zone: CardZone): EcosystemFeature[] {
  return ECOSYSTEM_FEATURES.filter((f) => f.zone === zone);
}

export function featuresInColumn(side: "left" | "right"): EcosystemFeature[] {
  const order = side === "left" ? LEFT_COLUMN : RIGHT_COLUMN;
  return order.map((id) => getFeature(id)!).filter(Boolean);
}
