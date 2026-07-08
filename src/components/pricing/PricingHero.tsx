import { Link } from "react-router-dom";
import { PricingReveal } from "./PricingLayout";

export function PricingHero() {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-white px-6 pt-[80px] md:px-10 lg:px-[48px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.08] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[1480px] flex-col items-center text-center">
        <PricingReveal>
          <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#666666]">
            Pricing
          </span>
        </PricingReveal>

        <PricingReveal delay={0.06}>
          <h1 className="mt-8 max-w-[900px] font-[Inter] text-[40px] font-bold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[56px] lg:text-[72px]">
            Simple pricing for every{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              restaurant
            </span>
            .
          </h1>
        </PricingReveal>

        <PricingReveal delay={0.12}>
          <p className="mt-6 max-w-[640px] font-[Inter] text-[18px] font-normal leading-[1.6] text-[#555555] md:text-[22px]">
            Whether you&apos;re running one restaurant or hundreds of locations, Chefgaa grows
            with your business.
          </p>
        </PricingReveal>

        <PricingReveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-[48px] items-center justify-center rounded-full bg-brand px-8 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_8px_24px_rgba(251,87,52,0.22)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(251,87,52,0.28)]"
            >
              Request Demo
            </Link>
            <Link
              to="/hardware"
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-black/[0.12] bg-white px-8 font-[Inter] text-[16px] font-semibold text-[#111111] transition-all duration-300 hover:scale-[1.03] hover:border-black/[0.2]"
            >
              View Hardware
            </Link>
          </div>
        </PricingReveal>
      </div>
    </section>
  );
}
