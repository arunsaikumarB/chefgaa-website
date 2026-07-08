import type { LucideIcon } from "lucide-react";
import {
  Zap,
  Shield,
  Cloud,
  Plug,
  CreditCard,
  TrendingUp,
} from "lucide-react";

export type HardwareCategoryId =
  | "pos-terminal"
  | "receipt-printer"
  | "barcode-scanner"
  | "cash-drawer"
  | "kitchen-display"
  | "customer-display";

export type HardwareCategory = {
  id: HardwareCategoryId;
  title: string;
  description: string;
  tint: string;
};

export const HARDWARE_CATEGORIES: HardwareCategory[] = [
  {
    id: "pos-terminal",
    title: "POS Terminal",
    description: "A fast, intuitive countertop terminal built for high-volume restaurant service.",
    tint: "from-[#fff4f0] to-[#fffaf7]",
  },
  {
    id: "receipt-printer",
    title: "Receipt Printer",
    description: "Thermal printing that keeps tickets moving — fast, quiet, and reliable.",
    tint: "from-[#f8f9fa] to-[#ffffff]",
  },
  {
    id: "barcode-scanner",
    title: "Barcode Scanner",
    description: "Instant inventory scanning with seamless POS integration.",
    tint: "from-[#f0f7ff] to-[#ffffff]",
  },
  {
    id: "cash-drawer",
    title: "Cash Drawer",
    description: "Secure, durable cash management that opens automatically with every sale.",
    tint: "from-[#f5f0ff] to-[#ffffff]",
  },
  {
    id: "kitchen-display",
    title: "Kitchen Display",
    description: "Real-time order routing that keeps your back of house in perfect sync.",
    tint: "from-[#fff8f0] to-[#ffffff]",
  },
  {
    id: "customer-display",
    title: "Customer Display",
    description: "Face guests with clear totals, tips, and payment prompts at checkout.",
    tint: "from-[#f0faf5] to-[#ffffff]",
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: "pos-terminal",
    eyebrow: "Smart POS Terminal",
    headline: ["Fast.", "Reliable.", "Built for restaurants."],
    description:
      "Purpose-built for the pace of a busy restaurant floor — from quick-service counters to full-service dining rooms.",
    features: [
      "15.6\" responsive touch display",
      "All-day battery with wall-power mode",
      "Wi-Fi, Ethernet & offline payments",
      "Integrated with Chefgaa POS software",
    ],
    reverse: false,
  },
  {
    id: "kitchen-display",
    eyebrow: "Kitchen Display",
    headline: ["Keep your", "kitchen moving."],
    description:
      "Route every order to the right station in real time. Color-coded tickets, prep timers, and bump bars keep the line flowing.",
    features: [
      "Multi-station order routing",
      "Real-time sync with POS",
      "Rush-hour prioritization",
      "Mount-ready rugged design",
    ],
    reverse: true,
  },
  {
    id: "mobile-ordering",
    eyebrow: "Mobile Ordering",
    headline: ["Take orders", "anywhere."],
    description:
      "Tableside ordering and payments on a pocketable device your staff can carry across the floor.",
    features: [
      "Handheld POS with built-in scanner",
      "Contactless & chip payments",
      "All-day battery life",
      "Instant sync with kitchen",
    ],
    reverse: false,
  },
  {
    id: "barcode-scanner",
    eyebrow: "Barcode Scanner",
    headline: ["Instant", "inventory scanning."],
    description:
      "Scan items at the counter or in the stockroom. Every scan updates inventory across your Chefgaa ecosystem.",
    features: [
      "1D & 2D barcode support",
      "USB & Bluetooth connectivity",
      "Hands-free stand mode",
      "Real-time stock updates",
    ],
    reverse: true,
  },
  {
    id: "receipt-printer",
    eyebrow: "Receipt Printer",
    headline: ["Fast printing.", "Quiet operation."],
    description:
      "High-speed thermal printing for receipts, kitchen tickets, and labels — without disrupting the dining room.",
    features: [
      "200mm/s print speed",
      "Auto-cutter & jam detection",
      "Ethernet & USB connectivity",
      "Compact countertop footprint",
    ],
    reverse: false,
  },
] as const;

export const ECOSYSTEM_DEVICES = [
  { id: "pos", label: "POS Terminal", angle: -90, distance: 0 },
  { id: "printer", label: "Receipt Printer", angle: -35, distance: 1 },
  { id: "scanner", label: "Barcode Scanner", angle: 35, distance: 1 },
  { id: "drawer", label: "Cash Drawer", angle: 90, distance: 0.6 },
  { id: "customer", label: "Customer Display", angle: 145, distance: 1 },
  { id: "kitchen", label: "Kitchen Display", angle: 200, distance: 1.2 },
  { id: "tablet", label: "Tablet", angle: 250, distance: 1.1 },
  { id: "phone", label: "Mobile", angle: 310, distance: 1.3 },
] as const;

export const WHY_HARDWARE: {
  title: string;
  description: string;
  icon: LucideIcon;
  tint: string;
}[] = [
  {
    title: "Lightning Fast",
    description: "Sub-second transaction processing keeps your line moving during the rush.",
    icon: Zap,
    tint: "from-[#fff4f0] to-[#ffede8]",
  },
  {
    title: "Restaurant Grade",
    description: "Spill-resistant, heat-tolerant hardware built for the realities of a busy kitchen.",
    icon: Shield,
    tint: "from-[#f0f7ff] to-[#e8f2ff]",
  },
  {
    title: "Cloud Connected",
    description: "Every device syncs in real time with your Chefgaa cloud dashboard.",
    icon: Cloud,
    tint: "from-[#f5f0ff] to-[#ede8ff]",
  },
  {
    title: "Plug & Play",
    description: "Unbox, connect, and start taking orders in minutes — no IT team required.",
    icon: Plug,
    tint: "from-[#f0faf5] to-[#e8f5ee]",
  },
  {
    title: "Secure Payments",
    description: "PCI-compliant encryption on every transaction, online and offline.",
    icon: CreditCard,
    tint: "from-[#fff8f0] to-[#ffefe0]",
  },
  {
    title: "Built to Scale",
    description: "From one location to hundreds — add devices as your business grows.",
    icon: TrendingUp,
    tint: "from-[#f8f9fa] to-[#f0f1f3]",
  },
];

export const COMPARISON_PRODUCTS = ["POS", "Printer", "Scanner", "Kitchen Display", "Tablet"] as const;

export const COMPARISON_ROWS: {
  label: string;
  values: [string, string, string, string, string];
}[] = [
  {
    label: "Connectivity",
    values: ["Wi-Fi, Ethernet", "USB, Ethernet", "USB, Bluetooth", "Wi-Fi, Ethernet", "Wi-Fi, Bluetooth"],
  },
  {
    label: "Touch Screen",
    values: ["15.6\" HD", "—", "—", "21.5\" HD", "10.9\" HD"],
  },
  {
    label: "Warranty",
    values: ["2 years", "1 year", "1 year", "2 years", "1 year"],
  },
  {
    label: "Recommended Use",
    values: ["Counter / Bar", "Counter", "Counter / Stockroom", "Kitchen", "Tableside / Mobile"],
  },
];

export const GALLERY_ITEMS = [
  { id: "pos-front", label: "POS Terminal — Front", angle: "front" },
  { id: "pos-side", label: "POS Terminal — Side", angle: "side" },
  { id: "printer", label: "Receipt Printer", angle: "front" },
  { id: "scanner", label: "Barcode Scanner", angle: "side" },
  { id: "kitchen", label: "Kitchen Display", angle: "front" },
  { id: "workstation", label: "Full Workstation", angle: "hero" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We replaced our entire counter setup with Chefgaa hardware. Setup took an afternoon, and our staff was comfortable by dinner service.",
    name: "Priya Sharma",
    role: "Owner, Spice Route Kitchen",
    location: "Austin, TX",
  },
  {
    quote:
      "The kitchen display alone cut our ticket times by 20%. Everything talks to everything — no more missed modifiers.",
    name: "Marcus Chen",
    role: "GM, Harbor & Vine",
    location: "San Francisco, CA",
  },
  {
    quote:
      "Tableside ordering with the handheld changed our service model. Guests love it, and turnover is up without feeling rushed.",
    name: "Elena Rodriguez",
    role: "Operations Director, Casa Norte Group",
    location: "Miami, FL",
  },
];

export const SOFTWARE_MODULES = [
  "POS",
  "Inventory",
  "Online Ordering",
  "Kitchen Display",
  "CRM",
  "Loyalty",
  "Analytics",
];
