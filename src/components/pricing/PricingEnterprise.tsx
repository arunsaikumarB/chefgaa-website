import { Link } from "react-router-dom";
import { PricingReveal, PricingSection } from "./PricingLayout";

export function PricingEnterprise() {
  return (
    <PricingSection className="pt-[80px] md:pt-[120px] lg:pt-[160px]">
      <PricingReveal>
        <div className="flex flex-col items-start justify-between gap-8 rounded-[32px] border border-black/[0.06] bg-white p-8 shadow-[0_16px_50px_rgba(0,0,0,0.05)] md:flex-row md:items-center md:gap-12 lg:p-[48px]">
          <div className="max-w-[640px]">
            <h2 className="font-[Inter] text-[32px] font-bold leading-tight tracking-[-0.02em] text-[#111111] md:text-[40px]">
              Running multiple restaurants?
            </h2>
            <p className="mt-4 font-[Inter] text-[18px] leading-[1.6] text-[#666666] md:text-[22px]">
              We&apos;ll build a custom solution for your business.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex h-[48px] shrink-0 items-center justify-center rounded-full bg-brand px-8 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_8px_24px_rgba(251,87,52,0.22)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(251,87,52,0.28)]"
          >
            Request Demo
          </Link>
        </div>
      </PricingReveal>
    </PricingSection>
  );
}
