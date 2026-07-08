import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CreditCard,
  Globe,
  MonitorSmartphone,
  Puzzle,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";

export type FeatureMenuItem = {
  id: string;
  to: string;
  title: string;
  icon: LucideIcon;
};

export const FEATURE_MENU_ITEMS: FeatureMenuItem[] = [
  {
    id: "online-ordering",
    to: "/online-ordering",
    title: "Online Ordering",
    icon: ShoppingCart,
  },
  {
    id: "customized-website",
    to: "/customized-website",
    title: "Customized Website",
    icon: Globe,
  },
  {
    id: "table-reservations",
    to: "/table-reservation",
    title: "Table Reservations",
    icon: CalendarDays,
  },
  {
    id: "catering-services",
    to: "/catering-services",
    title: "Catering Services",
    icon: UtensilsCrossed,
  },
  {
    id: "kitchen-display",
    to: "/hardware#kitchen-display",
    title: "Kitchen Display System",
    icon: MonitorSmartphone,
  },
  {
    id: "payments",
    to: "/pricing",
    title: "Payments",
    icon: CreditCard,
  },
  {
    id: "integrations",
    to: "/#ecosystem",
    title: "Integrations",
    icon: Puzzle,
  },
];

/** @deprecated Use FEATURE_MENU_ITEMS */
export const FEATURE_MENU_FLAT = FEATURE_MENU_ITEMS;
