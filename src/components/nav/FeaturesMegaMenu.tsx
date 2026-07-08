import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FEATURE_MENU_ITEMS, type FeatureMenuItem } from "./featuresMenuData";

const LEFT_COLUMN = FEATURE_MENU_ITEMS.slice(0, 4);
const RIGHT_COLUMN = FEATURE_MENU_ITEMS.slice(4);

type FeaturesMegaMenuProps = {
  onClose: () => void;
};

function FeatureMenuLink({
  item,
  index,
  onClose,
  onFocusSibling,
}: {
  item: FeatureMenuItem;
  index: number;
  onClose: () => void;
  onFocusSibling: (index: number) => void;
}) {
  const Icon = item.icon;
  const total = FEATURE_MENU_ITEMS.length;
  const col = index < 4 ? 0 : 1;
  const row = col === 0 ? index : index - 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavLink
        to={item.to}
        role="menuitem"
        data-feature-index={index}
        onClick={onClose}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            const nextRow = row + 1;
            const colSize = col === 0 ? LEFT_COLUMN.length : RIGHT_COLUMN.length;
            if (nextRow < colSize) {
              onFocusSibling(col === 0 ? nextRow : 4 + nextRow);
            }
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            const prevRow = row - 1;
            if (prevRow >= 0) {
              onFocusSibling(col === 0 ? prevRow : 4 + prevRow);
            }
          }
          if (event.key === "ArrowRight" && col === 0) {
            event.preventDefault();
            onFocusSibling(Math.min(4 + row, total - 1));
          }
          if (event.key === "ArrowLeft" && col === 1) {
            event.preventDefault();
            onFocusSibling(Math.min(row, LEFT_COLUMN.length - 1));
          }
        }}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl py-2.5 pr-2 transition-colors duration-[250ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
            isActive ? "text-brand" : ""
          }`
        }
      >
        <Icon
          size={22}
          strokeWidth={1.5}
          className="shrink-0 text-[#8A8A8A] transition-colors duration-[250ms] group-hover:text-brand group-focus-visible:text-brand"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 text-[16px] font-medium leading-snug text-[#111111]">
          {item.title}
        </span>
        <ArrowRight
          size={16}
          strokeWidth={2}
          className="shrink-0 text-brand opacity-0 transition-all duration-[250ms] group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:translate-x-0.5 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      </NavLink>
    </motion.div>
  );
}

function FeatureColumn({
  items,
  startIndex,
  onClose,
  onFocusSibling,
}: {
  items: FeatureMenuItem[];
  startIndex: number;
  onClose: () => void;
  onFocusSibling: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item, i) => (
        <FeatureMenuLink
          key={item.id}
          item={item}
          index={startIndex + i}
          onClose={onClose}
          onFocusSibling={onFocusSibling}
        />
      ))}
    </div>
  );
}

export function FeaturesMegaMenu({ onClose }: FeaturesMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    first?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const focusItem = (index: number) => {
    const target = menuRef.current?.querySelector<HTMLElement>(
      `[data-feature-index="${index}"]`
    );
    target?.focus();
  };

  return (
    <motion.div
      ref={menuRef}
      role="menu"
      aria-label="Chefgaa features"
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-full z-50 mt-3 w-[min(720px,calc(100vw-2rem))] rounded-[24px] border border-black/[0.05] bg-[#FFFFFF] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
    >
      <h3 className="mb-6 text-[14px] font-bold uppercase tracking-[0.12em] text-[#111111]">
        Features
      </h3>

      <div className="grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-2 sm:gap-x-16">
        <FeatureColumn
          items={LEFT_COLUMN}
          startIndex={0}
          onClose={onClose}
          onFocusSibling={focusItem}
        />
        <FeatureColumn
          items={RIGHT_COLUMN}
          startIndex={4}
          onClose={onClose}
          onFocusSibling={focusItem}
        />
      </div>
    </motion.div>
  );
}
