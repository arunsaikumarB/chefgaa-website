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
  /** Position in 2000×1000 composition space */
  x: number;
  y: number;
};

export const COMPOSITION = { width: 2000, height: 1000 } as const;
export const CENTER = { x: 1000, y: 480 } as const;

/** Spread wide — matches reference radial layout */
export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  {
    id: "ai-insights",
    title: "AI Insights",
    description: "AI-powered insights and smart recommendations.",
    icon: Brain,
    iconAnimation: "brain-pulse",
    accent: "#8b5cf6",
    x: 1000,
    y: 55,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Run campaigns, promotions and grow your brand.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    accent: "#f97316",
    x: 200,
    y: 175,
  },
  {
    id: "kitchen",
    title: "Kitchen Display",
    description: "Real-time orders, seamless kitchen flow.",
    icon: ChefHat,
    iconAnimation: "steam",
    accent: "#f97316",
    x: 1800,
    y: 175,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock, manage suppliers, reduce waste.",
    icon: Package,
    iconAnimation: "cube-rotate",
    accent: "#22c55e",
    x: 200,
    y: 395,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Accept orders online, increase revenue.",
    icon: ShoppingCart,
    iconAnimation: "cart-slide",
    accent: "#3b82f6",
    x: 1800,
    y: 395,
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know your customers, build lasting relationships.",
    icon: Users,
    iconAnimation: "users-pulse",
    accent: "#8b5cf6",
    x: 260,
    y: 615,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward customers, boost repeat visits.",
    icon: Award,
    iconAnimation: "badge-shine",
    accent: "#ec4899",
    x: 490,
    y: 715,
  },
  {
    id: "website",
    title: "Website",
    description: "Beautiful restaurant website in minutes.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    accent: "#3b82f6",
    x: 1000,
    y: 815,
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Manage bookings, tables and waitlists.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    accent: "#ef4444",
    x: 1510,
    y: 715,
  },
  {
    id: "catering",
    title: "Catering",
    description: "Manage catering, events and bulk orders.",
    icon: Truck,
    iconAnimation: "default",
    accent: "#ec4899",
    x: 1750,
    y: 615,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Real-time reports, smarter decisions.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    accent: "#8b5cf6",
    x: 1000,
    y: 880,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Manage on the go, anytime, anywhere.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    accent: "#3b82f6",
    x: 200,
    y: 855,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Multiple payment options, fast and secure.",
    icon: CreditCard,
    iconAnimation: "card-flip",
    accent: "#f97316",
    x: 1800,
    y: 855,
  },
];

/** Clockwise wiring order */
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
  const c2x = mx + dy * bend * 0.4;
  const c2y = my - dx * bend * 0.4;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}

export function getFeature(id: string): EcosystemFeature | undefined {
  return ECOSYSTEM_FEATURES.find((f) => f.id === id);
}

export function toPercent(x: number, y: number) {
  return {
    left: `${(x / COMPOSITION.width) * 100}%`,
    top: `${(y / COMPOSITION.height) * 100}%`,
  };
}
