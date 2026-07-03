import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { to: "/online-ordering", label: "Online Ordering" },
  { to: "/customized-website", label: "Website" },
  { to: "/table-reservation", label: "Reservations" },
  { to: "/catering-services", label: "Catering" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-faded-surface/80 backdrop-blur-[20px]"
            : "bg-paper"
        }`}
      >
        <nav className="mx-auto flex h-11 max-w-[1200px] items-center justify-between px-6 md:px-10">
          <Link
            to="/"
            className="font-sf-pro-display text-[19px] font-semibold tracking-tight text-primary-ink"
          >
            Chefgaa
          </Link>

          <ul className="hidden items-center gap-[10px] lg:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `px-2 py-1 text-[12px] transition-colors hover:text-primary-ink ${
                      isActive ? "text-primary-ink" : "text-deep-gray"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="hidden rounded-full bg-electric-blue px-4 py-[6px] text-[12px] text-paper transition-opacity hover:opacity-85 lg:inline-flex"
          >
            Request a Demo
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
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
              {links.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={link.to}
                    className="block border-b border-hairline py-4 font-sf-pro-display text-[28px] font-semibold text-primary-ink"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-electric-blue px-[22px] py-[13px] text-[17px] text-paper"
            >
              Request a Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
