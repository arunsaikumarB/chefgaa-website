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
  Laptop,
  Zap,
  Shield,
  Cloud,
  Wifi,
  CreditCard,
  TrendingUp,
} from "lucide-react";

export type ProductId =
  | "register"
  | "terminal"
  | "handheld"
  | "kitchen-display"
  | "barcode-scanner"
  | "receipt-printer"
  | "customer-display"
  | "cash-drawer"
  | "tablet";

export type VisualId = ProductId | "workstation" | "mobile-ordering";

export const NAV_CATEGORIES: {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}[] = [
  { id: "register", label: "Register", icon: Monitor, href: "#register" },
  { id: "terminal", label: "Terminal", icon: Tablet, href: "#terminal" },
  { id: "handheld", label: "Handheld", icon: Smartphone, href: "#handheld" },
  { id: "kitchen", label: "Kitchen Display", icon: ChefHat, href: "#kitchen-display" },
  { id: "scanner", label: "Barcode Scanner", icon: ScanLine, href: "#barcode-scanner" },
  { id: "printer", label: "Receipt Printer", icon: Printer, href: "#receipt-printer" },
  { id: "display", label: "Customer Display", icon: Tv, href: "#customer-display" },
  { id: "drawer", label: "Cash Drawer", icon: Wallet, href: "#cash-drawer" },
  { id: "tablet", label: "Tablet", icon: Laptop, href: "#tablet" },
  { id: "accessories", label: "Accessories", icon: Package, href: "#kits" },
];

export const GRID_PRODUCTS: {
  id: ProductId;
  anchor: string;
  name: string;
  description: string;
  specs: string[];
  visual: VisualId;
}[] = [
  {
    id: "register",
    anchor: "register",
    name: "Chefgaa Register",
    description: "A complete countertop POS built for high-volume restaurant service.",
    specs: ['15.6" touch display', "Wi-Fi & Ethernet", "Integrated payments"],
    visual: "register",
  },
  {
    id: "terminal",
    anchor: "terminal",
    name: "Chefgaa Terminal",
    description: "Compact all-in-one terminal with a built-in receipt printer.",
    specs: ["Built-in printer", "All-day battery", "Offline mode"],
    visual: "terminal",
  },
  {
    id: "handheld",
    anchor: "handheld",
    name: "Chefgaa Handheld",
    description: "Tableside ordering and payments that move with your team.",
    specs: ["Built-in scanner", "Contactless payments", "8+ hour battery"],
    visual: "handheld",
  },
  {
    id: "kitchen-display",
    anchor: "kitchen-display",
    name: "Kitchen Display",
    description: "Real-time order routing for a seamless back-of-house flow.",
    specs: ['21.5" HD display', "Multi-station routing", "Bump bar ready"],
    visual: "kitchen-display",
  },
  {
    id: "barcode-scanner",
    anchor: "barcode-scanner",
    name: "Barcode Scanner",
    description: "Instant inventory scanning with live POS sync.",
    specs: ["1D & 2D barcodes", "USB & Bluetooth", "Hands-free stand"],
    visual: "barcode-scanner",
  },
  {
    id: "receipt-printer",
    anchor: "receipt-printer",
    name: "Receipt Printer",
    description: "Fast, quiet thermal printing for every ticket.",
    specs: ["200mm/s speed", "Auto-cutter", "Ethernet & USB"],
    visual: "receipt-printer",
  },
  {
    id: "customer-display",
    anchor: "customer-display",
    name: "Customer Display",
    description: "Clear totals, tips, and payment prompts at checkout.",
    specs: ['10" portrait display', "Tip selection", "USB powered"],
    visual: "customer-display",
  },
  {
    id: "cash-drawer",
    anchor: "cash-drawer",
    name: "Cash Drawer",
    description: "Secure cash management that opens with every sale.",
    specs: ["Steel construction", "Auto-open trigger", "Removable tray"],
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

export const COMPARE_COLUMNS = ["Register", "Terminal", "Handheld", "Kitchen Display"] as const;

export const COMPARE_ROWS: { label: string; values: [string, string, string, string] }[] = [
  { label: "Screen", values: ['15.6" HD touch', '5.5" touch', '6.5" touch', '21.5" HD'] },
  { label: "Printer", values: ["Optional", "Built-in", "—", "—"] },
  { label: "Scanner Support", values: ["USB / Bluetooth", "Built-in", "Built-in", "—"] },
  { label: "Payments", values: ["All methods", "All methods", "Contactless & chip", "—"] },
  { label: "Battery", values: ["—", "All-day", "All-day", "—"] },
  { label: "Connectivity", values: ["Wi-Fi, Ethernet", "Wi-Fi, Ethernet", "Wi-Fi", "Wi-Fi, Ethernet"] },
  { label: "OS", values: ["Chefgaa OS", "Chefgaa OS", "Chefgaa OS", "Chefgaa OS"] },
  { label: "Offline Mode", values: ["Yes", "Yes", "Yes", "—"] },
  { label: "Recommended Business", values: ["Full-service", "Counter / Cafe", "Tableside", "Kitchen"] },
  { label: "Warranty", values: ["2 years", "2 years", "1 year", "2 years"] },
];

export const KITS = [
  {
    id: "counter",
    name: "Counter Kit",
    includes: ["Register", "Receipt Printer", "Cash Drawer", "Customer Display"],
    price: "From $1,299",
    visual: "register" as VisualId,
  },
  {
    id: "kitchen",
    name: "Kitchen Kit",
    includes: ["Kitchen Display", "Mounting hardware", "Station labels"],
    price: "From $449",
    visual: "kitchen-display" as VisualId,
  },
  {
    id: "mobile",
    name: "Mobile Ordering Kit",
    includes: ["Handheld POS", "Charging dock", "Protective case"],
    price: "From $499",
    visual: "handheld" as VisualId,
  },
  {
    id: "drive-thru",
    name: "Drive-Thru Kit",
    includes: ["Outdoor display", "Speaker system", "Handheld POS"],
    price: "From $899",
    visual: "terminal" as VisualId,
  },
];

export const WHY_ITEMS = [
  { title: "Lightning Fast", description: "Sub-second transactions keep your line moving during the rush.", icon: Zap, tint: "#FFF4F0" },
  { title: "Restaurant Grade", description: "Spill-resistant, heat-tolerant hardware for real kitchen environments.", icon: Shield, tint: "#F0F7FF" },
  { title: "Cloud Connected", description: "Every device syncs in real time with your Chefgaa dashboard.", icon: Cloud, tint: "#F5F0FF" },
  { title: "Offline Ready", description: "Keep taking payments even when the internet goes down.", icon: Wifi, tint: "#F0FAF5" },
  { title: "Secure Payments", description: "PCI-compliant encryption on every transaction.", icon: CreditCard, tint: "#FFF8F0" },
  { title: "Built to Scale", description: "From one location to hundreds — grow without replacing hardware.", icon: TrendingUp, tint: "#F5F6F8" },
];

export const SOFTWARE_MODULES = [
  "POS",
  "Inventory",
  "Kitchen Display",
  "Online Ordering",
  "Reservations",
  "CRM",
  "Loyalty",
  "Marketing",
  "Analytics",
];

export const GALLERY = [
  { id: "cashier", label: "Restaurant cashier", aspect: "tall" },
  { id: "kitchen", label: "Kitchen line", aspect: "wide" },
  { id: "handheld", label: "Waiter handheld", aspect: "square" },
  { id: "drive-thru", label: "Drive-thru window", aspect: "wide" },
  { id: "ordering", label: "Customer ordering", aspect: "tall" },
] as const;

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
