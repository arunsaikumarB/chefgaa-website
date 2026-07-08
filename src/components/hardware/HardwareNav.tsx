import { useEffect, useState, type MouseEvent } from "react";
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
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
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
                  className={`flex flex-col items-center gap-2 rounded-2xl px-4 py-3 transition-colors md:px-6 ${
                    isActive ? "text-[#ED3C18]" : "text-[#444444] hover:text-[#111111]"
                  }`}
                >
                  <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
                  <span className="whitespace-nowrap text-[16px] font-medium leading-[1.6]">{cat.label}</span>
                  {isActive && (
                    <span className="h-0.5 w-8 rounded-full bg-[#ED3C18]" aria-hidden="true" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
