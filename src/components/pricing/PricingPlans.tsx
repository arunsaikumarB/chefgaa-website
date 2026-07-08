import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { PRICING_PLANS, type PricingPlan } from "./pricingData";
import { PricingReveal, PricingSection } from "./PricingLayout";

function PlanButton({ plan }: { plan: PricingPlan }) {
  const base =
    "mt-auto inline-flex h-[48px] w-full items-center justify-center rounded-full font-[Inter] text-[16px] font-semibold transition-all duration-300 hover:scale-[1.03]";

  if (plan.ctaVariant === "primary") {
    return (
      <Link
        to={plan.ctaTo}
        className={`${base} bg-brand !text-white shadow-[0_8px_24px_rgba(251,87,52,0.22)] hover:shadow-[0_12px_32px_rgba(251,87,52,0.28)]`}
      >
        {plan.cta}
      </Link>
    );
  }

  return (
    <Link
      to={plan.ctaTo}
      className={`${base} border border-black/[0.12] bg-white text-[#111111] hover:border-black/[0.2]`}
    >
      {plan.cta}
    </Link>
  );
}

function PlanCard({ plan, index }: { plan: PricingPlan; index: number }) {
  return (
    <PricingReveal delay={index * 0.08} className="h-full">
      <article
        className={`group relative flex h-full flex-col rounded-[32px] border border-black/[0.06] bg-white p-[36px] shadow-[0_16px_50px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] ${
          plan.featured ? "lg:-mt-2" : ""
        }`}
      >
        {plan.badge && (
          <span className="mb-5 inline-flex w-fit items-center rounded-full bg-brand px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
            {plan.badge}
          </span>
        )}

        <h3 className="font-[Inter] text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#111111]">
          {plan.name}
        </h3>
        <p className="mt-3 font-[Inter] text-[18px] leading-[1.5] text-[#666666]">{plan.tagline}</p>

        <div className="mt-8 flex items-baseline gap-1">
          <span className="font-[Inter] text-[40px] font-bold leading-none tracking-[-0.03em] text-[#111111] md:text-[48px]">
            {plan.price}
          </span>
          {plan.priceNote && (
            <span className="font-[Inter] text-[18px] text-[#888888]">{plan.priceNote}</span>
          )}
        </div>

        <ul className="mt-8 flex flex-col gap-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={18}
                strokeWidth={2.5}
                className="mt-0.5 shrink-0 text-brand"
                aria-hidden="true"
              />
              <span className="font-[Inter] text-[18px] leading-snug text-[#2D2D2D]">{feature}</span>
            </li>
          ))}
          {plan.extraFeatures && (
            <>
              <li className="pt-1 font-[Inter] text-[14px] font-semibold uppercase tracking-[0.08em] text-[#999999]">
                +
              </li>
              {plan.extraFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check
                    size={18}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span className="font-[Inter] text-[18px] leading-snug text-[#2D2D2D]">
                    {feature}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>

        <div className="mt-10">
          <PlanButton plan={plan} />
        </div>
      </article>
    </PricingReveal>
  );
}

export function PricingPlans() {
  return (
    <PricingSection className="pb-0 pt-[80px] md:pt-[120px] lg:pt-[160px]">
      <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </div>
    </PricingSection>
  );
}
