import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  formatPlanPrice,
  PRICING_PLANS,
  type BillingPeriod,
  type PricingPlan,
} from "./pricingData";
import { PRICING_EASE, PricingSection, sectionSpacing } from "./PricingShell";

type PricingCardsProps = {
  billing: BillingPeriod;
};

function PlanCta({ plan, variant }: { plan: PricingPlan; variant: PricingPlan["variant"] }) {
  if (variant === "featured") {
    return (
      <Link
        to={plan.ctaTo}
        className="mt-auto inline-flex h-[52px] w-full items-center justify-center rounded-full bg-white font-[Inter] text-[16px] font-semibold text-brand shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(0,0,0,0.16)]"
      >
        {plan.cta}
      </Link>
    );
  }

  if (variant === "dark") {
    return (
      <Link
        to={plan.ctaTo}
        className="mt-auto inline-flex h-[52px] w-full items-center justify-center rounded-full border border-white/20 bg-white/10 font-[Inter] text-[16px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/15"
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
  const isDark = plan.variant === "dark";

  const cardClass = isFeatured
    ? "bg-gradient-to-br from-brand via-brand to-brand-deep text-white shadow-[0_32px_80px_rgba(251,87,52,0.35)] hover:shadow-[0_40px_100px_rgba(251,87,52,0.42)] ring-1 ring-white/20"
    : isDark
      ? "bg-[#1D1D1F] text-white shadow-[0_24px_60px_rgba(0,0,0,0.2)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.28)] ring-1 ring-white/10"
      : "border border-black/[0.08] bg-white text-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_28px_80px_rgba(0,0,0,0.1)]";

  const textMuted = isFeatured || isDark ? "text-white/75" : "text-[#666666]";
  const checkColor = isFeatured || isDark ? "text-white" : "text-brand";

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: PRICING_EASE }}
      className={`group relative flex h-full flex-col rounded-[36px] p-[48px] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] ${cardClass} ${
        isFeatured ? "lg:min-h-[calc(100%+20px)] lg:-translate-y-[10px]" : ""
      }`}
    >
      {plan.badge && (
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/20 px-3.5 py-1.5 font-[Inter] text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
          {plan.badge}
        </span>
      )}

      <h3 className="font-[Inter] text-[32px] font-bold leading-tight tracking-[-0.02em]">
        {plan.name}
      </h3>
      <p className={`mt-3 font-[Inter] text-[18px] leading-[1.5] ${textMuted}`}>{plan.tagline}</p>

      <div className="mt-10 flex items-baseline gap-1">
        <span className="font-[Inter] text-[48px] font-extrabold leading-none tracking-[-0.03em] lg:text-[56px]">
          {price}
        </span>
        {plan.monthlyPrice !== null && (
          <span className={`font-[Inter] text-[18px] ${textMuted}`}>/month</span>
        )}
      </div>

      <ul className="mt-10 flex flex-col gap-4">
        {plan.extraLabel && (
          <li className={`font-[Inter] text-[15px] font-semibold ${textMuted}`}>
            {plan.extraLabel}
          </li>
        )}
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={18} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${checkColor}`} />
            <span className="font-[Inter] text-[17px] leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <PlanCta plan={plan} variant={plan.variant} />
      </div>

      {isFeatured && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[36px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)" }}
          aria-hidden="true"
        />
      )}
    </motion.article>
  );
}

export function PricingCards({ billing }: PricingCardsProps) {
  return (
    <PricingSection id="plans" className={`${sectionSpacing} pb-0`}>
      <div className="grid grid-cols-1 items-stretch gap-[40px] md:grid-cols-2 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, index) => (
          <PricingCard key={plan.id} plan={plan} billing={billing} index={index} />
        ))}
      </div>
    </PricingSection>
  );
}
