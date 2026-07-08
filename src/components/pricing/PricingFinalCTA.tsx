import { Link } from "react-router-dom";
import { PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

export function PricingFinalCTA() {
  return (
    <PricingSection className={`${sectionSpacing} pb-[120px] md:pb-[160px] lg:pb-[200px]`}>
      <PricingReveal>
        <div className="relative overflow-hidden rounded-[40px] bg-[#FFF7F3] px-6 py-16 md:px-12 md:py-20 lg:px-16">
          <div
            className="pointer-events-none absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand opacity-[0.06] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h2 className="font-[Inter] text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[56px]">
                Ready to modernize your restaurant?
              </h2>
              <p className="mt-5 font-[Inter] text-[18px] leading-[1.6] text-[#666666] md:text-[22px]">
                Join hundreds of restaurants already running on Chefgaa.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  to="/contact"
                  className="inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-10 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_12px_32px_rgba(251,87,52,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                >
                  Request Demo
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-[52px] items-center justify-center rounded-full border border-black/[0.12] bg-white px-10 font-[Inter] text-[16px] font-semibold text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[480px] lg:mx-0 lg:ml-auto">
              <img
                src="/ecosystem/chefgaa-workstation.png"
                alt="Chefgaa POS system"
                className="w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.12)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </PricingReveal>
    </PricingSection>
  );
}
