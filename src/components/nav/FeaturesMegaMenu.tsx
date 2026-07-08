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
          `group -mx-1.5 flex items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-all duration-[200ms] hover:border-brand hover:bg-white focus-visible:outline-none focus-visible:border-brand focus-visible:bg-white ${
            isActive ? "text-brand" : ""
          }`
        }
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          className="shrink-0 text-[#8A8A8A] transition-colors duration-[200ms] group-hover:text-brand group-focus-visible:text-brand"
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1 whitespace-nowrap text-[15px] font-medium leading-tight text-[#111111]">
          {item.title}
        </span>
        <ArrowRight
          size={14}
          strokeWidth={2}
          className="w-0 shrink-0 overflow-hidden text-brand opacity-0 transition-all duration-[200ms] group-hover:w-3.5 group-hover:opacity-100 group-focus-visible:w-3.5 group-focus-visible:opacity-100"
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
    <div className="flex flex-col gap-0.5">
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
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 top-[calc(100%+10px)] z-50 w-max max-w-[min(calc(100vw-2rem),520px)] origin-top-left rounded-2xl border border-black/[0.06] bg-[#FFFFFF] px-5 py-4 shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
    >
      <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#111111]">
        Features
      </h3>

      <div className="flex gap-8">
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
