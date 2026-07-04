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

/** Expanded canvas — 80px+ clearance between all 320px cards */
export const CANVAS = { width: 1900, height: 1420 } as const;
export const CENTER = { x: 950, y: 640 } as const;
export const POS_IMAGE = "/ecosystem/pos-hardware.png";

export const FEATURES: EcosystemFeature[] = [
  {
    id: "ai-insights",
    title: "AI Insights",
    description: "Smart recommendations that boost revenue and reduce waste.",
    icon: Brain,
    iconAnimation: "brain-pulse",
    accent: "#8b5cf6",
    x: 950,
    y: 90,
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns and offers that bring guests back again and again.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    accent: "#ff6e14",
    x: 220,
    y: 220,
  },
  {
    id: "kitchen",
    title: "Kitchen Display",
    description: "Route tickets to stations in real time with zero confusion.",
    icon: ChefHat,
    iconAnimation: "steam",
    accent: "#ff6e14",
    x: 1680,
    y: 220,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock levels and cut waste before it costs you.",
    icon: Package,
    iconAnimation: "cube-rotate",
    accent: "#22c55e",
    x: 180,
    y: 500,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free orders flowing straight into your kitchen.",
    icon: ShoppingCart,
    iconAnimation: "cart-slide",
    accent: "#0071e3",
    x: 1720,
    y: 500,
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest, their preferences, and visit history.",
    icon: Users,
    iconAnimation: "users-pulse",
    accent: "#8b5cf6",
    x: 220,
    y: 780,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points, tiers, and exclusive perks.",
    icon: Award,
    iconAnimation: "badge-shine",
    accent: "#ec4899",
    x: 220,
    y: 1020,
  },
  {
    id: "website",
    title: "Website",
    description: "A beautiful branded site with ordering built right in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    accent: "#0071e3",
    x: 950,
    y: 880,
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Smart table booking with no-show protection built in.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    accent: "#ef4444",
    x: 1480,
    y: 1020,
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote, schedule, and deliver large-format orders easily.",
    icon: Truck,
    iconAnimation: "default",
    accent: "#ec4899",
    x: 1680,
    y: 780,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Sales, labor, and performance insights the moment they happen.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    accent: "#8b5cf6",
    x: 950,
    y: 1180,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Your restaurant in every guest's pocket, fully branded.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    accent: "#0071e3",
    x: 180,
    y: 1260,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cards, wallets, and contactless — all in one seamless flow.",
    icon: CreditCard,
    iconAnimation: "card-flip",
    accent: "#eab308",
    x: 1720,
    y: 1260,
  },
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
  { value: 20, suffix: "+", label: "Modules", icon: "modules" as const },
  { value: 100, suffix: "%", label: "Unified Platform", icon: "unified" as const },
  { value: 0, suffix: "", label: "Synchronization", text: "Real-time", icon: "sync" as const },
  { value: 0, suffix: "", label: "Integrations", text: "Unlimited", icon: "infinity" as const },
  { value: 0, suffix: "", label: "Ready", text: "Enterprise", icon: "enterprise" as const },
] as const;

export function getFeature(id: string): EcosystemFeature | undefined {
  return FEATURES.find((f) => f.id === id);
}

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
  const c2x = mx + dy * bend * 0.42;
  const c2y = my - dx * bend * 0.42;
  return `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}
