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
  HwProductCard,
  HwFeatureCard,
  HwIconBox,
  HwSectionIntro,
  ProductVisual,
  hwType,
  HW_SCROLL_OFFSET,
} from "./HardwareUI";

export { ComparisonSection } from "./CompareSection";

const HardwareModelViewer = lazy(() => import("./HardwareModelViewer"));

/* ── 1. Featured ───────────────────────────────────────── */

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FeaturedSection() {
  return (
    <HwShell id="register">
      <div className="min-h-0 overflow-hidden rounded-[36px] bg-[#F5F6F8] md:min-h-[620px] lg:min-h-[720px]">
        <div className="grid h-full items-center lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)]">
          {/* Left content */}
          <div className="flex flex-col justify-center p-[32px] md:p-[60px] lg:p-[80px]">
            <motion.p
              className="text-[12px] font-semibold uppercase tracking-[0.25em] text-[#ED3C18]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              {FEATURED.eyebrow}
            </motion.p>

            <motion.h2
              className="mt-[20px] max-w-[580px] font-sf-pro-display text-[36px] font-bold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[48px] lg:text-[64px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: easeOut }}
            >
              {FEATURED.headline}
            </motion.h2>

            <motion.p
              className="mt-[24px] max-w-[560px] text-[18px] leading-[1.7] text-[#5B6472] md:text-[20px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
            >
              {FEATURED.description}
            </motion.p>

            <ul className="mt-[32px] space-y-[20px]">
              {FEATURED.features.map((f, i) => (
                <motion.li
                  key={f}
                  className="flex items-center gap-[14px] text-[18px] leading-[1.5] text-[#444444]"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.16 + i * 0.08, ease: easeOut }}
                >
                  <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#ED3C18]/10">
                    <Check size={16} className="text-[#ED3C18]" strokeWidth={2.75} />
                  </span>
                  {f}
                </motion.li>
              ))}
            </ul>

            <motion.p
              className="mt-[32px] leading-[1.4] text-[#111111]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.48, ease: easeOut }}
            >
              <span className="text-[28px] font-bold tracking-[-0.02em] md:text-[32px]">
                {FEATURED.price}
              </span>
              <span className="ml-[10px] text-[18px] font-normal text-[#5B6472]">
                · {FEATURED.priceNote}
              </span>
            </motion.p>

            <div className="mt-[32px] flex flex-wrap items-center gap-[20px]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55, ease: easeOut }}
              >
                <Link
                  to="/contact"
                  className="inline-flex h-[56px] items-center justify-center rounded-full bg-[#ED3C18] px-[32px] text-[16px] font-semibold leading-none !text-white outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(255,92,53,0.25)] focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
                >
                  Request Demo
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65, ease: easeOut }}
              >
                <Link
                  to="/contact"
                  className="inline-flex h-[56px] items-center justify-center rounded-full border border-[#111111] px-[32px] text-[16px] font-semibold leading-none text-[#111111] outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-[#111111] hover:!text-white hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
                >
                  Learn more
                </Link>
              </motion.div>
            </div>
          </div>

            {/* Right product stage */}
          <div className="relative flex items-center justify-center p-[32px] md:p-[60px] lg:p-[80px] lg:pl-[40px]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[10%] rounded-full opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(circle at 50% 55%, #ED3C18 0%, transparent 65%)",
              }}
            />
            <motion.div
              className="relative w-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
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
    </HwShell>
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

      <div className="mt-[80px] grid grid-cols-1 items-stretch gap-x-[40px] gap-y-[28px] md:grid-cols-2 md:gap-x-[48px] md:gap-y-[32px]">
        {GRID_PRODUCTS.map((p, i) => (
          <div key={p.id} id={p.anchor} className={`h-full max-h-[740px] ${HW_SCROLL_OFFSET}`}>
            <HwReveal delay={i * 0.08} className="h-full" variant="card">
              <HwProductCard className="max-h-[740px]">
                <ProductVisual product={p.visual} size="md" />
                <h3 className="mt-[24px] h-[70px] overflow-hidden font-sf-pro-display text-[28px] font-bold leading-[1.25] tracking-[-0.02em] text-[#111111] line-clamp-2">
                  {p.name}
                </h3>
                <p className="mt-[12px] h-[86px] overflow-hidden text-[18px] leading-[1.6] text-[#666666] line-clamp-3">
                  {p.description}
                </p>
                <ul className="mt-[20px] flex h-[36px] flex-wrap gap-[8px] overflow-hidden">
                  {p.specs.slice(0, 3).map((s) => (
                    <li key={s} className={hwType.chip}>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-[24px] pt-[20px]">
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

      <div className="mt-[80px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 sm:gap-[32px] lg:grid-cols-3">
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

      <div className="mt-[80px] grid grid-cols-1 gap-[32px] md:grid-cols-3">
        {STORIES.map((s, i) => (
          <HwReveal key={s.name} delay={i * 0.08} className="h-full" variant="card">
            <article className="flex h-full flex-col overflow-hidden rounded-[28px] bg-white text-left shadow-[0_16px_45px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6px] hover:scale-[1.015] hover:shadow-[0_22px_55px_rgba(0,0,0,0.09)]">
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

      <div className="mx-auto mt-[80px] max-w-[800px] border-t border-black/[0.06]">
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
    <section className="relative overflow-hidden bg-[#FAFAFA] pt-[120px] pb-[140px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #ED3C18 0%, transparent 70%)",
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
