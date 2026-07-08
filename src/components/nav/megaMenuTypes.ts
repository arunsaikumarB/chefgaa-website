import type { LucideIcon } from "lucide-react";

export type MegaMenuHighlight = {
  title: string;
  icon: LucideIcon;
};

export type MegaMenuItem = {
  id: string;
  to: string;
  title: string;
  description: string;
  highlights: MegaMenuHighlight[];
};

export type MegaMenuGroup = {
  heading: string;
  items: MegaMenuItem[];
};

export type MegaMenuSection =
  | { type: "flat"; items: MegaMenuItem[] }
  | { type: "grouped"; groups: MegaMenuGroup[] };

export function flattenMegaMenuItems(section: MegaMenuSection): MegaMenuItem[] {
  if (section.type === "flat") return section.items;
  return section.groups.flatMap((group) => group.items);
}

export function getMegaMenuActiveIndex(
  section: MegaMenuSection,
  pathname: string,
  hash: string
): number {
  const items = flattenMegaMenuItems(section);
  const index = items.findIndex((item) => {
    if (item.to.includes("#")) {
      const [path, itemHash] = item.to.split("#");
      return pathname === path && hash === `#${itemHash}`;
    }
    return pathname === item.to;
  });
  return index >= 0 ? index : 0;
}
