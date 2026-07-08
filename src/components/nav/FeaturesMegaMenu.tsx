import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FEATURE_MENU_CATEGORIES, type FeatureMenuItem } from "./featuresMenuData";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavLink
        to={item.to}
        role="menuitem"
        data-feature-index={index}
        onClick={onClose}
        onKeyDown={(event) => {
          const total = FEATURE_MENU_CATEGORIES.flatMap((c) => c.items).length;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            onFocusSibling((index + 1) % total);
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            onFocusSibling((index - 1 + total) % total);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            onFocusSibling(Math.min(index + 1, total - 1));
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            onFocusSibling(Math.max(index - 1, 0));
          }
        }}
        className={({ isActive }) =>
          `group flex gap-5 rounded-[20px] p-5 transition-all duration-[250ms] hover:-translate-y-[3px] hover:bg-[rgba(237,60,24,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
            isActive ? "bg-[rgba(237,60,24,0.04)]" : ""
          }`
        }
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(237,60,24,0.08)] transition-all duration-[250ms] group-hover:scale-105 group-hover:bg-[rgba(237,60,24,0.12)]">
          <Icon size={28} strokeWidth={1.75} className="text-brand" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-sf-pro-display text-[20px] font-semibold leading-snug text-primary-ink transition-colors duration-[250ms] group-hover:text-brand">
            {item.title}
          </p>
          <p className="mt-1 text-[15px] leading-[1.5] text-[#666666]">{item.description}</p>
        </div>
      </NavLink>
    </motion.div>
  );
}

export function FeaturesMegaMenu({ onClose }: FeaturesMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  let itemIndex = 0;

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
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-full z-50 mt-3 w-[min(1000px,calc(100vw-2rem))] max-w-[1050px] -translate-x-[18%] rounded-[28px] border border-black/[0.06] bg-[#FFFFFF] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] xl:-translate-x-1/4"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-[48px]">
        {FEATURE_MENU_CATEGORIES.map((category) => (
          <section key={category.id} aria-labelledby={`feature-cat-${category.id}`}>
            <h3
              id={`feature-cat-${category.id}`}
              className="mb-7 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#666666]"
            >
              {category.label}
            </h3>
            <div className="grid grid-cols-1 gap-[28px] sm:grid-cols-2">
              {category.items.map((item) => {
                const currentIndex = itemIndex;
                itemIndex += 1;
                return (
                  <FeatureMenuLink
                    key={item.id}
                    item={item}
                    index={currentIndex}
                    onClose={onClose}
                    onFocusSibling={focusItem}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}
