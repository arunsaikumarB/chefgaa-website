import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  FEATURED,
  GRID_PRODUCTS,
  COMPARE_COLUMNS,
  COMPARE_ROWS,
  WHY_ITEMS,
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

const HardwareModelViewer = lazy(() => import("./HardwareModelViewer"));

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

            {/* Right side: premium product stage only — no overlays or extra UI */}
            <div className="p-[24px] md:p-[32px] lg:p-[40px]">
              <Suspense fallback={null}>
                <HardwareModelViewer
                  src="/models/pos_machine.glb"
                  title="Chefgaa Register"
                  variant="stage"
                />
              </Suspense>
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
                <h3
                  className={`font-sf-pro-display text-[24px] font-bold leading-[1.25] tracking-[-0.02em] text-[#111111] md:text-[28px] ${
                    p.id === "kitchen-display" || p.id === "display-stand"
                      ? "mt-[24px]"
                      : "mt-[28px]"
                  }`}
                >
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

      <div className="mt-[40px] overflow-x-auto md:mt-[48px]">
        <div className="min-w-[880px]">
          <div className="sticky top-[11.5rem] z-10 grid grid-cols-5 gap-[24px] rounded-[28px] bg-[#F5F6F8]/95 py-[24px] backdrop-blur-md md:gap-[32px] md:py-[32px]">
            <div aria-hidden="true" />
            {COMPARE_COLUMNS.map((name, i) => (
              <div key={name} className="text-center">
                <div className="flex h-[140px] items-center justify-center md:h-[160px]">
                  <ProductVisual product={visuals[i]} size="sm" />
                </div>
                <p className={`mt-[16px] ${hwType.cardTitle} text-[22px] md:text-[26px]`}>{name}</p>
              </div>
            ))}
          </div>

          {COMPARE_ROWS.map((row, ri) => (
            <div
              key={row.label}
              className={`grid grid-cols-5 items-center gap-[24px] py-[28px] md:gap-[32px] md:py-[32px] ${
                ri < COMPARE_ROWS.length - 1 ? "border-b border-black/[0.05]" : ""
              }`}
            >
              <p className="text-[14px] font-semibold uppercase tracking-[0.06em] leading-[1.4] text-[#666666] md:text-[15px]">
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
