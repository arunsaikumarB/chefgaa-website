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
  BarChart3,
  CreditCard,
  Monitor,
} from "lucide-react";

export type SlideVisual =
  | "pos"
  | "ordering"
  | "kitchen"
  | "inventory"
  | "reservations"
  | "payments"
  | "crm"
  | "analytics"
  | "marketing"
  | "website"
  | "ai"
  | "loyalty";

export type CarouselSlide = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  cta: string;
  ctaHref: string;
  bg: string;
  accent: string;
  icon: LucideIcon;
  visual: SlideVisual;
};

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "smart-pos",
    title: "Smart POS",
    tagline: "Fast billing built for the rush.",
    description:
      "Ring up orders in seconds, split checks effortlessly, and keep every station in sync — from counter to kitchen.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#fff4eb",
    accent: "#ff6e14",
    icon: Monitor,
    visual: "pos",
  },
  {
    id: "online-ordering",
    title: "Online Ordering",
    tagline: "Commission-free orders, straight to your kitchen.",
    description:
      "Guests order from your branded site or app. Every ticket routes automatically — no third-party fees, no manual entry.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#fffbeb",
    accent: "#eab308",
    icon: ShoppingCart,
    visual: "ordering",
  },
  {
    id: "kitchen",
    title: "Kitchen Display",
    tagline: "Every ticket, routed in real time.",
    description:
      "Color-coded tickets by station, prep timers, and bump bars — so the line never misses a beat during the dinner rush.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#faf8f5",
    accent: "#ff6e14",
    icon: ChefHat,
    visual: "kitchen",
  },
  {
    id: "inventory",
    title: "Inventory",
    tagline: "Know what you have before you run out.",
    description:
      "Track stock across locations, get low-level alerts, and cut waste with smart reorder suggestions tied to your sales data.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#f0fdf4",
    accent: "#22c55e",
    icon: Package,
    visual: "inventory",
  },
  {
    id: "reservations",
    title: "Reservations",
    tagline: "Smart table booking, fewer no-shows.",
    description:
      "Manage covers, waitlists, and table turns from one screen. Automated reminders keep guests committed to their booking.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#fef2f2",
    accent: "#ef4444",
    icon: Calendar,
    visual: "reservations",
  },
  {
    id: "payments",
    title: "Payments",
    tagline: "Every way guests want to pay.",
    description:
      "Cards, contactless, wallets, and split payments — all in one seamless flow with instant reconciliation.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#fff7ed",
    accent: "#ff6e14",
    icon: CreditCard,
    visual: "payments",
  },
  {
    id: "crm",
    title: "CRM",
    tagline: "Know every guest by name.",
    description:
      "Visit history, preferences, allergies, and spend patterns — so your team delivers a personal experience every time.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#f5f3ff",
    accent: "#8b5cf6",
    icon: Users,
    visual: "crm",
  },
  {
    id: "analytics",
    title: "Analytics",
    tagline: "Insights the moment they happen.",
    description:
      "Sales, labor costs, menu performance, and peak-hour trends — live dashboards that help you make smarter decisions.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#eff6ff",
    accent: "#0071e3",
    icon: BarChart3,
    visual: "analytics",
  },
  {
    id: "marketing",
    title: "Marketing",
    tagline: "Campaigns that bring guests back.",
    description:
      "Email offers, SMS promos, and targeted campaigns — launched in minutes and measured in real revenue.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#faf5ff",
    accent: "#a855f7",
    icon: Megaphone,
    visual: "marketing",
  },
  {
    id: "website",
    title: "Website",
    tagline: "Your restaurant, beautifully online.",
    description:
      "A branded site with menus, ordering, and reservations built in — no developers, no templates, just your brand.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#eff6ff",
    accent: "#0071e3",
    icon: Globe,
    visual: "website",
  },
  {
    id: "ai-insights",
    title: "AI Insights",
    tagline: "Smarter recommendations, less guesswork.",
    description:
      "AI surfaces menu tweaks, staffing adjustments, and revenue opportunities based on your real operating data.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #faf5ff 100%)",
    accent: "#8b5cf6",
    icon: Brain,
    visual: "ai",
  },
  {
    id: "loyalty",
    title: "Loyalty",
    tagline: "Reward the guests who keep coming back.",
    description:
      "Points, tiers, and exclusive perks that turn first-time visitors into regulars — fully integrated with your POS.",
    cta: "Learn More",
    ctaHref: "/contact",
    bg: "#fdf2f8",
    accent: "#ec4899",
    icon: Award,
    visual: "loyalty",
  },
];

export const POS_HERO_IMAGE = "/ecosystem/pos-hardware.png";
