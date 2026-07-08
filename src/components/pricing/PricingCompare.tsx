import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Minus } from "lucide-react";
import { COMPARE_FEATURES, type CompareCell, type PlanTier } from "./pricingData";
import { PRICING_EASE, PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

const PLAN_LABELS: { id: PlanTier; label: string }[] = [
  { id: "starter", label: "Starter" },
  { id: "professional", label: "Professional" },
  { id: "enterprise", label: "Enterprise" },
];

function CompareValue({ value, highlight }: { value: CompareCell; highlight?: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
          highlight ? "bg-brand/10 text-brand" : "bg-[#F5F5F5] text-brand"
        }`}
      >
        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }
  if (value === "unlimited") {
    return (
      <span
        className={`font-[Inter] text-[14px] font-bold ${highlight ? "text-brand" : "text-[#111111]"}`}
      >
        Unlimited
      </span>
    );
  }
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center text-[#D0D0D0]">
      <Minus size={16} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function CompareGroup({
  feature,
  activePlan,
  defaultOpen,
}: {
  feature: (typeof COMPARE_FEATURES)[0];
  activePlan: PlanTier;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white transition-colors duration-200 hover:border-black/[0.1]">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#FAFAFA] md:px-8"
      >
        <span className="font-[Inter] text-[18px] font-semibold text-[#111111]">{feature.name}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-[#888888] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: PRICING_EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-4 border-t border-black/[0.05] px-6 py-5 md:px-8">
              {PLAN_LABELS.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col items-center gap-2 rounded-xl py-3 transition-colors duration-200 ${
                    activePlan === plan.id ? "bg-[#FFF7F3]" : ""
                  }`}
                >
                  <span
                    className={`font-[Inter] text-[12px] font-bold uppercase tracking-[0.08em] ${
                      activePlan === plan.id ? "text-brand" : "text-[#999999]"
                    }`}
                  >
                    {plan.label}
                  </span>
                  <CompareValue
                    value={feature[plan.id]}
                    highlight={activePlan === plan.id}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function PricingCompare() {
  const [activePlan, setActivePlan] = useState<PlanTier>("professional");

  return (
    <PricingSection className={sectionSpacing}>
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[48px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-[64px]">
          Compare plans
        </h2>
      </PricingReveal>

      <PricingReveal delay={0.08} className="mt-14">
        <div className="sticky top-[88px] z-20 mx-auto flex max-w-[560px] items-center justify-center rounded-full border border-black/[0.06] bg-white/95 p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md">
          {PLAN_LABELS.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActivePlan(plan.id)}
              className={`relative flex-1 rounded-full px-4 py-3 font-[Inter] text-[14px] font-semibold transition-colors duration-300 md:text-[15px] ${
                activePlan === plan.id ? "text-white" : "text-[#666666] hover:text-[#111111]"
              }`}
            >
              {activePlan === plan.id && (
                <motion.span
                  layoutId="compare-plan-tab"
                  className="absolute inset-0 rounded-full bg-[#111111]"
                  transition={{ duration: 0.3, ease: PRICING_EASE }}
                />
              )}
              <span className="relative z-10">{plan.label}</span>
            </button>
          ))}
        </div>
      </PricingReveal>

      <div className="mx-auto mt-10 max-w-[800px] space-y-3">
        {COMPARE_FEATURES.map((feature, index) => (
          <PricingReveal key={feature.name} delay={index * 0.03}>
            <CompareGroup
              feature={feature}
              activePlan={activePlan}
              defaultOpen={index < 3}
            />
          </PricingReveal>
        ))}
      </div>
    </PricingSection>
  );
}
