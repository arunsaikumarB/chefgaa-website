import type { LucideIcon } from "lucide-react";
import type { MegaMenuSection } from "./megaMenuTypes";
import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  CalendarRange,
  ChefHat,
  Clock,
  Code2,
  CreditCard,
  FileText,
  Globe,
  Layout,
  MapPin,
  MessageCircle,
  Monitor,
  MonitorSmartphone,
  Package,
  Percent,
  Puzzle,
  QrCode,
  Receipt,
  RefreshCw,
  Route,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Split,
  Store,
  Timer,
  Truck,
  UtensilsCrossed,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

export type FeatureHighlight = {
  title: string;
  icon: LucideIcon;
};

export type FeatureMenuItem = {
  id: string;
  to: string;
  title: string;
  icon: LucideIcon;
  description: string;
  highlights: FeatureHighlight[];
};

export const FEATURE_MENU_ITEMS: FeatureMenuItem[] = [
  {
    id: "online-ordering",
    to: "/online-ordering",
    title: "Online Ordering",
    icon: ShoppingCart,
    description:
      "Accept orders directly from your website and QR menus — no third-party commissions eating into your margins.",
    highlights: [
      { title: "Website Ordering", icon: Globe },
      { title: "QR Ordering", icon: QrCode },
      { title: "Delivery Integration", icon: Truck },
      { title: "Pickup Orders", icon: ShoppingBag },
      { title: "Commission Free", icon: Percent },
      { title: "Menu Sync", icon: RefreshCw },
    ],
  },
  {
    id: "customized-website",
    to: "/customized-website",
    title: "Customized Website",
    icon: Globe,
    description:
      "A beautiful, branded restaurant website that drives discovery, reservations, and online orders.",
    highlights: [
      { title: "Restaurant Website", icon: Layout },
      { title: "SEO", icon: Search },
      { title: "Menu Pages", icon: BookOpen },
      { title: "Online Reservations", icon: CalendarDays },
      { title: "Blog", icon: FileText },
      { title: "Analytics", icon: BarChart3 },
    ],
  },
  {
    id: "table-reservations",
    to: "/table-reservation",
    title: "Table Reservations",
    icon: CalendarDays,
    description:
      "Manage bookings, waitlists, and floor plans from one place — with automatic reminders for guests.",
    highlights: [
      { title: "Table Booking", icon: CalendarRange },
      { title: "Waitlist", icon: Users },
      { title: "SMS Reminder", icon: MessageCircle },
      { title: "Availability", icon: Clock },
      { title: "Floor Management", icon: MapPin },
      { title: "Calendar Sync", icon: RefreshCw },
    ],
  },
  {
    id: "catering-services",
    to: "/catering-services",
    title: "Catering Services",
    icon: UtensilsCrossed,
    description:
      "Handle bulk orders, corporate events, and catering leads with invoicing and scheduling built in.",
    highlights: [
      { title: "Bulk Orders", icon: Package },
      { title: "Corporate Catering", icon: Building2 },
      { title: "Events", icon: ChefHat },
      { title: "Lead Management", icon: Users },
      { title: "Invoices", icon: Receipt },
      { title: "Scheduling", icon: CalendarRange },
    ],
  },
  {
    id: "kitchen-display",
    to: "/hardware#kitchen-display",
    title: "Kitchen Display System",
    icon: MonitorSmartphone,
    description:
      "Route orders to the right station, prioritize tickets, and keep your kitchen running smoothly.",
    highlights: [
      { title: "Kitchen Screen", icon: Monitor },
      { title: "Live Orders", icon: Zap },
      { title: "Station Routing", icon: Route },
      { title: "Order Priority", icon: Bell },
      { title: "Cooking Timer", icon: Timer },
      { title: "Status Updates", icon: RefreshCw },
    ],
  },
  {
    id: "payments",
    to: "/pricing",
    title: "Payments",
    icon: CreditCard,
    description:
      "Accept every payment method your guests prefer — cards, UPI, wallets — with clear reporting.",
    highlights: [
      { title: "Card Payments", icon: CreditCard },
      { title: "UPI", icon: Smartphone },
      { title: "Wallets", icon: Wallet },
      { title: "Split Bills", icon: Split },
      { title: "Refunds", icon: RefreshCw },
      { title: "Payment Reports", icon: BarChart3 },
    ],
  },
  {
    id: "integrations",
    to: "/#ecosystem",
    title: "Integrations",
    icon: Puzzle,
    description:
      "Connect Chefgaa with delivery platforms, messaging tools, and payment providers you already use.",
    highlights: [
      { title: "Swiggy", icon: Store },
      { title: "Zomato", icon: Store },
      { title: "WhatsApp", icon: MessageCircle },
      { title: "Google", icon: Globe },
      { title: "Razorpay", icon: CreditCard },
      { title: "API", icon: Code2 },
    ],
  },
];

export const FEATURE_MENU_SECTION: MegaMenuSection = {
  type: "flat",
  items: FEATURE_MENU_ITEMS.map(({ id, to, title, description, highlights }) => ({
    id,
    to,
    title,
    description,
    highlights,
  })),
};

export function getActiveFeatureIndex(pathname: string, hash: string): number {
  const index = FEATURE_MENU_ITEMS.findIndex((item) => {
    if (item.to.includes("#")) {
      const [path, itemHash] = item.to.split("#");
      return pathname === path && hash === `#${itemHash}`;
    }
    return pathname === item.to;
  });
  return index >= 0 ? index : 0;
}
