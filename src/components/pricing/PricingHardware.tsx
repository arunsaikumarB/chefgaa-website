import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { HARDWARE_ITEMS } from "./pricingData";
import { PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

export function PricingHardware() {
  return (
    <PricingSection className={sectionSpacing}>
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <PricingReveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-[520px] lg:mx-0">
            <div
              className="absolute inset-8 rounded-[32px] bg-brand/10 blur-[60px]"
              aria-hidden="true"
            />
            <img
              src="/ecosystem/chefgaa-workstation.png"
              alt="Chefgaa POS workstation"
              className="relative w-full object-contain drop-shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
              loading="lazy"
            />
          </div>
        </PricingReveal>

        <PricingReveal delay={0.1} className="order-1 lg:order-2">
          <h2 className="font-[Inter] text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#111111] md:text-[52px]">
            Built to work together.
          </h2>
          <p className="mt-6 max-w-[520px] font-[Inter] text-[18px] leading-[1.65] text-[#666666] md:text-[20px]">
            Chefgaa software and hardware are designed as one system — from front-of-house to
            kitchen to back office. Everything connects seamlessly out of the box.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {HARDWARE_ITEMS.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF7F3] text-brand">
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="font-[Inter] text-[17px] font-medium text-[#2D2D2D]">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="mt-12 inline-flex h-[52px] items-center justify-center rounded-full bg-brand px-10 font-[Inter] text-[16px] font-semibold !text-white shadow-[0_12px_32px_rgba(251,87,52,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
          >
            Request Demo
          </Link>
        </PricingReveal>
      </div>
    </PricingSection>
  );
}
