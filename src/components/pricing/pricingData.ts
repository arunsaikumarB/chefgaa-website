import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Headphones,
  Layers,
  Percent,
  RefreshCw,
  Shield,
} from "lucide-react";

export type PlanTier = "starter" | "professional" | "enterprise";

export type BillingPeriod = "monthly" | "yearly";

export type PricingPlan = {
  id: PlanTier;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  features: string[];
  extraLabel?: string;
  cta: string;
  ctaTo: string;
  variant: "light" | "featured" | "dark";
  badge?: string;
};

export type CompareCell = "yes" | "no" | "unlimited";

export type CompareFeature = {
  name: string;
  starter: CompareCell;
  professional: CompareCell;
  enterprise: CompareCell;
};

export type WhyFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type TrustStat = {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
};

export const YEARLY_DISCOUNT = 0.2;

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for cafés and independent restaurants.",
    monthlyPrice: 999,
    features: ["POS", "Online Ordering", "Website", "QR Menu", "Basic Reports"],
    cta: "Start Free Trial",
    ctaTo: "/contact",
    variant: "light",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "The complete toolkit for a growing restaurant.",
    monthlyPrice: 2499,
    badge: "Most Popular",
    extraLabel: "Everything in Starter",
    features: [
      "Kitchen Display",
      "Reservations",
      "Inventory",
      "CRM",
      "Loyalty",
      "Marketing",
      "Payments",
      "Analytics",
    ],
    cta: "Start Free Trial",
    ctaTo: "/contact",
    variant: "featured",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Built for groups, franchises, and multi-location brands.",
    monthlyPrice: null,
    features: [
      "Unlimited Locations",
      "Dedicated Support",
      "API",
      "White Label",
      "Custom Integrations",
      "Advanced Analytics",
    ],
    cta: "Talk to Sales",
    ctaTo: "/contact",
    variant: "dark",
  },
];

export const COMPARE_FEATURES: CompareFeature[] = [
  { name: "POS", starter: "yes", professional: "yes", enterprise: "yes" },
  { name: "Website", starter: "yes", professional: "yes", enterprise: "yes" },
  { name: "Online Ordering", starter: "yes", professional: "yes", enterprise: "yes" },
  { name: "Kitchen Display", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Reservations", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Inventory", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "CRM", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Loyalty", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Marketing", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Payments", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Analytics", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "Integrations", starter: "no", professional: "yes", enterprise: "yes" },
  { name: "API", starter: "no", professional: "no", enterprise: "yes" },
  { name: "White Label", starter: "no", professional: "no", enterprise: "yes" },
  {
    name: "Unlimited Locations",
    starter: "no",
    professional: "no",
    enterprise: "unlimited",
  },
  { name: "Dedicated Support", starter: "no", professional: "no", enterprise: "yes" },
];

export const WHY_FEATURES: WhyFeature[] = [
  {
    title: "Commission-Free Ordering",
    description: "Keep every rupee from online orders. No marketplace fees, ever.",
    icon: Percent,
  },
  {
    title: "Real-Time Synchronization",
    description: "Menus, orders, and inventory stay in sync across every channel instantly.",
    icon: RefreshCw,
  },
  {
    title: "Unlimited Integrations",
    description: "Connect delivery apps, payments, accounting, and marketing tools you already use.",
    icon: Layers,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade encryption, role-based access, and audit logs built in.",
    icon: Shield,
  },
  {
    title: "24×7 Support",
    description: "Expert help whenever you need it — onboarding, operations, and beyond.",
    icon: Headphones,
  },
  {
    title: "Multi-location Ready",
    description: "Scale from one café to hundreds of locations without changing systems.",
    icon: Building2,
  },
];

export const HARDWARE_ITEMS = [
  "POS",
  "Receipt Printer",
  "Barcode Scanner",
  "Kitchen Display",
  "Tablet",
  "Customer Display",
];

export const TRUST_STATS: TrustStat[] = [
  { value: 500, suffix: "+", label: "Restaurants" },
  { value: 20, suffix: "M+", label: "Orders" },
  { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 },
  { value: 24, suffix: "/7", label: "Support" },
];

export const TRUST_LOGOS = [
  "Spice Route",
  "Urban Bites",
  "The Daily Grind",
  "Coastal Kitchen",
  "Fire & Fork",
  "Green Bowl Co.",
  "Metro Pizza",
  "Sunrise Café",
];

export const PRICING_FAQS: FaqEntry[] = [
  {
    question: "Do I need hardware?",
    answer:
      "Chefgaa works on iPad, Android tablets, and web browsers. We also support compatible receipt printers, kitchen displays, and payment terminals — or you can use your existing hardware where supported.",
  },
  {
    question: "Can I use my own printer?",
    answer:
      "Yes. Chefgaa supports a wide range of Ethernet, Bluetooth, and USB receipt printers. Our team can help you verify compatibility during onboarding.",
  },
  {
    question: "How many locations?",
    answer:
      "Starter and Professional plans cover a single location. Enterprise supports unlimited locations with centralized management, reporting, and permissions.",
  },
  {
    question: "Can I migrate data?",
    answer:
      "Absolutely. We help migrate menus, customer data, and order history from your current POS or ordering platform with minimal downtime.",
  },
  {
    question: "Do you charge commission?",
    answer:
      "No commission on your online orders. Chefgaa charges a simple monthly subscription — you keep more of every sale.",
  },
  {
    question: "Is support included?",
    answer:
      "Yes. Every plan includes email and chat support. Professional plans get priority support, and Enterprise includes a dedicated account manager.",
  },
];

export function formatPlanPrice(monthlyPrice: number | null, yearly: boolean): string {
  if (monthlyPrice === null) return "Custom";
  const price = yearly ? Math.round(monthlyPrice * (1 - YEARLY_DISCOUNT)) : monthlyPrice;
  return `₹${price.toLocaleString("en-IN")}`;
}
