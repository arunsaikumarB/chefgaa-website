import { useEffect, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { NAV_CATEGORIES } from "./data";
import { HW_NAV_SCROLL_PADDING } from "./HardwareUI";

function scrollToAnchor(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HW_NAV_SCROLL_PADDING;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", href);
}

export function HardwareNav() {
  const [active, setActive] = useState("register");

  useEffect(() => {
    const ids = NAV_CATEGORIES.map((c) => c.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToAnchor(href);
  };

  return (
    <nav
      className="sticky top-[var(--site-nav-height)] z-40 border-b border-black/[0.05] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-[top] duration-300"
      aria-label="Hardware categories"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-20">
        <ul className="scrollbar-none flex gap-2 overflow-x-auto py-4 md:justify-center md:gap-4">
          {NAV_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const sectionId = cat.href.replace("#", "");
            const isActive = active === sectionId;
            return (
              <li key={cat.id} className="shrink-0">
                <a
                  href={cat.href}
                  onClick={(e) => handleNavClick(e, cat.href)}
                  className={`group relative flex flex-col items-center gap-2 rounded-2xl px-4 py-3 transition-colors duration-250 md:px-6 ${
                    isActive ? "text-[#ED3C18]" : "text-[#444444] hover:text-[#ED3C18]"
                  }`}
                >
                  <Icon
                    size={28}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="transition-transform duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[2px]"
                  />
                  <span className="whitespace-nowrap text-[16px] font-medium leading-[1.6]">
                    {cat.label}
                  </span>
                  <span className="relative mt-0.5 h-0.5 w-8" aria-hidden="true">
                    <span className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[#ED3C18] opacity-0 transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-8 group-hover:opacity-100" />
                    {isActive && (
                      <motion.span
                        layoutId="hardware-nav-underline"
                        className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#ED3C18]"
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
