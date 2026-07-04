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
  | "bars-animate"
  | "globe-rotate"
  | "calendar-flip"
  | "steam"
  | "users-pulse"
  | "badge-shine"
  | "cart-slide"
  | "phone-float"
  | "coin-flip"
  | "default";

export type EcosystemFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconAnimation: IconAnimation;
  /** Percent position within the ecosystem canvas (desktop) */
  x: number;
  y: number;
  navGroup: string;
};

/** Clockwise draw order for connection + card reveal */
export const ANIMATION_ORDER: string[] = [
  "ai",
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
];

export const ECOSYSTEM_FEATURES: EcosystemFeature[] = [
  {
    id: "ai",
    title: "AI Insights",
    description: "Predict demand, spot trends, and act on intelligent recommendations.",
    icon: Brain,
    iconAnimation: "brain-pulse",
    x: 50,
    y: 6,
    navGroup: "insights",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Launch campaigns, promotions, and offers that bring guests back.",
    icon: Megaphone,
    iconAnimation: "megaphone-wiggle",
    x: 16,
    y: 14,
    navGroup: "growth",
  },
  {
    id: "kitchen",
    title: "Kitchen",
    description: "Route tickets to the right station with real-time kitchen display.",
    icon: ChefHat,
    iconAnimation: "steam",
    x: 84,
    y: 14,
    navGroup: "kitchen",
  },
  {
    id: "inventory",
    title: "Inventory",
    description: "Track stock levels automatically and reduce waste across locations.",
    icon: Package,
    iconAnimation: "cube-rotate",
    x: 7,
    y: 40,
    navGroup: "operations",
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    description: "Commission-free ordering from your website and branded mobile app.",
    icon: ShoppingCart,
    iconAnimation: "cart-slide",
    x: 93,
    y: 40,
    navGroup: "orders",
  },
  {
    id: "crm",
    title: "CRM",
    description: "Know every guest — preferences, visits, and lifetime value in one place.",
    icon: Users,
    iconAnimation: "users-pulse",
    x: 14,
    y: 68,
    navGroup: "customers",
  },
  {
    id: "loyalty",
    title: "Loyalty",
    description: "Reward regulars with points, tiers, and personalized offers.",
    icon: Award,
    iconAnimation: "badge-shine",
    x: 28,
    y: 80,
    navGroup: "growth",
  },
  {
    id: "website",
    title: "Website",
    description: "A beautiful, SEO-ready site with ordering built right in.",
    icon: Globe,
    iconAnimation: "globe-rotate",
    x: 50,
    y: 86,
    navGroup: "more",
  },
  {
    id: "reservations",
    title: "Reservations",
    description: "Fill every seat with smart booking, reminders, and no-show protection.",
    icon: Calendar,
    iconAnimation: "calendar-flip",
    x: 72,
    y: 80,
    navGroup: "operations",
  },
  {
    id: "catering",
    title: "Catering",
    description: "Quote, schedule, and deliver large-format orders effortlessly.",
    icon: Truck,
    iconAnimation: "default",
    x: 86,
    y: 68,
    navGroup: "more",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "See sales, labor, and performance the moment they happen.",
    icon: BarChart3,
    iconAnimation: "bars-animate",
    x: 50,
    y: 94,
    navGroup: "insights",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "A branded app guests keep on their home screen for repeat orders.",
    icon: Smartphone,
    iconAnimation: "phone-float",
    x: 5,
    y: 56,
    navGroup: "more",
  },
  {
    id: "payments",
    title: "Payments",
    description: "Accept cards, wallets, and contactless with a single secure flow.",
    icon: CreditCard,
    iconAnimation: "coin-flip",
    x: 95,
    y: 56,
    navGroup: "more",
  },
];

export const NAV_ITEMS = [
  { id: "pos", label: "POS" },
  { id: "kitchen", label: "Kitchen" },
  { id: "orders", label: "Orders" },
  { id: "customers", label: "Customers" },
  { id: "operations", label: "Operations" },
  { id: "growth", label: "Growth" },
  { id: "insights", label: "Insights" },
  { id: "more", label: "More" },
] as const;

export const METRICS = [
  { label: "Modules", value: 20, suffix: "+" },
  { label: "Unified Platform", value: 100, suffix: "%" },
  { label: "Synchronization", value: 0, suffix: "", text: "Real-time" },
  { label: "Integrations", value: 0, suffix: "", text: "Unlimited" },
  { label: "Ready", value: 0, suffix: "", text: "Enterprise" },
] as const;

/** Build a smooth cubic bezier from center to endpoint */
export function buildCurvePath(cx: number, cy: number, ex: number, ey: number): string {
  const mx = (cx + ex) / 2;
  const my = (cy + ey) / 2;
  const dx = ex - cx;
  const dy = ey - cy;
  const bend = 0.22;
  const c1x = mx - dy * bend;
  const c1y = my + dx * bend;
  const c2x = mx + dy * bend * 0.5;
  const c2y = my - dx * bend * 0.5;
  return `M ${cx} ${cy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`;
}
