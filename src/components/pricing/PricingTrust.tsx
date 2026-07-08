import { CountUpStat } from "./useCountUp";
import { TRUST_LOGOS, TRUST_STATS } from "./pricingData";
import { PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

export function PricingTrust() {
  const doubled = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <PricingSection className={sectionSpacing}>
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[52px]">
          Trusted by restaurants
        </h2>
      </PricingReveal>

      <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {TRUST_STATS.map((stat, index) => (
          <PricingReveal key={stat.label} delay={index * 0.08} className="text-center">
            <p className="font-[Inter] text-[40px] font-extrabold leading-none tracking-[-0.03em] text-[#111111] md:text-[56px]">
              <CountUpStat value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="mt-3 font-[Inter] text-[16px] font-medium text-[#888888]">{stat.label}</p>
          </PricingReveal>
        ))}
      </div>

      <div className="relative mt-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-16">
          {doubled.map((logo, index) => (
            <span
              key={`${logo}-${index}`}
              className="shrink-0 font-[Inter] text-[18px] font-semibold tracking-[-0.01em] text-[#CCCCCC]"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </PricingSection>
  );
}
