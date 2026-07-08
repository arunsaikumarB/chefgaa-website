import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  FEATURED,
  GRID_PRODUCTS,
  ECOSYSTEM_DEVICES,
  COMPARE_COLUMNS,
  COMPARE_ROWS,
  KITS,
  WHY_ITEMS,
  SOFTWARE_MODULES,
  GALLERY,
  STORIES,
  HARDWARE_FAQ,
} from "./data";
import {
  HwShell,
  HwReveal,
  HwPrimaryBtn,
  HwGhostBtn,
  HwLink,
  HwProductCard,
  ProductVisual,
} from "./HardwareUI";
import { HardwareNav } from "./HardwareNav";

const CENTER = { x: 50, y: 50 };

function polar(angle: number, dist: number) {
  const rad = (angle * Math.PI) / 180;
  const r = 36 * dist;
  return { left: CENTER.x + r * Math.cos(rad), top: CENTER.y + r * Math.sin(rad) };
}

function curve(sx: number, sy: number, ex: number, ey: number) {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * 0.14} ${my + dx * 0.14}, ${mx + dy * 0.07} ${my - dx * 0.07}, ${ex} ${ey}`;
}

/* ── 1. Hero ───────────────────────────────────────────── */

export function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-[1600px] px-6 text-center md:px-10 lg:px-20">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex rounded-full border border-black/[0.06] bg-[#F5F6F8] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ED3C18]">
              Chefgaa Hardware
            </span>
            <h1 className="mx-auto mt-8 max-w-[900px] font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[56px] lg:text-[64px]">
              Hardware built for modern restaurants.
            </h1>
            <p className="mx-auto mt-6 max-w-[720px] text-[18px] leading-[1.5] text-[#666666] md:text-[24px] md:leading-[1.45]">
              Every Chefgaa device works together as one intelligent ecosystem—fast, reliable, and built to scale with your business.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <HwPrimaryBtn>Explore Hardware</HwPrimaryBtn>
              <HwGhostBtn>Request Demo</HwGhostBtn>
            </div>
          </motion.div>

          <motion.div
            className="relative mt-16 md:mt-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(500px,60vw)] w-[min(500px,60vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(250,144,64,0.18) 0%, rgba(237,60,24,0.05) 45%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />
            <ProductVisual product="workstation" floating={!reduce} size="xl" />
          </motion.div>
        </div>
      </div>
      <HardwareNav />
    </section>
  );
}

/* ── 2. Featured ───────────────────────────────────────── */

export function FeaturedSection() {
  return (
    <HwShell id="register">
      <HwReveal>
        <div className="overflow-hidden rounded-[40px] bg-[#F5F6F8]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-0">
            <div className="p-10 md:p-16 lg:p-20">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ED3C18]">
                {FEATURED.eyebrow}
              </p>
              <h2 className="mt-4 font-sf-pro-display text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[48px]">
                {FEATURED.headline}
              </h2>
              <p className="mt-5 text-[18px] leading-[1.55] text-[#666666]">{FEATURED.description}</p>
              <ul className="mt-8 space-y-3">
                {FEATURED.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[18px] text-[#444444]">
                    <Check size={20} className="mt-0.5 shrink-0 text-[#ED3C18]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[18px] text-[#111111]">
                <span className="font-semibold">{FEATURED.price}</span>
                <span className="text-[#666666]"> · {FEATURED.priceNote}</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
                <HwLink>Learn more</HwLink>
              </div>
            </div>
            <div className="relative flex min-h-[360px] items-center justify-center p-10 md:min-h-[480px] md:p-16">
              <div
                className="absolute inset-0 m-8 rounded-[32px]"
                style={{
                  background: "radial-gradient(circle at 50% 60%, rgba(250,144,64,0.12) 0%, transparent 65%)",
                }}
              />
              <ProductVisual product={FEATURED.visual} floating size="xl" />
            </div>
          </div>
        </div>
      </HwReveal>
    </HwShell>
  );
}

/* ── 3. Product grid ───────────────────────────────────── */

export function ProductGridSection() {
  return (
    <HwShell className="bg-[#F5F6F8]">
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          The complete hardware lineup
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[18px] leading-[1.5] text-[#666666]">
          Every device designed to work together from day one.
        </p>
      </HwReveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {GRID_PRODUCTS.map((p, i) => (
          <HwReveal key={p.id} delay={i * 0.06}>
            <HwProductCard id={p.anchor}>
              <div className="flex min-h-[220px] items-center justify-center">
                <ProductVisual product={p.visual} floating size="lg" />
              </div>
              <h3 className="mt-8 font-sf-pro-display text-[28px] font-bold text-[#111111] md:text-[36px]">
                {p.name}
              </h3>
              <p className="mt-3 text-[18px] leading-[1.55] text-[#666666]">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.specs.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-[#F5F6F8] px-4 py-1.5 text-[14px] text-[#444444]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-5">
                <HwLink>Learn More</HwLink>
                <HwLink>Request Demo</HwLink>
              </div>
            </HwProductCard>
          </HwReveal>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 4. Ecosystem ──────────────────────────────────────── */

export function EcosystemSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [linesOn, setLinesOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLinesOn(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const nodes = ECOSYSTEM_DEVICES.map((d) => ({ ...d, ...polar(d.angle, d.dist) }));

  return (
    <HwShell id="ecosystem">
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          One connected ecosystem
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-center text-[18px] text-[#666666]">
          Every device talks to every other — designed as a single restaurant platform.
        </p>
      </HwReveal>

      <div ref={ref} className="relative mx-auto mt-16 h-[min(600px,75vh)] w-full max-w-[1000px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {nodes.map((n) => {
            const pathD = curve(CENTER.x, CENTER.y, n.left, n.top);
            const lit = hovered === n.id;
            return (
              <g key={n.id}>
                <path d={pathD} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.35" strokeLinecap="round" />
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke={lit ? "#ED3C18" : "#FA9040"}
                  strokeWidth={lit ? 0.55 : 0.35}
                  strokeOpacity={lit ? 0.7 : linesOn ? 0.35 : 0}
                  strokeLinecap="round"
                  pathLength={1}
                  initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                  animate={{ strokeDashoffset: linesOn ? 0 : 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </g>
            );
          })}
        </svg>

        <div className="absolute z-20" style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%`, transform: "translate(-50%,-50%)" }}>
          <motion.div animate={hovered ? { boxShadow: "0 0 60px rgba(237,60,24,0.3)" } : {}}>
            <ProductVisual product="workstation" size="md" />
          </motion.div>
        </div>

        {nodes.map((n, i) => (
          <motion.button
            key={n.id}
            type="button"
            className="absolute z-30 rounded-2xl border border-black/[0.05] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#111111] shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
            style={{ left: `${n.left}%`, top: `${n.top}%`, transform: "translate(-50%,-50%)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.07 }}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {n.label}
          </motion.button>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 5. Comparison ─────────────────────────────────────── */

export function ComparisonSection() {
  const visuals: ("register" | "terminal" | "handheld" | "kitchen-display")[] = [
    "register",
    "terminal",
    "handheld",
    "kitchen-display",
  ];

  return (
    <HwShell className="bg-[#F5F6F8]">
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Compare devices
        </h2>
      </HwReveal>

      <div className="mt-16 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="sticky top-[7.5rem] z-10 grid grid-cols-5 gap-6 rounded-[24px] bg-[#F5F6F8]/95 py-6 backdrop-blur-md">
            <div aria-hidden="true" />
            {COMPARE_COLUMNS.map((name, i) => (
              <div key={name} className="text-center">
                <div className="flex h-[140px] items-center justify-center">
                  <ProductVisual product={visuals[i]} size="sm" />
                </div>
                <p className="mt-4 font-sf-pro-display text-[18px] font-bold text-[#111111] md:text-[21px]">
                  {name}
                </p>
              </div>
            ))}
          </div>

          {COMPARE_ROWS.map((row, ri) => (
            <div
              key={row.label}
              className={`grid grid-cols-5 gap-6 py-6 ${ri < COMPARE_ROWS.length - 1 ? "border-b border-black/[0.05]" : ""}`}
            >
              <p className="self-center text-[13px] font-semibold uppercase tracking-[0.06em] text-[#666666]">
                {row.label}
              </p>
              {row.values.map((val, vi) => (
                <p key={vi} className="text-center text-[15px] leading-[1.5] text-[#444444] md:text-[16px]">
                  {val}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </HwShell>
  );
}

/* ── 6. Contactless ──────────────────────────────────────── */

export function ContactlessSection() {
  return (
    <HwShell>
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <HwReveal>
          <h2 className="font-sf-pro-display text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-[#111111] md:text-[48px]">
            Contactless payments, built in.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.55] text-[#666666]">
            Accept tap-to-pay from any modern phone or card — no extra hardware required. Your guests pay the way they prefer.
          </p>
          <div className="mt-8">
            <HwLink>Discover contactless payments</HwLink>
          </div>
        </HwReveal>
        <HwReveal delay={0.1}>
          <div className="overflow-hidden rounded-[40px] bg-[#F5F6F8]">
            <div className="flex min-h-[360px] items-center justify-center p-12 md:min-h-[420px]">
              <ProductVisual product="handheld" floating size="xl" />
            </div>
          </div>
        </HwReveal>
      </div>
    </HwShell>
  );
}

/* ── 7. Kits ───────────────────────────────────────────── */

export function KitsSection() {
  return (
    <HwShell id="kits" className="bg-[#F5F6F8]">
      <HwReveal>
        <h2 className="font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Hardware kits
        </h2>
        <p className="mt-4 max-w-[560px] text-[18px] text-[#666666]">
          Start with everything you need — pre-configured and ready to deploy.
        </p>
      </HwReveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        {KITS.map((kit, i) => (
          <HwReveal key={kit.id} delay={i * 0.06}>
            <HwProductCard>
              <div className="flex min-h-[200px] items-center justify-center">
                <ProductVisual product={kit.visual} floating size="lg" />
              </div>
              <h3 className="mt-8 font-sf-pro-display text-[28px] font-bold text-[#111111] md:text-[36px]">
                {kit.name}
              </h3>
              <p className="mt-3 text-[15px] text-[#666666]">
                Includes: {kit.includes.join(" · ")}
              </p>
              <p className="mt-5 text-[18px] font-semibold text-[#111111]">{kit.price}</p>
              <div className="mt-6">
                <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
              </div>
            </HwProductCard>
          </HwReveal>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 8. Why ────────────────────────────────────────────── */

export function WhySection() {
  return (
    <HwShell>
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Why Chefgaa hardware
        </h2>
      </HwReveal>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <HwReveal key={item.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="rounded-[36px] p-10"
                style={{ backgroundColor: item.tint }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <Icon size={28} className="text-[#ED3C18]" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-sf-pro-display text-[22px] font-bold text-[#111111]">{item.title}</h3>
                <p className="mt-2 text-[18px] leading-[1.55] text-[#666666]">{item.description}</p>
              </motion.article>
            </HwReveal>
          );
        })}
      </div>
    </HwShell>
  );
}

/* ── 9. Software + Hardware ────────────────────────────── */

export function SoftwareSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const modules = [
    { id: "pos", label: "POS", x: 82, y: 20 },
    { id: "inventory", label: "Inventory", x: 90, y: 40 },
    { id: "kitchen", label: "Kitchen Display", x: 85, y: 62 },
    { id: "online", label: "Online Ordering", x: 70, y: 82 },
    { id: "reservations", label: "Reservations", x: 50, y: 90 },
    { id: "crm", label: "CRM", x: 30, y: 82 },
    { id: "loyalty", label: "Loyalty", x: 15, y: 62 },
    { id: "marketing", label: "Marketing", x: 10, y: 40 },
    { id: "analytics", label: "Analytics", x: 18, y: 20 },
  ];
  const cx = 50;
  const cy = 48;

  return (
    <HwShell className="bg-[#F5F6F8]">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <HwReveal>
          <div className="relative flex min-h-[400px] items-center justify-center rounded-[40px] bg-white p-10">
            <svg className="absolute inset-0 h-full w-full p-8" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {modules.map((m) => (
                <path
                  key={m.id}
                  d={curve(cx, cy, m.x, m.y)}
                  fill="none"
                  stroke={hovered === m.id ? "#ED3C18" : "#FA9040"}
                  strokeWidth={hovered === m.id ? 0.5 : 0.3}
                  strokeOpacity={hovered === m.id ? 0.6 : 0.25}
                  strokeLinecap="round"
                />
              ))}
            </svg>
            <ProductVisual product="workstation" floating size="lg" />
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                className="absolute rounded-full border border-black/[0.06] bg-white px-3 py-1 text-[10px] font-medium text-[#444444] shadow-sm hover:text-[#ED3C18] md:text-[11px]"
                style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%,-50%)" }}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </HwReveal>

        <HwReveal delay={0.1}>
          <h2 className="font-sf-pro-display text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[48px]">
            Software + hardware, deeply integrated.
          </h2>
          <p className="mt-5 text-[18px] leading-[1.55] text-[#666666]">
            Every Chefgaa hardware device is deeply integrated with{" "}
            {SOFTWARE_MODULES.join(", ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {SOFTWARE_MODULES.map((mod) => (
              <span key={mod} className="rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[14px] font-medium text-[#444444]">
                {mod}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <HwPrimaryBtn>Explore the Ecosystem</HwPrimaryBtn>
          </div>
        </HwReveal>
      </div>
    </HwShell>
  );
}

/* ── 10. Gallery ─────────────────────────────────────────── */

export function GallerySection() {
  return (
    <HwShell>
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Built for real restaurants
        </h2>
      </HwReveal>

      <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {GALLERY.map((item, i) => (
          <HwReveal key={item.id} delay={i * 0.05} className="mb-6 break-inside-avoid">
            <figure
              className={`overflow-hidden rounded-[36px] bg-gradient-to-br from-[#FFF4F0] via-[#F5F6F8] to-[#F0F7FF] ${
                item.aspect === "tall" ? "h-80" : item.aspect === "wide" ? "h-56" : "h-64"
              }`}
            >
              <figcaption className="flex h-full flex-col justify-end p-8">
                <span className="font-sf-pro-display text-[21px] font-bold text-[#111111]">{item.label}</span>
              </figcaption>
            </figure>
          </HwReveal>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 11. Stories ─────────────────────────────────────────── */

export function StoriesSection() {
  return (
    <HwShell className="bg-[#F5F6F8]">
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Customer stories
        </h2>
      </HwReveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {STORIES.map((s, i) => (
          <HwReveal key={s.name} delay={i * 0.06}>
            <article className="overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <div className={`h-48 bg-gradient-to-br ${s.gradient}`} aria-hidden="true" />
              <div className="p-8">
                <p className="text-[13px] font-semibold text-[#ED3C18]">{s.metric}</p>
                <blockquote className="mt-3 text-[18px] leading-[1.55] text-[#444444]">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-black/[0.05] pt-6">
                  <p className="font-semibold text-[#111111]">{s.name}</p>
                  <p className="mt-1 text-[14px] text-[#666666]">{s.role}</p>
                </footer>
              </div>
            </article>
          </HwReveal>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 12. FAQ ─────────────────────────────────────────────── */

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <HwShell>
      <HwReveal>
        <h2 className="text-center font-sf-pro-display text-[36px] font-bold tracking-[-0.02em] text-[#111111] md:text-[48px]">
          Frequently asked questions
        </h2>
      </HwReveal>

      <div className="mx-auto mt-16 max-w-[800px] border-t border-black/[0.06]">
        {HARDWARE_FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-black/[0.06]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-sf-pro-display text-[19px] font-semibold text-[#111111] md:text-[21px]">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 text-[24px] text-[#666666] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-[18px] leading-[1.55] text-[#666666]">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </HwShell>
  );
}

/* ── 13. Final CTA ───────────────────────────────────────── */

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-[140px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(250,144,64,0.2) 0%, rgba(237,60,24,0.06) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-10">
        <HwReveal>
          <h2 className="font-sf-pro-display text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[56px]">
            Ready to upgrade your restaurant?
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
            <HwGhostBtn>Talk to Sales</HwGhostBtn>
          </div>
        </HwReveal>
      </div>
    </section>
  );
}
