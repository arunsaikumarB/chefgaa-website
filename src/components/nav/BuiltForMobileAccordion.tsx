import { useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  BUILT_FOR_MENU_ITEMS,
  BUILT_FOR_MENU_SECTION,
} from "./builtForMenuData";

type BuiltForMobileAccordionProps = {
  onNavigate?: () => void;
};

export function BuiltForMobileAccordion({ onNavigate }: BuiltForMobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(BUILT_FOR_MENU_ITEMS[0].id);

  const activeItem =
    BUILT_FOR_MENU_ITEMS.find((item) => item.id === activeId) ?? BUILT_FOR_MENU_ITEMS[0];

  return (
    <div className="border-b border-[#F2F2F2]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between py-4 text-[22px] font-semibold text-[#2D2D2D]"
      >
        Built For
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={`text-[#777777] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden pb-6"
          >
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-[#999999]">
              Built For
            </p>

            {BUILT_FOR_MENU_SECTION.type === "grouped" &&
              BUILT_FOR_MENU_SECTION.groups.map((group, groupIndex) => (
                <div key={group.heading} className={groupIndex > 0 ? "mt-6" : ""}>
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#999999]">
                    {group.heading}
                  </p>
                  <div className="flex flex-col gap-1">
                    {group.items.map((menuItem) => {
                      const isActive = menuItem.id === activeId;
                      return (
                        <button
                          key={menuItem.id}
                          type="button"
                          onClick={() => setActiveId(menuItem.id)}
                          className={`relative flex h-11 items-center rounded-lg pl-4 text-left text-[16px] transition-colors duration-200 ${
                            isActive
                              ? "font-bold text-[#111111]"
                              : "font-medium text-[#777777]"
                          }`}
                        >
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 h-5 w-[4px] -translate-y-1/2 rounded-full bg-brand"
                              aria-hidden="true"
                            />
                          )}
                          {menuItem.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            <div className="mt-6 border-t border-[#F2F2F2] pt-6">
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#999999]">
                Built For
              </p>
              <h4 className="mt-3 text-[24px] font-bold text-[#111111]">{activeItem.title}</h4>
              <p className="mt-2 text-[16px] leading-relaxed text-[#555555]">
                {activeItem.description}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {activeItem.highlights.map((highlight) => {
                  const Icon = highlight.icon;
                  return (
                    <li key={highlight.title} className="flex items-center gap-2.5">
                      <Icon size={20} strokeWidth={1.8} className="text-[#777777]" />
                      <span className="text-[15px] font-medium text-[#2D2D2D]">
                        {highlight.title}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <NavLink
                to={activeItem.to}
                onClick={onNavigate}
                className="mt-5 inline-flex h-11 items-center rounded-full bg-brand px-6 text-[14px] font-semibold !text-white"
              >
                Learn more
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
