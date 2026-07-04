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

/** Balanced canvas — tighter horizontal spread, larger cards */
export const CANVAS = { width: 1560, height: 1360 } as const;
export const CENTER = { x: 780, y: 640 } as const;
export const POS_IMAGE = "/ecosystem/pos-hardware.png";

/**
 * Symmetric ring around the POS (3 · 2 · 2 · 3 · 3 rows).
 * Card box ≈ 360 × 150 → 130px+ clearance on every side.
 */
export const FEATURES: EcosystemFeature[] = [
  {
    id: "marketing",
    title: "Marketing",
    description: "Campaigns and offers that bring guests back again and again.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    accent: "#ff6e14",
    x: 300,
    y: 120,
  },
  {
    id: "ai-insights",
    title: "AI Insights",
    description: "Smart recommendations that boost revenue and reduce waste.",
    icon: Brain,
    iconAnimation: "brain-pulse",
    accent: "#8b5cf6",
    x: 780,
    y: 120,
  },
  {
    id: "kitchen",
    title: "Kitchen Display",
    description: "Route tickets to stations in real time with zero confusion.",
    icon: ChefHat,
    iconAnimation: "steam",
    accent: "#ff6e14",
    x: 1260,
    y: 120,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock levels and cut waste before it costs you.",
    icon: Package,
    iconAnimation: "cube-rotate",
    accent: "#22c55e",
    x: 230,
    y: 400,
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free orders flowing straight into your kitchen.",
    icon: ShoppingCart,
    iconAnimation: "cart-slide",
    accent: "#0071e3",
    x: 1330,
    y: 400,
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest, their preferences, and visit history.",
    icon: Users,
    iconAnimation: "users-pulse",
    accent: "#8b5cf6",
    x: 230,
    y: 660,
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote, schedule, and deliver large-format orders easily.",
    icon: Truck,
    iconAnimation: "default",
    accent: "#ec4899",
    x: 1330,
    y: 660,
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points, tiers, and exclusive perks.",
    icon: Award,
    iconAnimation: "badge-shine",
    accent: "#ec4899",
    x: 300,
    y: 920,
  },
  {
    id: "website",
    title: "Website",
    description: "A beautiful branded site with ordering built right in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    accent: "#0071e3",
    x: 780,
    y: 920,
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Smart table booking with no-show protection built in.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    accent: "#ef4444",
    x: 1260,
    y: 920,
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Your restaurant in every guest's pocket, fully branded.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    accent: "#0071e3",
    x: 300,
    y: 1200,
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Sales, labor, and performance insights the moment they happen.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    accent: "#8b5cf6",
    x: 780,
    y: 1200,
  },
  {
    id: "payments",
    title: "Payments",
    description: "Cards, wallets, and contactless — all in one seamless flow.",
    icon: CreditCard,
    iconAnimation: "card-flip",
    accent: "#eab308",
    x: 1260,
    y: 1200,
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
