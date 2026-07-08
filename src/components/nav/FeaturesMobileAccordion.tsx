import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FEATURE_MENU_CATEGORIES } from "./featuresMenuData";

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
            <div className="space-y-8">
              {FEATURE_MENU_CATEGORIES.map((category) => (
                <section key={category.id}>
                  <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#666666]">
                    {category.label}
                  </p>
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <NavLink
                          key={item.id}
                          to={item.to}
                          onClick={onNavigate}
                          className={({ isActive }) =>
                            `flex items-start gap-4 rounded-[20px] p-4 transition-colors ${
                              isActive ? "bg-[rgba(237,60,24,0.06)]" : "hover:bg-canvas"
                            }`
                          }
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(237,60,24,0.08)]">
                            <Icon size={24} strokeWidth={1.75} className="text-brand" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[18px] font-semibold text-primary-ink">{item.title}</p>
                            <p className="mt-1 text-[14px] leading-[1.5] text-[#666666]">
                              {item.description}
                            </p>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
