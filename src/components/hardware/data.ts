import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Printer,
  ScanLine,
  Wallet,
  ChefHat,
  Tv,
  Smartphone,
  Tablet,
  Package,
  Shield,
  Truck,
  RefreshCw,
  Wifi,
} from "lucide-react";

export type HardwareCategoryId =
  | "pos-terminal"
  | "receipt-printer"
  | "barcode-scanner"
  | "cash-drawer"
  | "kitchen-display"
  | "customer-display";

export type SubNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
};

export const HARDWARE_SUBNAV: SubNavItem[] = [
  { id: "handheld", label: "Handheld", icon: Smartphone, href: "#handheld" },
  { id: "terminal", label: "Terminal", icon: Monitor, href: "#terminal" },
  { id: "register", label: "Register", icon: Tablet, href: "#register" },
  { id: "kitchen", label: "Kitchen", icon: ChefHat, href: "#kitchen-display" },
  { id: "reader", label: "Scanner", icon: ScanLine, href: "#scanner" },
  { id: "printer", label: "Printer", icon: Printer, href: "#printer" },
  { id: "drawer", label: "Drawer", icon: Wallet, href: "#drawer" },
  { id: "display", label: "Display", icon: Tv, href: "#customer-display" },
  { id: "kits", label: "Kits", icon: Package, href: "#kits" },
];

export type ProductShowcase = {
  id: string;
  anchor: string;
  badge?: string;
  title: string;
  description: string;
  price?: string;
  priceNote?: string;
  visual: HardwareCategoryId | "mobile-ordering";
  featured?: boolean;
};

export const PRODUCT_SHOWCASES: ProductShowcase[] = [
  {
    id: "register",
    anchor: "register",
    badge: "NEW",
    title: "Chefgaa Register",
    description: "A complete point-of-sale system built for busy restaurant counters.",
    price: "$899",
    priceNote: "or $44/mo over 24 months",
    visual: "pos-terminal",
    featured: true,
  },
  {
    id: "handheld",
    anchor: "handheld",
    title: "Chefgaa Handheld",
    description: "The powerful POS that moves with you across the dining room.",
    price: "$399",
    priceNote: "or $37/mo over 12 months",
    visual: "mobile-ordering",
  },
  {
    id: "terminal",
    anchor: "terminal",
    title: "Chefgaa Terminal",
    description: "The all-in-one POS with a built-in receipt printer.",
    price: "$299",
    priceNote: "or $27/mo over 12 months",
    visual: "pos-terminal",
  },
  {
    id: "kitchen-display",
    anchor: "kitchen-display",
    title: "Kitchen Display",
    description: "Real-time order routing that keeps your back of house in perfect sync.",
    price: "$349",
    priceNote: "or $32/mo over 12 months",
    visual: "kitchen-display",
  },
  {
    id: "scanner",
    anchor: "scanner",
    title: "Barcode Scanner",
    description: "The portable scanner for instant inventory and checkout.",
    price: "$59",
    visual: "barcode-scanner",
  },
  {
    id: "printer",
    anchor: "printer",
    title: "Receipt Printer",
    description: "Fast, quiet thermal printing for every ticket.",
    price: "$199",
    priceNote: "or $18/mo over 12 months",
    visual: "receipt-printer",
  },
];

export type CompareDevice = {
  id: string;
  name: string;
  shortDescription: string;
  visual: HardwareCategoryId | "mobile-ordering";
  rows: Record<string, string>;
};

export const COMPARE_DEVICES: CompareDevice[] = [
  {
    id: "handheld",
    name: "Handheld",
    shortDescription: "A pocketable POS for tableside orders and payments.",
    visual: "mobile-ordering",
    rows: {
      "Accepted payments": "Contactless, Chip",
      Power: "Battery — cordless use",
      "Internet connection": "Wi-Fi",
      "Additional devices": "No additional device required",
      Price: "$399 or $37/mo over 12 months",
    },
  },
  {
    id: "terminal",
    name: "Terminal",
    shortDescription: "A compact card machine with a built-in receipt printer.",
    visual: "pos-terminal",
    rows: {
      "Accepted payments": "Contactless, Chip, Magstripe",
      Power: "Battery or wall outlet",
      "Internet connection": "Wi-Fi or Ethernet",
      "Additional devices": "No additional device required",
      Price: "$299 or $27/mo over 12 months",
    },
  },
  {
    id: "register",
    name: "Register",
    shortDescription: "A complete point-of-sale system built for busy counters.",
    visual: "pos-terminal",
    rows: {
      "Accepted payments": "Contactless, Chip, Magstripe",
      Power: "Wall outlet",
      "Internet connection": "Wi-Fi or Ethernet",
      "Additional devices": "No additional device required",
      Price: "$899 or $44/mo over 24 months",
    },
  },
  {
    id: "kitchen",
    name: "Kitchen Display",
    shortDescription: "Real-time orders for a seamless kitchen flow.",
    visual: "kitchen-display",
    rows: {
      "Accepted payments": "—",
      Power: "Wall outlet",
      "Internet connection": "Wi-Fi or Ethernet",
      "Additional devices": "No additional device required",
      Price: "$349 or $32/mo over 12 months",
    },
  },
  {
    id: "scanner",
    name: "Scanner",
    shortDescription: "A portable scanner for inventory and checkout.",
    visual: "barcode-scanner",
    rows: {
      "Accepted payments": "—",
      Power: "USB powered",
      "Internet connection": "Via your POS",
      "Additional devices": "Connects via USB or Bluetooth",
      Price: "$59",
    },
  },
  {
    id: "tablet",
    name: "Tablet",
    shortDescription: "A flexible tablet POS for tableside and counter service.",
    visual: "customer-display",
    rows: {
      "Accepted payments": "Contactless, Chip",
      Power: "Battery — cordless use",
      "Internet connection": "Wi-Fi",
      "Additional devices": "Requires compatible tablet",
      Price: "$149 or $14/mo over 12 months",
    },
  },
];

export const COMPARE_ROW_LABELS = [
  "Accepted payments",
  "Power",
  "Internet connection",
  "Additional devices",
  "Price",
] as const;

export const ACCESSORIES = [
  {
    id: "counter-kit",
    title: "Counter Kit",
    description: "POS terminal, receipt printer, and cash drawer — everything for your front counter.",
    price: "From $1,099",
    visual: "pos-terminal" as const,
  },
  {
    id: "kitchen-kit",
    title: "Kitchen Kit",
    description: "Kitchen display with mounting hardware and station labels.",
    price: "From $449",
    visual: "kitchen-display" as const,
  },
];

export const PEACE_OF_MIND = [
  {
    title: "No surprise fees",
    description: "No long-term contracts required.",
    icon: Shield,
  },
  {
    title: "Limited warranties",
    description: "And free 30-day returns.",
    icon: RefreshCw,
  },
  {
    title: "Carbon-neutral shipping",
    description: "And more sustainability initiatives.",
    icon: Truck,
  },
  {
    title: "Process payments securely",
    description: "Even when offline.",
    icon: Wifi,
  },
];

export const USE_CASES = [
  {
    title: "Turn tables, keep orders flowing",
    description: "Run your restaurant smoothly with Chefgaa for Restaurants.",
    link: "Explore Chefgaa for Restaurants",
    gradient: "from-[#fff4f0] via-[#f8f9fa] to-[#f0f7ff]",
  },
  {
    title: "Simplify your day-to-day",
    description: "A complete retail POS system for modern operators.",
    link: "Explore Chefgaa for Retail",
    gradient: "from-[#f0f7ff] via-[#f8f9fa] to-[#fff8f0]",
  },
  {
    title: "Manage staff and payments",
    description: "Appointments, payments, and insights with ease.",
    link: "Explore Chefgaa for Services",
    gradient: "from-[#f5f0ff] via-[#f8f9fa] to-[#f0faf5]",
  },
];

export const RESOURCE_CARDS = [
  {
    title: "Chat with us",
    description: "Connect with our customer support team for help whenever you need it.",
    link: "Get connected",
    to: "/contact",
  },
  {
    title: "Find a partner",
    description: "Want Chefgaa hardware today? Find authorized partners near you.",
    link: "See partners",
    to: "/contact",
  },
];
