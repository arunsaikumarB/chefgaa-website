import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  FEATURED,
  GRID_PRODUCTS,
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
  HwFeatureCard,
  HwIconBox,
  HwSectionIntro,
  ProductVisual,
  hwType,
  HW_SCROLL_OFFSET,
} from "./HardwareUI";
import { HardwareCard } from "./HardwareCard";

export { ComparisonSection } from "./CompareSection";

const HardwareModelViewer = lazy(() => import("./HardwareModelViewer"));

/* ── 1. Featured ───────────────────────────────────────── */

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FeaturedSection() {
  return (
    <section id="register" className={`bg-white pt-[32px] pb-[48px] ${HW_SCROLL_OFFSET}`}>
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="overflow-hidden rounded-[24px] bg-[#F5F6F8]">
            <div className="grid items-center lg:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
              {/* Left content */}
              <div className="flex flex-col justify-center p-[24px] md:p-[28px] lg:p-[36px] lg:pr-[24px]">
                <motion.p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#ED3C18]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOut }}
                >
                  {FEATURED.eyebrow}
                </motion.p>

                <motion.h2
                  className="mt-[12px] max-w-[520px] font-sf-pro-display text-[28px] font-bold leading-[1.1] tracking-[-0.03em] text-[#111111] md:text-[36px] lg:text-[44px]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.05, ease: easeOut }}
                >
                  {FEATURED.headline}
                </motion.h2>

                <motion.p
                  className="mt-[12px] max-w-[480px] text-[15px] leading-[1.55] text-[#5B6472] md:text-[16px]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
                >
                  {FEATURED.description}
                </motion.p>

                <ul className="mt-[20px] space-y-[12px]">
                  {FEATURED.features.map((f, i) => (
                    <motion.li
                      key={f}
                      className="flex items-center gap-[10px] text-[15px] leading-[1.4] text-[#444444]"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.14 + i * 0.06, ease: easeOut }}
                    >
                      <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#ED3C18]/10">
                        <Check size={13} className="text-[#ED3C18]" strokeWidth={2.75} />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.p
                  className="mt-[20px] leading-[1.3] text-[#111111]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, ease: easeOut }}
                >
                  <span className="text-[22px] font-bold tracking-[-0.02em] md:text-[26px]">
                    {FEATURED.price}
                  </span>
                  <span className="ml-[8px] text-[15px] font-normal text-[#5B6472]">
                    · {FEATURED.priceNote}
                  </span>
                </motion.p>

                <div className="mt-[20px] flex flex-wrap items-center gap-[12px]">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#ED3C18] px-[24px] text-[15px] font-semibold leading-none !text-white outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(255,92,53,0.25)] focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
                    >
                      Request Demo
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.52, ease: easeOut }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex h-[44px] items-center justify-center rounded-full border border-[#111111] px-[24px] text-[15px] font-semibold leading-none text-[#111111] outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-[#111111] hover:!text-white focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
                    >
                      Learn more
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Right product — no nested grey box */}
              <div className="relative flex items-center justify-center p-[20px] md:p-[24px] lg:p-[28px]">
                <motion.div
                  className="relative w-full max-w-[520px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.12, ease: easeOut }}
                >
                  <Suspense fallback={null}>
                    <HardwareModelViewer
                      src="/models/pos_machine.glb"
                      title="Chefgaa Register"
                      variant="stage"
                    />
                  </Suspense>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Product grid ───────────────────────────────────── */

export function ProductGridSection() {
  return (
    <HwShell className="bg-[#FAFAFA]">
      <HwReveal>
        <HwSectionIntro
          title="The complete hardware lineup"
          description="Every device designed to work together from day one."
        />
      </HwReveal>

      <div className="mx-auto mt-[40px] grid w-full max-w-[1120px] grid-cols-1 items-stretch gap-[24px] md:grid-cols-2 md:gap-[32px]">
        {GRID_PRODUCTS.map((p, i) => (
          <div key={p.id} id={p.anchor} className={`h-full ${HW_SCROLL_OFFSET}`}>
            <HwReveal delay={i * 0.05} className="h-full" variant="card">
              <HardwareCard product={p} />
            </HwReveal>
          </div>
        ))}
      </div>
    </HwShell>
  );
}

/* ── 6. Contactless ──────────────────────────────────────── */

export function ContactlessSection() {
  return (
    <HwShell className="bg-[#FAFAFA]">
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
          <div className="relative overflow-hidden rounded-[32px] bg-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[15%] rounded-full opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, #ED3C18 0%, transparent 70%)",
              }}
            />
            <div className="relative flex min-h-[400px] items-center justify-center p-12 md:min-h-[480px]">
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

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        {WHY_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <HwReveal key={item.title} delay={i * 0.08} className="h-full" variant="card">
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
    <HwShell className="bg-[#FAFAFA]">
      <HwReveal>
        <HwSectionIntro title="Customer stories" />
      </HwReveal>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-3">
        {STORIES.map((s, i) => (
          <HwReveal key={s.name} delay={i * 0.08} className="h-full" variant="card">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white text-left shadow-[0_16px_45px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6px] hover:scale-[1.015] hover:shadow-[0_22px_55px_rgba(0,0,0,0.09)]">
              <div className={`h-[140px] bg-gradient-to-br ${s.gradient}`} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-[24px]">
                <p className="text-[15px] font-semibold leading-[1.4] text-[#ED3C18]">{s.metric}</p>
                <blockquote className={`mt-[12px] flex-1 ${hwType.body} text-[#444444]`}>
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <footer className="mt-[24px] border-t border-black/[0.05] pt-[16px]">
                  <p className="text-[17px] font-semibold leading-[1.4] text-[#111111]">{s.name}</p>
                  <p className={`mt-[8px] ${hwType.caption}`}>{s.role}</p>
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

      <div className="mx-auto mt-[32px] max-w-[800px] border-t border-black/[0.06]">
        {HARDWARE_FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-black/[0.06]">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-8 py-8 text-left outline-none transition-colors duration-200 hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ED3C18]/40"
                aria-expanded={isOpen}
              >
                <span className="font-sf-pro-display text-[18px] font-semibold leading-[1.6] text-[#111111] md:text-[21px]">
                  {item.question}
                </span>
                <motion.span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F5F6F8] text-[#666666]"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown size={20} strokeWidth={2} aria-hidden="true" />
                </motion.span>
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
    <section className="relative overflow-hidden bg-[#FAFAFA] py-[72px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #ED3C18 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-20">
        <HwReveal>
          <h2 className={hwType.sectionTitle}>Ready to upgrade your restaurant?</h2>
          <div className="mt-[32px] flex flex-col items-center justify-center gap-[16px] sm:flex-row">
            <HwPrimaryBtn>Request Demo</HwPrimaryBtn>
            <HwGhostBtn>Talk to Sales</HwGhostBtn>
          </div>
        </HwReveal>
      </div>
    </section>
  );
}
