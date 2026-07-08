import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { ChefgaaLogo } from "./ChefgaaLogo";
import { FeaturesMegaMenu } from "./nav/FeaturesMegaMenu";
import { FeaturesMobileAccordion } from "./nav/FeaturesMobileAccordion";
import { FEATURE_MENU_ITEMS, getActiveFeatureIndex } from "./nav/featuresMenuData";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/hardware", label: "Hardware" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function navLinkClass(isActive: boolean) {
  return `font-[Inter] text-[16px] leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
    isActive
      ? "font-semibold text-[#111111]"
      : "font-medium text-[#2D2D2D] hover:text-[#111111]"
  }`;
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const featuresActive = getActiveFeatureIndex(location.pathname, location.hash) >= 0 &&
    FEATURE_MENU_ITEMS.some((item) => {
      if (item.to.includes("#")) {
        const [path, hash] = item.to.split("#");
        return location.pathname === path && location.hash === `#${hash}`;
      }
      return location.pathname === item.to;
    });

  useEffect(() => {
    setMenuOpen(false);
    setFeaturesOpen(false);
    setCountryOpen(false);
    setLanguageOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || featuresOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, featuresOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setFeaturesOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(target)) {
        setCountryOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(target)) {
        setLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 border-b border-[#F2F2F2] backdrop-blur-[18px] transition-[background-color,border-color] duration-300 ${
          featuresOpen ? "bg-white" : "bg-white/[0.88]"
        }`}
      >
        <div className="relative z-10 mx-auto h-[80px] min-h-[80px] max-w-[1600px] px-6 md:px-10 lg:px-[48px]">
          <nav className="relative h-full">
            <Link
              to="/"
              className="absolute left-0 top-1/2 z-10 flex -translate-y-1/2 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              aria-label="Chefgaa home"
            >
              <ChefgaaLogo showWordmark={false} markHeightPx={34} />
            </Link>

            <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[36px] lg:flex">
              <li>
                <NavLink to="/" end className={({ isActive }) => navLinkClass(isActive)}>
                  Home
                </NavLink>
              </li>

              <li>
                <button
                  type="button"
                  aria-expanded={featuresOpen}
                  aria-haspopup="menu"
                  onClick={() => setFeaturesOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setFeaturesOpen(false);
                    if (event.key === "ArrowDown" && !featuresOpen) {
                      event.preventDefault();
                      setFeaturesOpen(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 font-[Inter] text-[16px] leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    featuresActive || featuresOpen
                      ? "font-semibold text-[#111111]"
                      : "font-medium text-[#2D2D2D] hover:text-[#111111]"
                  }`}
                >
                  Features
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className={`transition-transform duration-300 ${featuresOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </li>

              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={({ isActive }) => navLinkClass(isActive)}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-[12px] lg:flex">
              <div ref={countryRef} className="relative">
                <button
                  type="button"
                  aria-expanded={countryOpen}
                  aria-label="Select country"
                  onClick={() => setCountryOpen((open) => !open)}
                  className="inline-flex h-[44px] items-center gap-2 rounded-lg border border-[#E8E8E8] bg-white px-3.5 font-[Inter] text-[14px] font-medium leading-none text-[#2D2D2D] transition-colors duration-200 hover:border-[#D0D0D0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    🇮🇳
                  </span>
                  <ChevronDown size={14} strokeWidth={2} className="text-[#999999]" />
                </button>
                <AnimatePresence>
                  {countryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[160px] rounded-xl border border-[#F2F2F2] bg-white py-1.5"
                    >
                      <button
                        type="button"
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left font-[Inter] text-[14px] text-[#2D2D2D] transition-colors hover:bg-[#FAFAFA]"
                      >
                        <span aria-hidden="true">🇮🇳</span>
                        India
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div ref={languageRef} className="relative">
                <button
                  type="button"
                  aria-expanded={languageOpen}
                  aria-label="Select language"
                  onClick={() => setLanguageOpen((open) => !open)}
                  className="inline-flex h-[44px] items-center gap-2 rounded-full bg-brand px-5 font-[Inter] text-[14px] font-semibold leading-none !text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  <Globe size={15} strokeWidth={2} aria-hidden="true" />
                  English
                  <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
                </button>
                <AnimatePresence>
                  {languageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[160px] rounded-xl border border-[#F2F2F2] bg-white py-1.5"
                    >
                      <button
                        type="button"
                        className="block w-full px-4 py-2.5 text-left font-[Inter] text-[14px] font-semibold text-brand transition-colors hover:bg-[#FAFAFA]"
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/contact"
                className="inline-flex h-[44px] items-center rounded-full bg-brand px-6 font-[Inter] text-[14px] font-semibold leading-none !text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Request Demo
              </Link>
            </div>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="absolute right-0 top-1/2 z-50 flex h-[44px] w-[44px] -translate-y-1/2 flex-col items-center justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`h-[1.5px] w-5 bg-[#2D2D2D] transition-transform duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-[1.5px] w-5 bg-[#2D2D2D] transition-transform duration-300 ${menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""}`}
              />
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {featuresOpen && (
            <FeaturesMegaMenu
              pathname={location.pathname}
              hash={location.hash}
              onClose={() => setFeaturesOpen(false)}
            />
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pt-[96px] pb-10 lg:hidden"
          >
            <ul className="flex flex-col">
              <li className="border-b border-[#F2F2F2]">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block py-4 font-[Inter] text-[22px] ${
                      isActive ? "font-semibold text-[#111111]" : "font-medium text-[#2D2D2D]"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <FeaturesMobileAccordion onNavigate={() => setMenuOpen(false)} />
              </li>

              {NAV_LINKS.slice(1).map((link) => (
                <li key={link.to} className="border-b border-[#F2F2F2]">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-4 font-[Inter] text-[22px] ${
                        isActive ? "font-semibold text-[#111111]" : "font-medium text-[#2D2D2D]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg border border-[#E8E8E8] px-4 font-[Inter] text-[14px] font-medium text-[#2D2D2D]"
              >
                <span aria-hidden="true">🇮🇳</span>
                India
              </button>
              <button
                type="button"
                className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-brand px-5 font-[Inter] text-[14px] font-semibold !text-white"
              >
                <Globe size={15} strokeWidth={2} aria-hidden="true" />
                English
              </button>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-[44px] items-center justify-center rounded-full bg-brand px-6 font-[Inter] text-[14px] font-semibold !text-white"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
