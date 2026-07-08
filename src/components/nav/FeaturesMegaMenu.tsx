import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  FEATURE_MENU_ITEMS,
  getActiveFeatureIndex,
  type FeatureMenuItem,
} from "./featuresMenuData";

const EASE_OUT = [0.33, 1, 0.68, 1] as const;

type FeaturesMegaMenuProps = {
  pathname: string;
  hash: string;
  onClose: () => void;
};

function FeaturePreview({ item }: { item: FeatureMenuItem }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      className="max-w-[640px]"
    >
      <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#999999]">
        Discover
      </p>

      <h4 className="mt-4 text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#111111]">
        {item.title}
      </h4>

      <p className="mt-4 max-w-[520px] text-[18px] font-normal leading-[1.7] text-[#555555]">
        {item.description}
      </p>

      <ul className="mt-10 flex flex-col gap-20">
        {item.highlights.map((highlight) => {
          const Icon = highlight.icon;
          return (
            <li key={highlight.title} className="flex items-center gap-3">
              <Icon
                size={22}
                strokeWidth={1.8}
                className="shrink-0 text-[#777777]"
                aria-hidden="true"
              />
              <span className="text-[16px] font-medium text-[#2D2D2D]">
                {highlight.title}
              </span>
            </li>
          );
        })}
      </ul>

      <Link
        to={item.to}
        className="group mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-[#111111] transition-colors duration-200 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        Learn more
        <ArrowRight
          size={16}
          strokeWidth={2}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  );
}

export function FeaturesMegaMenu({ pathname, hash, onClose }: FeaturesMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    getActiveFeatureIndex(pathname, hash)
  );

  useEffect(() => {
    setActiveIndex(getActiveFeatureIndex(pathname, hash));
  }, [pathname, hash]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, FEATURE_MENU_ITEMS.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const activeItem = FEATURE_MENU_ITEMS[activeIndex];

  return (
    <motion.div
      ref={menuRef}
      role="menu"
      aria-label="Chefgaa features"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="absolute inset-x-0 top-[var(--site-nav-height)] border-t border-[#F3F3F3] bg-white"
    >
      <div className="mx-auto flex max-w-[1600px] gap-16 px-6 py-10 md:px-10 md:py-12 lg:gap-24 lg:px-48 lg:py-48">
        <div className="w-full shrink-0 md:w-[260px]">
          <h3 className="mb-6 text-[14px] font-bold uppercase tracking-[0.12em] text-[#999999]">
            Features
          </h3>

          <ul className="relative flex flex-col" role="none">
            {FEATURE_MENU_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.id} role="none">
                  <Link
                    to={item.to}
                    role="menuitem"
                    aria-current={isActive ? "true" : undefined}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={onClose}
                    className={`relative flex h-52 items-center pl-5 text-[18px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand ${
                      isActive
                        ? "font-bold text-[#111111]"
                        : "font-semibold text-[#777777] hover:text-[#111111]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="feature-nav-indicator"
                        className="absolute left-0 top-1/2 h-6 w-[4px] -translate-y-1/2 rounded-full bg-brand"
                        transition={{ duration: 0.22, ease: EASE_OUT }}
                        aria-hidden="true"
                      />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden min-w-0 flex-1 md:block" aria-live="polite">
          <AnimatePresence mode="wait">
            <FeaturePreview key={activeItem.id} item={activeItem} />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
