import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  formatPlanPrice,
  PRICING_PLANS,
  type BillingPeriod,
  type PricingPlan,
} from "./pricingData";
import { PRICING_EASE, PricingSection } from "./PricingShell";

type PricingCardsProps = {
  billing: BillingPeriod;
};

function PlanCta({ plan }: { plan: PricingPlan }) {
  if (plan.variant === "featured") {
    return (
      <Link
        to={plan.ctaTo}
        className="mt-auto inline-flex h-[52px] w-full items-center justify-center rounded-full bg-brand font-[Inter] text-[16px] font-semibold !text-white shadow-[0_8px_24px_rgba(251,87,52,0.22)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(251,87,52,0.28)]"
      >
        {plan.cta}
      </Link>
    );
  }

  return (
    <Link
      to={plan.ctaTo}
      className="mt-auto inline-flex h-[52px] w-full items-center justify-center rounded-full border border-black/[0.1] bg-white font-[Inter] text-[16px] font-semibold text-[#111111] transition-all duration-300 hover:scale-[1.03] hover:border-black/[0.18] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
    >
      {plan.cta}
    </Link>
  );
}

function PricingCard({
  plan,
  billing,
  index,
}: {
  plan: PricingPlan;
  billing: BillingPeriod;
  index: number;
}) {
  const yearly = billing === "yearly";
  const price = formatPlanPrice(plan.monthlyPrice, yearly);
  const isFeatured = plan.variant === "featured";

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: PRICING_EASE }}
      className={`group relative flex h-full flex-col rounded-[36px] border bg-white p-[48px] text-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(0,0,0,0.1)] ${
        isFeatured
          ? "border-brand/40 shadow-[0_24px_70px_rgba(251,87,52,0.12)] hover:shadow-[0_32px_90px_rgba(251,87,52,0.16)] lg:-translate-y-[8px]"
          : "border-black/[0.08]"
      }`}
    >
      {plan.badge && (
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-brand px-3.5 py-1.5 font-[Inter] text-[11px] font-bold uppercase tracking-[0.12em] text-white">
          {plan.badge}
        </span>
      )}

      <h3 className="font-[Inter] text-[32px] font-bold leading-tight tracking-[-0.02em]">
        {plan.name}
      </h3>
      <p className="mt-3 font-[Inter] text-[18px] leading-[1.5] text-[#666666]">{plan.tagline}</p>

      <div className="mt-10 flex items-baseline gap-1">
        <span className="font-[Inter] text-[48px] font-extrabold leading-none tracking-[-0.03em] lg:text-[56px]">
          {price}
        </span>
        {plan.monthlyPrice !== null && (
          <span className="font-[Inter] text-[18px] text-[#888888]">/month</span>
        )}
      </div>

      <ul className="mt-10 flex flex-col gap-4">
        {plan.extraLabel && (
          <li className="font-[Inter] text-[15px] font-semibold text-[#888888]">{plan.extraLabel}</li>
        )}
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} strokeWidth={2.5} className="mt-0.5 shrink-0 text-brand" />
            <span className="font-[Inter] text-[17px] leading-snug text-[#2D2D2D]">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <PlanCta plan={plan} />
      </div>
    </motion.article>
  );
}

export function PricingCards({ billing }: PricingCardsProps) {
  return (
    <PricingSection id="plans" className="pb-0 pt-[32px] md:pt-[40px]">
      <div className="grid grid-cols-1 items-stretch gap-[40px] md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, index) => (
          <PricingCard key={plan.id} plan={plan} billing={billing} index={index} />
        ))}
      </div>
    </PricingSection>
  );
}
