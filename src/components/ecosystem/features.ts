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
  /** Percent position in composition (0–100) */
  left: number;
  top: number;
};

export const CENTER = { left: 50, top: 44 } as const;

/** Manually placed — spread to fill full width, no overlaps */
export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  { id: "ai-insights", title: "AI Insights", description: "AI-powered insights and smart recommendations.", icon: Brain, iconAnimation: "brain-pulse", accent: "#8b5cf6", left: 50, top: 4 },
  { id: "marketing", title: "Marketing", description: "Run campaigns, promotions and grow your brand.", icon: Megaphone, iconAnimation: "megaphone-wiggle", accent: "#f97316", left: 11, top: 14 },
  { id: "kitchen", title: "Kitchen Display", description: "Real-time orders, seamless kitchen flow.", icon: ChefHat, iconAnimation: "steam", accent: "#f97316", left: 89, top: 14 },
  { id: "inventory", title: "Inventory", description: "Track stock, manage suppliers, reduce waste.", icon: Package, iconAnimation: "cube-rotate", accent: "#22c55e", left: 7, top: 32 },
  { id: "online-ordering", title: "Online Ordering", description: "Accept orders online, increase revenue.", icon: ShoppingCart, iconAnimation: "cart-slide", accent: "#3b82f6", left: 93, top: 32 },
  { id: "crm", title: "CRM", description: "Know your customers, build lasting relationships.", icon: Users, iconAnimation: "users-pulse", accent: "#8b5cf6", left: 13, top: 52 },
  { id: "loyalty", title: "Loyalty", description: "Reward customers, boost repeat visits.", icon: Award, iconAnimation: "badge-shine", accent: "#ec4899", left: 24, top: 66 },
  { id: "website", title: "Website", description: "Beautiful restaurant website in minutes.", icon: Globe, iconAnimation: "globe-rotate", accent: "#3b82f6", left: 50, top: 76 },
  { id: "reservations", title: "Reservations", description: "Manage bookings, tables and waitlists.", icon: Calendar, iconAnimation: "calendar-flip", accent: "#ef4444", left: 76, top: 66 },
  { id: "catering", title: "Catering", description: "Manage catering, events and bulk orders.", icon: Truck, iconAnimation: "default", accent: "#ec4899", left: 87, top: 52 },
  { id: "analytics", title: "Analytics", description: "Real-time reports, smarter decisions.", icon: BarChart3, iconAnimation: "bars-animate", accent: "#8b5cf6", left: 50, top: 90 },
  { id: "mobile-app", title: "Mobile App", description: "Manage on the go, anytime, anywhere.", icon: Smartphone, iconAnimation: "phone-float", accent: "#3b82f6", left: 9, top: 82 },
  { id: "payments", title: "Payments", description: "Multiple payment options, fast and secure.", icon: CreditCard, iconAnimation: "card-flip", accent: "#f97316", left: 91, top: 82 },
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

/** SVG viewBox coords — derived from percent for wiring */
export function toSvgCoords(left: number, top: number) {
  return { x: left * 24, y: top * 12 };
}

export const SVG_VIEWBOX = { width: 2400, height: 1200 } as const;
export const SVG_CENTER = toSvgCoords(CENTER.left, CENTER.top);

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
