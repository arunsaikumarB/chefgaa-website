import { useEffect, useRef, useState, type MouseEvent } from "react";
import { NAV_CATEGORIES } from "./data";

/** Global nav (56px) + hardware category bar height */
const SCROLL_OFFSET = 156;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function HardwareNav() {
  const [active, setActive] = useState("register");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ids = NAV_CATEGORIES.map((c) => c.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.15, 0.35] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    setActive(id);
    scrollToSection(id);
    window.history.replaceState(null, "", href);
  };

  return (
    <div
      ref={navRef}
      className="sticky top-14 z-50 border-b border-black/[0.06] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
    >
      <nav aria-label="Hardware categories">
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
                    onClick={(e) => handleClick(e, cat.href)}
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
    </div>
  );
}
