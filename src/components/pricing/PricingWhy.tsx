import { WHY_FEATURES } from "./pricingData";
import { PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

export function PricingWhy() {
  return (
    <PricingSection className={sectionSpacing}>
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[48px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-[64px]">
          Everything included.
        </h2>
      </PricingReveal>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {WHY_FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <PricingReveal key={feature.title} delay={index * 0.08}>
              <article className="group flex h-full flex-col rounded-[24px] border border-black/[0.06] bg-white p-8 shadow-[0_16px_48px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(251,87,52,0.12)] md:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF7F3] text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3 className="font-[Inter] text-[24px] font-bold leading-tight tracking-[-0.02em] text-[#111111]">
                  {feature.title}
                </h3>
                <p className="mt-3 font-[Inter] text-[17px] leading-[1.6] text-[#666666]">
                  {feature.description}
                </p>
              </article>
            </PricingReveal>
          );
        })}
      </div>
    </PricingSection>
  );
}
