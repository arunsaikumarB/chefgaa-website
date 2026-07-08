import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  CalendarDays,
  ChefHat,
  CreditCard,
  FileSpreadsheet,
  Gift,
  Globe,
  LayoutGrid,
  LineChart,
  MapPin,
  Monitor,
  Package,
  Percent,
  QrCode,
  Receipt,
  RefreshCw,
  Shield,
  ShoppingCart,
  Smartphone,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  Wallet,
  Zap,
} from "lucide-react";
import type { MegaMenuItem, MegaMenuSection } from "./megaMenuTypes";
import { flattenMegaMenuItems, getMegaMenuActiveIndex } from "./megaMenuTypes";

function item(
  id: string,
  title: string,
  description: string,
  highlights: { title: string; icon: LucideIcon }[]
): MegaMenuItem {
  return {
    id,
    to: "/contact",
    title,
    description,
    highlights,
  };
}

export const BUILT_FOR_MENU_SECTION: MegaMenuSection = {
  type: "grouped",
  groups: [
    {
      heading: "Business Type",
      items: [
        item(
          "small-business",
          "Small Business",
          "Powerful restaurant technology that's easy to set up, affordable, and designed to help independent businesses grow faster.",
          [
            { title: "Fast setup", icon: Zap },
            { title: "Affordable pricing", icon: Percent },
            { title: "Easy staff management", icon: Users },
            { title: "Online ordering", icon: ShoppingCart },
            { title: "Payments", icon: CreditCard },
            { title: "Business insights", icon: BarChart3 },
          ]
        ),
        item(
          "franchise-brands",
          "Franchise Brands",
          "Operate multiple franchise locations from one centralized platform with complete operational consistency.",
          [
            { title: "Centralized management", icon: LayoutGrid },
            { title: "Shared menus", icon: UtensilsCrossed },
            { title: "Brand consistency", icon: Store },
            { title: "Multi-store reporting", icon: BarChart3 },
            { title: "User permissions", icon: Shield },
            { title: "Enterprise controls", icon: Building2 },
          ]
        ),
        item(
          "multi-location-groups",
          "Multi-Location Groups",
          "Manage every restaurant location from one unified dashboard while maintaining local flexibility.",
          [
            { title: "Multi-location dashboard", icon: LayoutGrid },
            { title: "Shared inventory", icon: Package },
            { title: "Central pricing", icon: Percent },
            { title: "Consolidated analytics", icon: LineChart },
            { title: "Location permissions", icon: MapPin },
            { title: "Real-time monitoring", icon: RefreshCw },
          ]
        ),
        item(
          "accounting-firms",
          "Accounting Firms",
          "Simplify restaurant bookkeeping, financial reporting, and payment reconciliation across clients.",
          [
            { title: "Financial reports", icon: FileSpreadsheet },
            { title: "Tax-ready exports", icon: Receipt },
            { title: "Invoice tracking", icon: Receipt },
            { title: "Payment reconciliation", icon: RefreshCw },
            { title: "Sales reports", icon: BarChart3 },
            { title: "Secure access", icon: Shield },
          ]
        ),
      ],
    },
    {
      heading: "Restaurant Style",
      items: [
        item(
          "qsr",
          "QSR",
          "Built for fast-moving restaurants focused on speed, efficiency, and high-volume service.",
          [
            { title: "Quick ordering", icon: Zap },
            { title: "Self ordering", icon: Smartphone },
            { title: "Kitchen display", icon: Monitor },
            { title: "Delivery integrations", icon: Truck },
            { title: "Digital payments", icon: Wallet },
            { title: "Real-time analytics", icon: BarChart3 },
          ]
        ),
        item(
          "casual-dining",
          "Casual Dining",
          "Everything needed to deliver exceptional dine-in experiences with seamless operations.",
          [
            { title: "Table management", icon: LayoutGrid },
            { title: "Reservations", icon: CalendarDays },
            { title: "Waitlist", icon: Users },
            { title: "Kitchen display", icon: Monitor },
            { title: "Staff management", icon: Users },
            { title: "Payments", icon: CreditCard },
          ]
        ),
        item(
          "fast-casual",
          "Fast Casual",
          "Modern restaurant technology designed for speed without compromising customer experience.",
          [
            { title: "QR ordering", icon: QrCode },
            { title: "Online ordering", icon: Globe },
            { title: "Inventory", icon: Package },
            { title: "Kitchen workflows", icon: ChefHat },
            { title: "Loyalty", icon: Gift },
            { title: "Reports", icon: BarChart3 },
          ]
        ),
        item(
          "fine-dining",
          "Fine Dining",
          "Premium tools for elegant dining experiences with advanced reservation and guest management.",
          [
            { title: "Reservations", icon: CalendarDays },
            { title: "Guest profiles", icon: Users },
            { title: "Table assignment", icon: MapPin },
            { title: "Catering", icon: UtensilsCrossed },
            { title: "CRM", icon: Users },
            { title: "Analytics", icon: LineChart },
          ]
        ),
        item(
          "coffee-shops",
          "Coffee Shops",
          "Serve customers faster with streamlined ordering and quick payment processing.",
          [
            { title: "Mobile POS", icon: Smartphone },
            { title: "Loyalty", icon: Gift },
            { title: "Gift cards", icon: CreditCard },
            { title: "Kitchen display", icon: Monitor },
            { title: "Inventory", icon: Package },
            { title: "Reports", icon: BarChart3 },
          ]
        ),
        item(
          "pizza",
          "Pizza",
          "Purpose-built for delivery-focused pizza businesses with advanced order routing.",
          [
            { title: "Delivery management", icon: Truck },
            { title: "Order tracking", icon: MapPin },
            { title: "Kitchen display", icon: Monitor },
            { title: "Driver management", icon: Users },
            { title: "Online ordering", icon: ShoppingCart },
            { title: "Payments", icon: CreditCard },
          ]
        ),
        item(
          "bistro",
          "Bistro",
          "Flexible restaurant tools designed for modern neighborhood dining experiences.",
          [
            { title: "Reservations", icon: CalendarDays },
            { title: "QR menu", icon: QrCode },
            { title: "Staff management", icon: Users },
            { title: "Inventory", icon: Package },
            { title: "Reports", icon: BarChart3 },
            { title: "CRM", icon: Users },
          ]
        ),
        item(
          "bakery",
          "Bakery",
          "Manage fresh inventory, pre-orders, and retail operations from one integrated platform.",
          [
            { title: "Inventory", icon: Package },
            { title: "Pre-orders", icon: CalendarDays },
            { title: "POS", icon: CreditCard },
            { title: "Website", icon: Globe },
            { title: "Payments", icon: Wallet },
            { title: "Analytics", icon: LineChart },
          ]
        ),
      ],
    },
  ],
};

export const BUILT_FOR_MENU_ITEMS = flattenMegaMenuItems(BUILT_FOR_MENU_SECTION);

export function getActiveBuiltForIndex(pathname: string, hash: string): number {
  return getMegaMenuActiveIndex(BUILT_FOR_MENU_SECTION, pathname, hash);
}

export function isBuiltForRouteActive(pathname: string, hash: string): boolean {
  return BUILT_FOR_MENU_ITEMS.some((menuItem) => {
    if (menuItem.to.includes("#")) {
      const [path, itemHash] = menuItem.to.split("#");
      return pathname === path && hash === `#${itemHash}`;
    }
    return pathname === menuItem.to;
  });
}
