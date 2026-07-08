import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  CreditCard,
  Globe,
  MonitorSmartphone,
  ShoppingCart,
  UtensilsCrossed,
  Workflow,
} from "lucide-react";

export type FeatureMenuItem = {
  id: string;
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FeatureMenuCategory = {
  id: string;
  label: string;
  items: FeatureMenuItem[];
};

export const FEATURE_MENU_CATEGORIES: FeatureMenuCategory[] = [
  {
    id: "operations",
    label: "Operations",
    items: [
      {
        id: "online-ordering",
        to: "/online-ordering",
        title: "Online Ordering",
        description: "Accept online orders directly from your website and mobile.",
        icon: ShoppingCart,
      },
      {
        id: "customized-website",
        to: "/customized-website",
        title: "Customized Website",
        description: "Launch a modern restaurant website with online ordering built in.",
        icon: Globe,
      },
      {
        id: "table-reservations",
        to: "/table-reservation",
        title: "Table Reservations",
        description: "Manage bookings and table availability in real time.",
        icon: CalendarCheck,
      },
      {
        id: "catering-services",
        to: "/catering-services",
        title: "Catering Services",
        description: "Accept catering inquiries and bulk orders online.",
        icon: UtensilsCrossed,
      },
    ],
  },
  {
    id: "restaurant-management",
    label: "Restaurant Management",
    items: [
      {
        id: "kitchen-display",
        to: "/hardware#kitchen-display",
        title: "Kitchen Display System",
        description: "Replace paper tickets with a real-time kitchen workflow.",
        icon: MonitorSmartphone,
      },
      {
        id: "payments",
        to: "/pricing",
        title: "Payments",
        description: "Fast, secure, and flexible payment processing.",
        icon: CreditCard,
      },
      {
        id: "integrations",
        to: "/#ecosystem",
        title: "Integrations",
        description: "Connect Chefgaa with third-party tools and services.",
        icon: Workflow,
      },
    ],
  },
];

export const FEATURE_MENU_FLAT = FEATURE_MENU_CATEGORIES.flatMap((category) => category.items);
