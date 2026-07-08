import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FEATURE_MENU_ITEMS } from "./featuresMenuData";

type FeaturesMobileAccordionProps = {
  onNavigate?: () => void;
};

export function FeaturesMobileAccordion({ onNavigate }: FeaturesMobileAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-hairline">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-4 font-sf-pro-display text-[28px] font-semibold text-primary-ink"
      >
        Features
        <ChevronDown
          size={22}
          strokeWidth={2}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pb-4"
          >
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#111111]">
              Features
            </p>
            <div className="grid grid-cols-1 gap-3">
              {FEATURE_MENU_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `group flex items-center gap-3.5 rounded-2xl p-4 transition-all duration-[250ms] hover:bg-[#FFF7F3] ${
                        isActive ? "bg-[#FFF7F3]" : ""
                      }`
                    }
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.75}
                      className="shrink-0 text-brand transition-transform duration-[250ms] group-hover:translate-x-[3px]"
                    />
                    <span className="text-[18px] font-semibold text-[#222222] transition-colors duration-[250ms] group-hover:text-brand">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
