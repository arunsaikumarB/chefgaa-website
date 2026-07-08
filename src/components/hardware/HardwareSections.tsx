import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  FEATURED,
  GRID_PRODUCTS,
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
  HwFeatureCard,
  HwIconBox,
  HwSectionIntro,
  ProductVisual,
  hwType,
  HW_SCROLL_OFFSET,
} from "./HardwareUI";

function curve(sx: number, sy: number, ex: number, ey: number) {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * 0.14} ${my + dx * 0.14}, ${mx + dy * 0.07} ${my - dx * 0.07}, ${ex} ${ey}`;
}

/* ── 1. Featured ───────────────────────────────────────── */

export function FeaturedSection() {
  return (
    <HwShell id="register">
      <HwReveal>
        <div className="overflow-hidden rounded-[32px] bg-[#F5F6F8]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="p-[40px] md:p-[56px] lg:p-[64px]">
              <p className={hwType.eyebrow}>{FEATURED.eyebrow}</p>
              <h2 className={`mt-[24px] ${hwType.sectionTitle}`}>{FEATURED.headline}</h2>
              <p className={`mt-[20px] ${hwType.body}`}>{FEATURED.description}</p>
              <ul className="mt-[28px] space-y-[14px]">
                {FEATURED.features.map((f) => (
                  <li key={f} className="flex items-start gap-[12px] text-[18px] leading-[1.5] text-[#444444]">
                    <Check size={20} className="mt-[2px] shrink-0 text-[#ED3C18]" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-[28px] text-[18px] leading-[1.5] text-[#111111]">
                <span className="font-semibold">{FEATURED.price}</span>
                <span className="text-[#666666]"> · {FEATURED.priceNote}</span>
              </p>
              <div className="mt-[28px] flex flex-wrap items-center gap-[24px]">
                <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
                <HwLink>Learn more</HwLink>
              </div>
            </div>
            <div className="relative flex min-h-[400px] items-center justify-center p-[40px] md:min-h-[520px] md:p-[56px]">
              <div
                className="absolute inset-[24px] rounded-[32px]"
                style={{
                  background: "radial-gradient(circle at 50% 60%, rgba(250,144,64,0.12) 0%, transparent 65%)",
                }}
              />
              <ProductVisual product={FEATURED.visual} size="xl" />
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
        <HwSectionIntro
          title="The complete hardware lineup"
          description="Every device designed to work together from day one."
        />
      </HwReveal>

      <div className="mt-[56px] grid grid-cols-1 gap-[32px] md:grid-cols-2 md:gap-[40px]">
        {GRID_PRODUCTS.map((p, i) => (
          <div key={p.id} id={p.anchor} className={`h-full ${HW_SCROLL_OFFSET}`}>
            <HwReveal delay={i * 0.06} className="h-full">
              <HwProductCard>
                <ProductVisual product={p.visual} size="md" />
                <h3 className="mt-[28px] font-sf-pro-display text-[24px] font-bold leading-[1.25] tracking-[-0.02em] text-[#111111] md:text-[28px]">
                  {p.name}
                </h3>
                <p className={`mt-[12px] ${hwType.body}`}>{p.description}</p>
                <ul className="mt-[20px] flex flex-wrap gap-[8px]">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-[#F5F6F8] px-[14px] py-[8px] text-[14px] leading-none text-[#444444]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-[24px] pt-[28px]">
                  <HwLink>Learn More</HwLink>
                  <HwLink>Request Demo</HwLink>
                </div>
              </HwProductCard>
            </HwReveal>
          </div>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 4. Comparison ─────────────────────────────────────── */

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
        <HwSectionIntro title="Compare devices" />
      </HwReveal>

      <div className="mt-14 overflow-x-auto">
        <div className="min-w-[880px]">
          <div className="sticky top-[11.5rem] z-10 grid grid-cols-5 gap-8 rounded-[32px] bg-[#F5F6F8]/95 py-8 backdrop-blur-md">
            <div aria-hidden="true" />
            {COMPARE_COLUMNS.map((name, i) => (
              <div key={name} className="text-center">
                <div className="flex h-[180px] items-center justify-center">
                  <ProductVisual product={visuals[i]} size="sm" />
                </div>
                <p className={`mt-6 ${hwType.cardTitle} text-[24px] md:text-[28px]`}>{name}</p>
              </div>
            ))}
          </div>

          {COMPARE_ROWS.map((row, ri) => (
            <div
              key={row.label}
              className={`grid grid-cols-5 items-center gap-8 py-10 ${
                ri < COMPARE_ROWS.length - 1 ? "border-b border-black/[0.05]" : ""
              }`}
            >
              <p className="text-[16px] font-semibold uppercase tracking-[0.06em] leading-[1.6] text-[#666666]">
                {row.label}
              </p>
              {row.values.map((val, vi) => (
                <p key={vi} className="text-center text-[16px] leading-[1.6] text-[#444444]">
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
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <HwReveal>
          <h2 className={hwType.sectionTitle}>Contactless payments, built in.</h2>
          <p className={`mt-6 ${hwType.body}`}>
            Accept tap-to-pay from any modern phone or card — no extra hardware required. Your guests pay the way they prefer.
          </p>
          <div className="mt-8">
            <HwLink>Discover contactless payments</HwLink>
          </div>
        </HwReveal>
        <HwReveal delay={0.1}>
          <div className="overflow-hidden rounded-[32px] bg-[#F5F6F8]">
            <div className="flex min-h-[400px] items-center justify-center p-12 md:min-h-[480px]">
              <ProductVisual product="handheld" size="xl" />
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
        <HwSectionIntro
          title="Hardware kits"
          description="Start with everything you need — pre-configured and ready to deploy."
          align="left"
        />
      </HwReveal>

      <div className="mt-[56px] grid grid-cols-1 gap-[32px] md:grid-cols-2 md:gap-[40px]">
        {KITS.map((kit, i) => (
          <HwReveal key={kit.id} delay={i * 0.06} className="h-full">
            <HwProductCard>
              <ProductVisual product={kit.visual} size="lg" />
              <h3 className={`mt-[28px] ${hwType.cardTitle}`}>{kit.name}</h3>
              <p className={`mt-[12px] ${hwType.caption}`}>Includes: {kit.includes.join(" · ")}</p>
              <p className="mt-[20px] text-[18px] font-semibold leading-[1.4] text-[#111111]">{kit.price}</p>
              <div className="mt-auto pt-[28px]">
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
        <HwSectionIntro title="Why Chefgaa hardware" />
      </HwReveal>

      <div className="mt-[56px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-3">
        {WHY_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <HwReveal key={item.title} delay={i * 0.05} className="h-full">
              <HwFeatureCard tint={item.tint}>
                <HwIconBox>
                  <Icon size={28} className="text-[#ED3C18]" strokeWidth={1.75} />
                </HwIconBox>
                <h3 className={`mt-[24px] ${hwType.cardTitle} text-[24px] leading-[1.25]`}>{item.title}</h3>
                <p className={`mt-[12px] ${hwType.body}`}>{item.description}</p>
              </HwFeatureCard>
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
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <HwReveal>
          <div className="relative flex min-h-[440px] items-center justify-center rounded-[32px] bg-white p-10">
            <svg
              className="absolute inset-0 h-full w-full p-8"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
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
            <ProductVisual product="workstation" size="lg" />
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                className="absolute rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[16px] font-medium leading-[1.6] text-[#444444] shadow-sm transition-colors hover:text-[#ED3C18]"
                style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%,-50%)" }}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </HwReveal>

        <HwReveal delay={0.1} className="flex flex-col justify-center">
          <h2 className={hwType.sectionTitle}>Software + hardware, deeply integrated.</h2>
          <p className={`mt-6 ${hwType.body}`}>
            Every Chefgaa hardware device is deeply integrated with {SOFTWARE_MODULES.join(", ")}.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {SOFTWARE_MODULES.map((mod) => (
              <span
                key={mod}
                className="rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[16px] font-medium leading-[1.6] text-[#444444]"
              >
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
        <HwSectionIntro title="Built for real restaurants" />
      </HwReveal>

      <div className="mt-14 columns-1 gap-8 sm:columns-2 lg:columns-3">
        {GALLERY.map((item, i) => (
          <HwReveal key={item.id} delay={i * 0.05} className="mb-8 break-inside-avoid">
            <figure
              className={`overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FFF4F0] via-[#F5F6F8] to-[#F0F7FF] ${
                item.aspect === "tall" ? "h-96" : item.aspect === "wide" ? "h-64" : "h-72"
              }`}
            >
              <figcaption className="flex h-full flex-col justify-end p-10">
                <span className="font-sf-pro-display text-[24px] font-bold leading-[1.6] text-[#111111]">
                  {item.label}
                </span>
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
        <HwSectionIntro title="Customer stories" />
      </HwReveal>

      <div className="mt-[56px] grid grid-cols-1 gap-[32px] md:grid-cols-3">
        {STORIES.map((s, i) => (
          <HwReveal key={s.name} delay={i * 0.06} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white text-left shadow-[0_16px_48px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.08)]">
              <div className={`h-[180px] bg-gradient-to-br ${s.gradient}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-[32px] md:p-[36px]">
                <p className="text-[15px] font-semibold leading-[1.4] text-[#ED3C18]">{s.metric}</p>
                <blockquote className={`mt-[14px] flex-1 ${hwType.body} text-[#444444]`}>
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <footer className="mt-[28px] border-t border-black/[0.05] pt-[24px]">
                  <p className="text-[17px] font-semibold leading-[1.4] text-[#111111]">{s.name}</p>
                  <p className={`mt-[6px] ${hwType.caption}`}>{s.role}</p>
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
        <HwSectionIntro title="Frequently asked questions" />
      </HwReveal>

      <div className="mx-auto mt-14 max-w-[800px] border-t border-black/[0.06]">
        {HARDWARE_FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-black/[0.06]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-8 py-8 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-sf-pro-display text-[18px] font-semibold leading-[1.6] text-[#111111] md:text-[21px]">
                  {item.question}
                </span>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5F6F8] text-[24px] text-[#666666] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
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
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className={`pb-8 ${hwType.body}`}>{item.answer}</p>
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
    <section className="relative overflow-hidden bg-white pt-[120px] pb-[140px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(250,144,64,0.2) 0%, rgba(237,60,24,0.06) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-20">
        <HwReveal>
          <h2 className={hwType.sectionTitle}>Ready to upgrade your restaurant?</h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
            <HwGhostBtn>Talk to Sales</HwGhostBtn>
          </div>
        </HwReveal>
      </div>
    </section>
  );
}
