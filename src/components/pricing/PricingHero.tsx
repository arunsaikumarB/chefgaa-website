import { Link } from "react-router-dom";
import { BillingToggle } from "./BillingToggle";
import type { BillingPeriod } from "./pricingData";
import { PricingReveal } from "./PricingShell";

type PricingHeroProps = {
  billing: BillingPeriod;
  onBillingChange: (value: BillingPeriod) => void;
};

export function PricingHero({ billing, onBillingChange }: PricingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-[48px] pt-[100px] md:px-10 md:pb-[56px] md:pt-[120px] lg:px-[48px]">
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-[0.08] blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-[1500px] flex-col items-center text-center">
        <PricingReveal>
          <span className="inline-flex items-center rounded-full border border-black/[0.06] bg-white px-4 py-2 font-[Inter] text-[12px] font-bold uppercase tracking-[0.14em] text-[#666666]">
            Pricing
          </span>
        </PricingReveal>

        <PricingReveal delay={0.06}>
          <h1 className="mt-8 max-w-[920px] font-[Inter] text-[44px] font-extrabold leading-[0.98] tracking-[-0.04em] text-[#111111] sm:text-[64px] lg:text-[84px]">
            Pricing that grows
            <br />
            with your{" "}
            <span className="bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
              restaurant
            </span>
            .
          </h1>
        </PricingReveal>

        <PricingReveal delay={0.12}>
          <p className="mt-8 max-w-[760px] font-[Inter] text-[18px] font-normal leading-[1.65] text-[#555555] md:text-[22px]">
            Simple, transparent pricing for restaurants of every size. Whether you&apos;re opening
            your first café or managing hundreds of locations, Chefgaa grows with you.
          </p>
        </PricingReveal>

        <PricingReveal delay={0.16}>
          <BillingToggle value={billing} onChange={onBillingChange} />
        </PricingReveal>

        <PricingReveal delay={0.22}>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-10 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_12px_32px_rgba(251,87,52,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_16px_40px_rgba(251,87,52,0.32)]"
            >
              Request Demo
            </Link>
            <Link
              to="/hardware"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-black/[0.12] bg-white px-10 font-[Inter] text-[16px] font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-black/[0.2] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              View Hardware
            </Link>
          </div>
        </PricingReveal>
      </div>
    </section>
  );
}
