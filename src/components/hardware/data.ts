import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Printer,
  ScanLine,
  Wallet,
  ChefHat,
  Tv,
  Tablet,
  Zap,
  Shield,
  Cloud,
  Wifi,
  CreditCard,
  TrendingUp,
  Dock,
  Cable,
  Bluetooth,
  Hand,
  Scissors,
  Usb,
  Construction,
  Bell,
  Share2,
  MoveVertical,
  Smartphone,
  Disc,
} from "lucide-react";

export type ProductId =
  | "register"
  | "terminal"
  | "display-stand"
  | "handheld"
  | "kitchen-display"
  | "barcode-scanner"
  | "receipt-printer"
  | "customer-display"
  | "cash-drawer"
  | "tablet";

export type VisualId = ProductId | "workstation" | "mobile-ordering";

export type HardwareChip = {
  label: string;
  icon: LucideIcon;
};

export const NAV_CATEGORIES: {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}[] = [
  { id: "register", label: "Register", icon: Monitor, href: "#register" },
  { id: "stand", label: "Stand", icon: Dock, href: "#display-stand" },
  { id: "kitchen", label: "Kitchen Display", icon: ChefHat, href: "#kitchen-display" },
  { id: "scanner", label: "Barcode Scanner", icon: ScanLine, href: "#barcode-scanner" },
  { id: "printer", label: "Receipt Printer", icon: Printer, href: "#receipt-printer" },
  { id: "display", label: "Customer Display", icon: Tv, href: "#customer-display" },
  { id: "drawer", label: "Cash Drawer", icon: Wallet, href: "#cash-drawer" },
];

export const GRID_PRODUCTS: {
  id: ProductId;
  anchor: string;
  name: string;
  description: string;
  chips: HardwareChip[];
  visual: VisualId;
}[] = [
  {
    id: "display-stand",
    anchor: "display-stand",
    name: "Customer Display Stand",
    description:
      "Elegant customer-facing display for order confirmation, receipts, loyalty, and tipping.",
    chips: [
      { label: "Adjustable Angle", icon: MoveVertical },
      { label: "Tablet Compatible", icon: Tablet },
      { label: "Aluminum Base", icon: Disc },
    ],
    visual: "display-stand",
  },
  {
    id: "kitchen-display",
    anchor: "kitchen-display",
    name: "Kitchen Display",
    description: "Real-time order routing for a seamless back-of-house flow.",
    chips: [
      { label: '21.5" HD Display', icon: Monitor },
      { label: "Multi-station Routing", icon: Share2 },
      { label: "Bump Bar Ready", icon: Bell },
    ],
    visual: "kitchen-display",
  },
  {
    id: "barcode-scanner",
    anchor: "barcode-scanner",
    name: "Barcode Scanner",
    description: "Instant inventory scanning with live POS sync.",
    chips: [
      { label: "1D & 2D Barcodes", icon: ScanLine },
      { label: "USB & Bluetooth", icon: Bluetooth },
      { label: "Hands-free Stand", icon: Hand },
    ],
    visual: "barcode-scanner",
  },
  {
    id: "receipt-printer",
    anchor: "receipt-printer",
    name: "Receipt Printer",
    description: "Fast, quiet thermal printing for every ticket.",
    chips: [
      { label: "200mm/s Speed", icon: Zap },
      { label: "Auto-cutter", icon: Scissors },
      { label: "Ethernet & USB", icon: Cable },
    ],
    visual: "receipt-printer",
  },
  {
    id: "customer-display",
    anchor: "customer-display",
    name: "Customer Display",
    description: "Clear totals, tips, and payment prompts at checkout.",
    chips: [
      { label: '10" Portrait Display', icon: Smartphone },
      { label: "Tip Selection", icon: CreditCard },
      { label: "USB Powered", icon: Usb },
    ],
    visual: "customer-display",
  },
  {
    id: "cash-drawer",
    anchor: "cash-drawer",
    name: "Cash Drawer",
    description: "Secure cash management that opens with every sale.",
    chips: [
      { label: "Steel Construction", icon: Construction },
      { label: "Auto-open Trigger", icon: Zap },
      { label: "Removable Tray", icon: Wallet },
    ],
    visual: "cash-drawer",
  },
];

export const FEATURED = {
  id: "register",
  eyebrow: "Flagship",
  name: "Chefgaa Register",
  headline: "The complete POS for modern restaurants.",
  description:
    "Purpose-built for the pace of a busy floor — from quick-service counters to full-service dining rooms. Every transaction, every order, one intelligent system.",
  features: [
    "Dual-screen checkout with customer-facing display",
    "Sub-second payment processing",
    "Wi-Fi, Ethernet, and offline payments",
    "Deep integration with Chefgaa OS",
  ],
  price: "From $899",
  priceNote: "or flexible monthly plans",
  visual: "register" as VisualId,
};

export type CompareCell =
  | { kind: "check" }
  | { kind: "dash" }
  | { kind: "infinity" }
  | { kind: "optional" }
  | { kind: "text"; value: string };

export type CompareDevice = {
  id: string;
  name: string;
  tagline: string;
  visual: VisualId;
};

export type CompareGroup = {
  id: string;
  label: string;
  rows: { label: string; values: CompareCell[] }[];
};

export const COMPARE_DEVICES: CompareDevice[] = [
  {
    id: "register",
    name: "Register",
    tagline: "Complete countertop POS",
    visual: "register",
  },
  {
    id: "terminal",
    name: "Terminal",
    tagline: "Built-in printer POS",
    visual: "terminal",
  },
  {
    id: "stand",
    name: "Stand",
    tagline: "Customer Display Stand",
    visual: "display-stand",
  },
  {
    id: "kitchen",
    name: "Kitchen Display",
    tagline: "Kitchen Order Screen",
    visual: "kitchen-display",
  },
  {
    id: "scanner",
    name: "Barcode Scanner",
    tagline: "Fast inventory scanning",
    visual: "barcode-scanner",
  },
  {
    id: "printer",
    name: "Receipt Printer",
    tagline: "Thermal printing",
    visual: "receipt-printer",
  },
  {
    id: "drawer",
    name: "Cash Drawer",
    tagline: "Secure cash management",
    visual: "cash-drawer",
  },
  {
    id: "display",
    name: "Customer Display",
    tagline: "Customer-facing display",
    visual: "customer-display",
  },
];

const yes = { kind: "check" } as const;
const no = { kind: "dash" } as const;
const unlimited = { kind: "infinity" } as const;
const optional = { kind: "optional" } as const;
const t = (value: string): CompareCell => ({ kind: "text", value });

export const COMPARE_GROUPS: CompareGroup[] = [
  {
    id: "general",
    label: "General",
    rows: [
      {
        label: "Device",
        values: [
          t("Countertop POS"),
          t("Compact POS"),
          t("Display stand"),
          t("Kitchen screen"),
          t("Scanner"),
          t("Printer"),
          t("Cash drawer"),
          t("Customer display"),
        ],
      },
      {
        label: "Recommended Business",
        values: [
          t("Full-service"),
          t("Counter / Cafe"),
          t("Checkout"),
          t("Kitchen"),
          t("Retail / Inventory"),
          t("Any service"),
          t("Cash operations"),
          t("Checkout"),
        ],
      },
      {
        label: "Operating System",
        values: [
          t("Chefgaa OS"),
          t("Chefgaa OS"),
          t("—"),
          t("Chefgaa OS"),
          t("—"),
          t("—"),
          t("—"),
          t("Chefgaa OS"),
        ],
      },
    ],
  },
  {
    id: "display",
    label: "Display",
    rows: [
      {
        label: "Screen Size",
        values: [
          t('15.6" HD'),
          t('5.5"'),
          t("Tablet ready"),
          t('21.5" HD'),
          no,
          no,
          no,
          t('10" portrait'),
        ],
      },
      {
        label: "Resolution",
        values: [
          t("1920 × 1080"),
          t("1280 × 720"),
          t("Device native"),
          t("1920 × 1080"),
          no,
          no,
          no,
          t("1280 × 800"),
        ],
      },
      {
        label: "Touch Support",
        values: [yes, yes, t("Via tablet"), yes, no, no, no, yes],
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    rows: [
      {
        label: "Processor",
        values: [
          t("Octa-core"),
          t("Quad-core"),
          t("—"),
          t("Dedicated SoC"),
          t("Embedded"),
          t("Thermal engine"),
          t("—"),
          t("Quad-core"),
        ],
      },
      {
        label: "Offline Mode",
        values: [yes, yes, no, no, no, no, no, no],
      },
      {
        label: "Response Time",
        values: [
          t("Sub-second"),
          t("Sub-second"),
          t("Instant"),
          t("Real-time"),
          t("Instant scan"),
          t("200mm/s"),
          t("Auto-open"),
          t("Instant"),
        ],
      },
    ],
  },
  {
    id: "connectivity",
    label: "Connectivity",
    rows: [
      {
        label: "Wi-Fi",
        values: [yes, yes, no, yes, optional, optional, no, yes],
      },
      {
        label: "Ethernet",
        values: [yes, yes, no, yes, optional, yes, no, optional],
      },
      {
        label: "Bluetooth / USB",
        values: [yes, yes, yes, optional, yes, yes, yes, yes],
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    rows: [
      {
        label: "Card Support",
        values: [yes, yes, no, no, no, no, no, yes],
      },
      {
        label: "Tap to Pay",
        values: [yes, yes, no, no, no, no, no, yes],
      },
      {
        label: "Cash Support",
        values: [yes, optional, no, no, no, no, yes, no],
      },
    ],
  },
  {
    id: "power",
    label: "Power",
    rows: [
      {
        label: "Battery",
        values: [no, t("All-day"), no, no, optional, no, no, no],
      },
      {
        label: "Power Supply",
        values: [
          t("AC / PoE"),
          t("AC / Battery"),
          t("Passive"),
          t("AC"),
          t("USB / Battery"),
          t("AC / USB"),
          t("POS trigger"),
          t("USB"),
        ],
      },
    ],
  },
  {
    id: "compatibility",
    label: "Compatibility",
    rows: [
      {
        label: "Chefgaa OS Integration",
        values: [yes, yes, yes, yes, yes, yes, yes, yes],
      },
      {
        label: "Mount Options",
        values: [
          t("Counter / Stand"),
          t("Counter"),
          t("Adjustable"),
          t("Wall / Arm"),
          t("Hands-free stand"),
          t("Counter"),
          t("Under counter"),
          t("Portrait mount"),
        ],
      },
      {
        label: "Multi-location",
        values: [unlimited, unlimited, unlimited, unlimited, unlimited, unlimited, unlimited, unlimited],
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty",
    rows: [
      {
        label: "Warranty Period",
        values: [
          t("2 years"),
          t("1 year"),
          t("1 year"),
          t("2 years"),
          t("1 year"),
          t("1 year"),
          t("1 year"),
          t("1 year"),
        ],
      },
    ],
  },
];

/** @deprecated kept for any legacy references — use COMPARE_DEVICES / COMPARE_GROUPS */
export const COMPARE_COLUMNS = ["Register", "Terminal", "Handheld", "Kitchen Display"] as const;
export const COMPARE_ROWS: { label: string; values: [string, string, string, string] }[] = [];

export const WHY_ITEMS = [
  { title: "Lightning Fast", description: "Sub-second transactions keep your line moving during the rush.", icon: Zap, tint: "#FFF4F0" },
  { title: "Restaurant Grade", description: "Spill-resistant, heat-tolerant hardware for real kitchen environments.", icon: Shield, tint: "#F0F7FF" },
  { title: "Cloud Connected", description: "Every device syncs in real time with your Chefgaa dashboard.", icon: Cloud, tint: "#F5F0FF" },
  { title: "Offline Ready", description: "Keep taking payments even when the internet goes down.", icon: Wifi, tint: "#F0FAF5" },
  { title: "Secure Payments", description: "PCI-compliant encryption on every transaction.", icon: CreditCard, tint: "#FFF8F0" },
  { title: "Built to Scale", description: "From one location to hundreds — grow without replacing hardware.", icon: TrendingUp, tint: "#F5F6F8" },
];

export const STORIES = [
  {
    quote: "We replaced our entire counter in one afternoon. By dinner service, the team was already faster than before.",
    name: "Priya Sharma",
    role: "Owner, Spice Route Kitchen",
    metric: "22% faster checkout",
    gradient: "from-[#FFF4F0] to-[#F5F6F8]",
  },
  {
    quote: "The kitchen display cut ticket times dramatically. Modifiers never get lost anymore.",
    name: "Marcus Chen",
    role: "GM, Harbor & Vine",
    metric: "20% faster ticket times",
    gradient: "from-[#F0F7FF] to-[#F5F6F8]",
  },
  {
    quote: "Tableside ordering changed how we serve. Guests love it, and turnover is up without feeling rushed.",
    name: "Elena Rodriguez",
    role: "Director, Casa Norte Group",
    metric: "15% higher table turnover",
    gradient: "from-[#F5F0FF] to-[#F5F6F8]",
  },
];

export const HARDWARE_FAQ = [
  {
    question: "Does Chefgaa hardware work without an internet connection?",
    answer: "Yes. Register, Terminal, and Handheld devices support offline payments. Transactions sync automatically when connectivity returns.",
  },
  {
    question: "Can I mix and match hardware from different kits?",
    answer: "Absolutely. Every Chefgaa device is designed to work together. Start with a kit and add components as your operation grows.",
  },
  {
    question: "What warranty comes with Chefgaa hardware?",
    answer: "Register and Kitchen Display include a 2-year warranty. Terminal and Handheld include 1 year. All devices come with free 30-day returns.",
  },
  {
    question: "Do I need a separate software subscription?",
    answer: "Yes. Chefgaa hardware requires an active Chefgaa software plan. Hardware and software are deeply integrated for the best experience.",
  },
  {
    question: "How long does setup take?",
    answer: "Most restaurants are up and running in under an hour. Plug in, connect to Wi-Fi, and your devices auto-configure through Chefgaa OS.",
  },
];
