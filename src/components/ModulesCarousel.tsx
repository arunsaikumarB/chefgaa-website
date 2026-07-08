import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Mouse } from "lucide-react";
import { motion } from "framer-motion";

type ModuleTheme = {
  accent: string;
  accentSoft: string;
  gradient: string;
  button: string;
  checkBg: string;
};

type Module = {
  id: string;
  index: string;
  title: string;
  description: string;
  bullets: string[];
  to: string;
  theme: ModuleTheme;
  visual: "pos" | "phone" | "kds" | "menu" | "marketing" | "analytics";
};

const modules: Module[] = [
  {
    id: "pos",
    index: "01",
    title: "Smart POS System",
    description:
      "A fast, intuitive point-of-sale built for speed, accuracy, and a better guest experience.",
    bullets: [
      "Quick billing & invoicing",
      "Table management",
      "Order customization",
      "Offline mode",
    ],
    to: "/contact",
    theme: {
      accent: "#0071e3",
      accentSoft: "rgba(0,113,227,0.12)",
      gradient: "linear-gradient(135deg, #e8f2fa 0%, #f5f9fc 55%, #ffffff 100%)",
      button: "bg-electric-blue hover:opacity-90",
      checkBg: "bg-electric-blue",
    },
    visual: "pos",
  },
  {
    id: "ordering",
    index: "02",
    title: "Online Ordering",
    description: "Take orders directly from your website or mobile app.",
    bullets: [
      "Pickup & delivery",
      "Custom menus",
      "Live order tracking",
      "Commission-free",
    ],
    to: "/online-ordering",
    theme: {
      accent: "#d97706",
      accentSoft: "rgba(217,119,6,0.12)",
      gradient: "linear-gradient(135deg, #faf3e0 0%, #fdf8ee 55%, #ffffff 100%)",
      button: "bg-[#e8a317] hover:opacity-90",
      checkBg: "bg-[#e8a317]",
    },
    visual: "phone",
  },
  {
    id: "kitchen",
    index: "03",
    title: "Kitchen Display",
    description: "Streamline kitchen operations with real-time order display.",
    bullets: [
      "Real-time updates",
      "Order prioritization",
      "Reduce errors",
      "Improve speed",
    ],
    to: "/contact",
    theme: {
      accent: "#e85d3f",
      accentSoft: "rgba(232,93,63,0.12)",
      gradient: "linear-gradient(135deg, #fdeee9 0%, #fef6f3 55%, #ffffff 100%)",
      button: "bg-[#e85d3f] hover:opacity-90",
      checkBg: "bg-[#e85d3f]",
    },
    visual: "kds",
  },
  {
    id: "menu",
    index: "04",
    title: "Menu Management",
    description: "Update items, prices, and availability in real time across every channel.",
    bullets: [
      "Live menu sync",
      "Modifier groups",
      "86 items instantly",
      "Multi-location menus",
    ],
    to: "/contact",
    theme: {
      accent: "#a67c52",
      accentSoft: "rgba(166,124,82,0.12)",
      gradient: "linear-gradient(135deg, #f5ebe0 0%, #faf6f1 55%, #ffffff 100%)",
      button: "bg-[#a67c52] hover:opacity-90",
      checkBg: "bg-[#a67c52]",
    },
    visual: "menu",
  },
  {
    id: "marketing",
    index: "05",
    title: "Marketing & Promotions",
    description: "Launch offers, loyalty rewards, and campaigns that bring guests back.",
    bullets: [
      "Email & SMS campaigns",
      "Loyalty programs",
      "Promo codes",
      "Guest segmentation",
    ],
    to: "/contact",
    theme: {
      accent: "#c45c7a",
      accentSoft: "rgba(196,92,122,0.12)",
      gradient: "linear-gradient(135deg, #fae8ee 0%, #fdf3f6 55%, #ffffff 100%)",
      button: "bg-[#c45c7a] hover:opacity-90",
      checkBg: "bg-[#c45c7a]",
    },
    visual: "marketing",
  },
  {
    id: "analytics",
    index: "06",
    title: "Real-Time Analytics",
    description: "See sales, labor, and performance insights the moment they happen.",
    bullets: [
      "Live sales dashboard",
      "Labor cost tracking",
      "Trend forecasting",
      "Export reports",
    ],
    to: "/contact",
    theme: {
      accent: "#5c6b7a",
      accentSoft: "rgba(92,107,122,0.12)",
      gradient: "linear-gradient(135deg, #eceef1 0%, #f5f6f8 55%, #ffffff 100%)",
      button: "bg-[#5c6b7a] hover:opacity-90",
      checkBg: "bg-[#5c6b7a]",
    },
    visual: "analytics",
  },
];

function WaveDecor({ color }: { color: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 right-0 h-[55%] w-[45%] opacity-[0.35]"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M200 200 C140 160 120 80 200 40 L200 200 Z"
        fill={color}
        fillOpacity="0.08"
      />
      <path
        d="M200 200 C100 150 80 60 200 0 L200 200 Z"
        stroke={color}
        strokeOpacity="0.15"
        strokeWidth="1"
      />
    </svg>
  );
}

function ModuleVisual({ type }: { type: Module["visual"] }) {
  if (type === "pos") {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="overflow-hidden rounded-[20px] bg-[#050506] shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
          <img
            src="/ecosystem/pos-hardware.png"
            alt="Chefgaa POS hardware"
            className="h-[200px] w-auto object-contain md:h-[240px]"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  if (type === "phone") {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="relative h-[280px] w-[140px] rounded-[28px] border-[6px] border-[#1d1d1f] bg-paper shadow-[0_24px_48px_rgba(0,0,0,0.15)] md:h-[300px] md:w-[150px]">
          <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#1d1d1f]/20" />
          <div className="mt-6 flex flex-col gap-2 px-3">
            <div className="h-16 rounded-xl bg-gradient-to-br from-[#f5d78e] to-[#e8a317]/40" />
            {["Chicken Biryani", "Butter Chicken", "Garlic Naan"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg bg-canvas px-2 py-1.5">
                <div className="h-7 w-7 shrink-0 rounded-md bg-cool-wash" />
                <span className="truncate text-[8px] font-medium text-primary-ink">{item}</span>
              </div>
            ))}
            <div className="mt-1 rounded-full bg-[#e8a317] py-1.5 text-center text-[8px] font-semibold text-paper">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "kds") {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-[260px] rounded-[16px] border border-hairline/60 bg-[#1d1d1f] p-3 shadow-[0_24px_48px_rgba(0,0,0,0.18)] md:w-[280px]">
          <div className="mb-2 flex gap-2">
            {["New", "Prep", "Ready"].map((tab, i) => (
              <span
                key={tab}
                className={`rounded-md px-2 py-0.5 text-[9px] font-medium ${
                  i === 0 ? "bg-[#e85d3f] text-paper" : "text-paper/50"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { n: "#142", t: "2? Biryani", s: "12m" },
              { n: "#143", t: "1? Naan", s: "4m" },
              { n: "#144", t: "3? Curry", s: "8m" },
              { n: "#145", t: "2? Salad", s: "2m" },
            ].map((o) => (
              <div key={o.n} className="rounded-lg bg-paper/10 p-2">
                <div className="flex justify-between text-[8px] text-paper/60">
                  <span>{o.n}</span>
                  <span>{o.s}</span>
                </div>
                <p className="mt-1 text-[10px] font-medium text-paper">{o.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "menu") {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-[260px] rounded-[16px] border border-hairline/60 bg-paper p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
          <p className="text-[11px] font-semibold text-primary-ink">Live Menu</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Biryani", "Curries", "Breads", "Drinks"].map((cat, i) => (
              <div
                key={cat}
                className={`rounded-lg p-2 text-center text-[9px] font-medium ${
                  i === 0 ? "bg-[#a67c52]/15 text-[#a67c52]" : "bg-canvas text-mid-gray"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              ["Chicken Biryani", "$12.99"],
              ["Veg Biryani", "$10.99"],
            ].map(([name, price]) => (
              <div key={name} className="flex justify-between text-[9px]">
                <span className="text-primary-ink">{name}</span>
                <span className="text-mid-gray">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "marketing") {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <div className="w-[240px] rounded-[16px] border border-hairline/60 bg-paper p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
          <div className="rounded-xl bg-gradient-to-br from-[#fae8ee] to-[#fdf3f6] p-4">
            <p className="text-[10px] font-semibold text-[#c45c7a]">Summer Special</p>
            <p className="mt-1 text-[18px] font-bold text-primary-ink">20% Off</p>
            <p className="mt-1 text-[9px] text-mid-gray">Loyalty members only</p>
          </div>
          <div className="mt-3 flex gap-2">
            {["Email", "SMS", "Push"].map((ch) => (
              <span
                key={ch}
                className="rounded-full bg-[#c45c7a]/12 px-2.5 py-1 text-[8px] font-medium text-[#c45c7a]"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="w-[260px] rounded-[16px] border border-hairline/60 bg-paper p-4 shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
        <p className="text-[11px] font-semibold text-primary-ink">Today&apos;s Sales</p>
        <p className="mt-1 font-sf-pro-display text-[28px] font-bold text-primary-ink">
          $4,280
        </p>
        <div className="mt-4 flex items-end gap-1.5">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[#5c6b7a]/30"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: Module }) {
  const { theme } = module;

  return (
    <article
      className="relative flex h-[420px] w-[min(88vw,680px)] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:h-[440px] md:w-[720px] md:flex-row"
      style={{ background: theme.gradient }}
      aria-label={module.title}
    >
      <WaveDecor color={theme.accent} />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-8 py-8 md:px-10 md:py-10">
        <span
          className="font-sf-pro-display text-[15px] font-semibold"
          style={{ color: theme.accent }}
        >
          {module.index}
        </span>
        <h3 className="mt-3 font-sf-pro-display text-[26px] font-semibold leading-tight text-primary-ink md:text-[30px]">
          {module.title}
        </h3>
        <p className="mt-2 max-w-[300px] text-[15px] leading-[1.5] text-mid-gray">
          {module.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {module.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-2.5">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-paper ${theme.checkBg}`}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              <span className="text-[14px] text-primary-ink">{bullet}</span>
            </li>
          ))}
        </ul>

        <Link
          to={module.to}
          className={`mt-6 inline-flex w-fit items-center gap-1.5 rounded-full px-5 py-2.5 text-[15px] font-medium text-paper transition-opacity ${theme.button}`}
        >
          Learn More
          <span aria-hidden="true">?</span>
        </Link>
      </div>

      {/* Visual */}
      <div className="relative z-10 h-[200px] w-full shrink-0 md:h-auto md:w-[42%]">
        <ModuleVisual type={module.visual} />
      </div>
    </article>
  );
}

export function ModulesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("article");
    if (!cards.length) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width * 0.35;

    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - trackCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    updateActiveIndex();
    return () => track.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("article");
    const card = cards[index];
    if (!card) return;

    const stageInset =
      window.innerWidth >= 1024 ? 48 : window.innerWidth >= 768 ? 32 : 20;

    track.scrollTo({ left: card.offsetLeft - stageInset, behavior: "smooth" });
    setActiveIndex(index);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(modules.length - 1, activeIndex + 1));

  return (
    <section className="overflow-hidden bg-paper py-16 md:py-[120px]" aria-label="Explore modules">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-start lg:gap-[56px] lg:px-[64px]">
        {/* Left intro + navigation */}
        <div className="shrink-0 lg:w-[280px] xl:w-[300px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-sf-pro-display text-[32px] font-semibold leading-[1.1] tracking-[-0.2px] text-primary-ink md:text-[40px]">
              Explore Every Module
            </h2>
            <p className="mt-4 text-[16px] leading-[1.5] text-mid-gray md:text-[17px]">
              Discover the powerful tools designed to simplify your operations and
              delight your customers.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={activeIndex === 0}
                aria-label="Previous module"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-hairline bg-paper text-primary-ink transition-colors hover:bg-canvas disabled:opacity-30"
              >
                <ChevronLeft size={20} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={activeIndex === modules.length - 1}
                aria-label="Next module"
                className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-hairline bg-paper text-primary-ink transition-colors hover:bg-canvas disabled:opacity-30"
              >
                <ChevronRight size={20} strokeWidth={1.8} />
              </button>

              <div className="ml-2 flex items-center gap-2" role="tablist" aria-label="Module slides">
                {modules.map((m, i) => (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to ${m.title}`}
                    onClick={() => scrollTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-ember"
                        : "w-2 bg-hairline hover:bg-mid-gray/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Carousel stage */}
        <div className="relative min-w-0 flex-1">
          <div className="overflow-hidden py-4 md:py-5 lg:py-[24px]">
            <div
              ref={trackRef}
              className="modules-carousel-track flex gap-[40px] overflow-x-auto scroll-smooth px-5 py-6 scrollbar-none snap-x snap-mandatory md:scroll-px-8 md:px-8 lg:scroll-px-[48px] lg:px-[48px]"
            >
              {modules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="mt-10 flex items-center justify-center gap-2 text-mid-gray">
        <Mouse size={18} strokeWidth={1.5} className="opacity-60" />
        <span className="text-[14px]">Scroll to explore all modules</span>
      </div>
    </section>
  );
}
