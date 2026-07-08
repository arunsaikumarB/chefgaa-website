import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FEATURE_MENU_ITEMS, type FeatureMenuItem } from "./featuresMenuData";

const COLS = 2;

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
            onFocusSibling(Math.min(index + COLS, total - 1));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            onFocusSibling(Math.max(index - COLS, 0));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            onFocusSibling(index % COLS === 0 ? Math.min(index + 1, total - 1) : index);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            onFocusSibling(index % COLS === 1 ? index - 1 : index);
          }
        }}
        className={({ isActive }) =>
          `group flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-[250ms] hover:scale-[1.02] hover:bg-[#FFF7F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
            isActive ? "bg-[#FFF7F3]" : ""
          }`
        }
      >
        <Icon
          size={24}
          strokeWidth={1.75}
          className="shrink-0 text-brand transition-transform duration-[250ms] group-hover:translate-x-[3px]"
          aria-hidden="true"
        />
        <span className="text-[18px] font-semibold leading-snug text-[#222222] transition-colors duration-[250ms] group-hover:text-brand">
          {item.title}
        </span>
      </NavLink>
    </motion.div>
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
      className="absolute left-0 top-full z-50 mt-3 w-[min(780px,calc(100vw-2rem))] rounded-[24px] border border-black/[0.05] bg-[#FFFFFF] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)]"
    >
      <h3 className="mb-6 text-[14px] font-bold uppercase tracking-[0.12em] text-[#111111]">
        Features
      </h3>

      <div className="grid grid-cols-1 gap-x-[28px] gap-y-[24px] sm:grid-cols-2">
        {FEATURE_MENU_ITEMS.map((item, index) => (
          <FeatureMenuLink
            key={item.id}
            item={item}
            index={index}
            onClose={onClose}
            onFocusSibling={focusItem}
          />
        ))}
      </div>
    </motion.div>
  );
}
