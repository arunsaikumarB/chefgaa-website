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
};

const mk = (
  id: string,
  title: string,
  description: string,
  icon: LucideIcon,
  iconAnimation: IconAnimation,
  accent: string,
  zone: CardZone
): EcosystemFeature => ({
  id,
  title,
  description,
  icon,
  iconAnimation,
  accent,
  zone,
});

export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  mk("ai-insights", "AI Insights", "AI-powered insights and smart recommendations.", Brain, "brain-pulse", "#8b5cf6", "top"),
  mk("marketing", "Marketing", "Run campaigns, promotions and grow your brand.", Megaphone, "megaphone-wiggle", "#f97316", "left"),
  mk("kitchen", "Kitchen Display", "Real-time orders, seamless kitchen flow.", ChefHat, "steam", "#f97316", "right"),
  mk("inventory", "Inventory", "Track stock, manage suppliers, reduce waste.", Package, "cube-rotate", "#22c55e", "left"),
  mk("online-ordering", "Online Ordering", "Accept orders online, increase revenue.", ShoppingCart, "cart-slide", "#3b82f6", "right"),
  mk("crm", "CRM", "Know your customers, build lasting relationships.", Users, "users-pulse", "#8b5cf6", "left"),
  mk("loyalty", "Loyalty", "Reward customers, boost repeat visits.", Award, "badge-shine", "#ec4899", "left"),
  mk("website", "Website", "Beautiful restaurant website in minutes.", Globe, "globe-rotate", "#3b82f6", "bottom-left"),
  mk("reservations", "Reservations", "Manage bookings, tables and waitlists.", Calendar, "calendar-flip", "#ef4444", "right"),
  mk("catering", "Catering", "Manage catering, events and bulk orders.", Truck, "default", "#ec4899", "right"),
  mk("analytics", "Analytics", "Real-time reports, smarter decisions.", BarChart3, "bars-animate", "#8b5cf6", "bottom-right"),
  mk("mobile-app", "Mobile App", "Manage on the go, anytime, anywhere.", Smartphone, "phone-float", "#3b82f6", "left"),
  mk("payments", "Payments", "Multiple payment options, fast and secure.", CreditCard, "card-flip", "#f97316", "right"),
];

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
