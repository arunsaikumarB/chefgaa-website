import { Link } from "react-router-dom";
import { PricingReveal, PricingSection } from "./PricingLayout";

export function PricingCTA() {
  return (
    <PricingSection className="pb-[80px] pt-[80px] md:pb-[120px] md:pt-[120px] lg:pb-[160px] lg:pt-[160px]">
      <PricingReveal>
        <div className="flex flex-col items-center rounded-[32px] border border-black/[0.06] bg-white px-6 py-16 text-center shadow-[0_16px_50px_rgba(0,0,0,0.04)] md:px-12 md:py-20">
          <h2 className="max-w-[720px] font-[Inter] text-[40px] font-bold leading-tight tracking-[-0.03em] text-[#111111] md:text-[56px]">
            Ready to grow your restaurant?
          </h2>
          <p className="mt-5 max-w-[520px] font-[Inter] text-[18px] leading-[1.6] text-[#666666] md:text-[22px]">
            Start your free trial today.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-[48px] items-center justify-center rounded-full bg-brand px-8 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_8px_24px_rgba(251,87,52,0.22)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(251,87,52,0.28)]"
            >
              Request Demo
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-[48px] items-center justify-center rounded-full border border-black/[0.12] bg-white px-8 font-[Inter] text-[16px] font-semibold text-[#111111] transition-all duration-300 hover:scale-[1.03] hover:border-black/[0.2]"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </PricingReveal>
    </PricingSection>
  );
}
