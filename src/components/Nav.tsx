import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { ChefgaaLogo } from "./ChefgaaLogo";

const featureLinks = [
  { to: "/online-ordering", label: "Online Ordering" },
  { to: "/customized-website", label: "Website" },
  { to: "/table-reservation", label: "Reservations" },
  { to: "/catering-services", label: "Catering" },
];

const mainLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

function navLinkClass(isActive: boolean) {
  return `px-2.5 py-1 text-[14px] font-medium transition-colors ${
    isActive ? "text-[#ff6e14]" : "text-primary-ink hover:text-[#ff6e14]"
  }`;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const featuresRef = useRef<HTMLLIElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const featuresActive = featureLinks.some((link) => location.pathname === link.to);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setFeaturesOpen(false);
    setCountryOpen(false);
    setLanguageOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (featuresRef.current && !featuresRef.current.contains(target)) {
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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-hairline/60 bg-faded-surface/90 backdrop-blur-[20px]"
            : "border-transparent bg-paper"
        }`}
      >
        <nav className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-6 px-5 md:px-8 lg:px-10">
          <Link to="/" className="shrink-0" aria-label="Chefgaa home">
            <ChefgaaLogo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainLinks.slice(0, 1).map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={({ isActive }) => navLinkClass(isActive)}>
                  {link.label}
                </NavLink>
              </li>
            ))}

            <li ref={featuresRef} className="relative">
              <button
                type="button"
                aria-expanded={featuresOpen}
                aria-haspopup="menu"
                onClick={() => setFeaturesOpen((open) => !open)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[14px] font-medium transition-colors ${
                  featuresActive || featuresOpen
                    ? "text-[#ff6e14]"
                    : "text-primary-ink hover:text-[#ff6e14]"
                }`}
              >
                Features
                <ChevronDown
                  size={14}
                  strokeWidth={2}
                  className={`transition-transform ${featuresOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {featuresOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-2xl border border-hairline/80 bg-paper py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                    role="menu"
                  >
                    {featureLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        role="menuitem"
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-[14px] transition-colors hover:bg-canvas ${
                            isActive ? "font-medium text-[#ff6e14]" : "text-primary-ink"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {mainLinks.slice(1).map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={({ isActive }) => navLinkClass(isActive)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <div ref={countryRef} className="relative">
              <button
                type="button"
                aria-expanded={countryOpen}
                aria-label="Select country"
                onClick={() => setCountryOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-paper px-2.5 py-1.5 text-[13px] text-primary-ink transition-colors hover:bg-canvas"
              >
                <span className="text-base leading-none" aria-hidden="true">
                  🇮🇳
                </span>
                <ChevronDown size={12} strokeWidth={2} className="text-mid-gray" />
              </button>
              <AnimatePresence>
                {countryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-2xl border border-hairline/80 bg-paper py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] text-primary-ink hover:bg-canvas"
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
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6e14] px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                <Globe size={14} strokeWidth={2} aria-hidden="true" />
                English
                <ChevronDown size={12} strokeWidth={2} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full z-50 mt-2 min-w-[140px] rounded-2xl border border-hairline/80 bg-paper py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                  >
                    <button
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-[14px] font-medium text-[#ff6e14] hover:bg-canvas"
                    >
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-[1.5px] w-5 bg-primary-ink transition-transform duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-primary-ink transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pt-24 pb-10 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {mainLinks.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `block border-b border-hairline py-4 font-sf-pro-display text-[28px] font-semibold ${
                        isActive ? "text-[#ff6e14]" : "text-primary-ink"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                <p className="pt-4 text-[12px] font-medium uppercase tracking-[0.12em] text-mid-gray">
                  Features
                </p>
                {featureLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block border-b border-hairline py-3 text-[22px] font-semibold ${
                        isActive ? "text-[#ff6e14]" : "text-primary-ink"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </motion.li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-3 py-2 text-[14px]"
              >
                <span aria-hidden="true">🇮🇳</span>
                India
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6e14] px-4 py-2 text-[14px] font-medium text-white"
              >
                <Globe size={14} strokeWidth={2} aria-hidden="true" />
                English
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
