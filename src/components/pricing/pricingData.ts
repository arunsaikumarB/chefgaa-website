export type PlanTier = "starter" | "professional" | "enterprise";

export type PricingPlan = {
  id: PlanTier;
  name: string;
  tagline: string;
  price: string;
  priceNote?: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  extraFeatures?: string[];
  cta: string;
  ctaTo: string;
  ctaVariant: "primary" | "secondary";
};

export type CompareCell = "yes" | "no" | "unlimited";

export type CompareRow = {
  feature: string;
  starter: CompareCell;
  professional: CompareCell;
  enterprise: CompareCell;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for cafés and single restaurants.",
    price: "₹999",
    priceNote: "/month",
    features: ["POS", "Online Ordering", "Website", "QR Menu", "Basic Reports"],
    cta: "Start Free Trial",
    ctaTo: "/contact",
    ctaVariant: "secondary",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Everything you need to run a growing restaurant.",
    price: "₹2,499",
    priceNote: "/month",
    badge: "Most Popular",
    featured: true,
    features: ["Everything in Starter"],
    extraFeatures: [
      "Kitchen Display",
      "Reservations",
      "Payments",
      "Inventory",
      "CRM",
      "Loyalty",
      "Marketing",
      "Analytics",
    ],
    cta: "Start Free Trial",
    ctaTo: "/contact",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Built for restaurant groups and franchises at scale.",
    price: "Custom Pricing",
    features: [
      "Everything included",
      "Unlimited Locations",
      "Dedicated Support",
      "API",
      "Custom Integrations",
      "White Label",
      "Advanced Analytics",
    ],
    cta: "Talk to Sales",
    ctaTo: "/contact",
    ctaVariant: "secondary",
  },
];

export const COMPARE_ROWS: CompareRow[] = [
  { feature: "POS", starter: "yes", professional: "yes", enterprise: "yes" },
  { feature: "Website", starter: "yes", professional: "yes", enterprise: "yes" },
  { feature: "Online Ordering", starter: "yes", professional: "yes", enterprise: "yes" },
  { feature: "Kitchen Display", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Reservations", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Inventory", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "CRM", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Loyalty", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Marketing", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Payments", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Analytics", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "Integrations", starter: "no", professional: "yes", enterprise: "yes" },
  { feature: "API", starter: "no", professional: "no", enterprise: "yes" },
  { feature: "White Label", starter: "no", professional: "no", enterprise: "yes" },
  {
    feature: "Unlimited Locations",
    starter: "no",
    professional: "no",
    enterprise: "unlimited",
  },
  { feature: "Dedicated Support", starter: "no", professional: "no", enterprise: "yes" },
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
