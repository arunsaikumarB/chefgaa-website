import { Check, Minus } from "lucide-react";
import { COMPARE_ROWS, type CompareCell } from "./pricingData";
import { PricingReveal, PricingSection } from "./PricingLayout";

function CompareValue({ value }: { value: CompareCell }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center text-brand" aria-label="Included">
        <Check size={20} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  if (value === "unlimited") {
    return (
      <span className="font-[Inter] text-[15px] font-semibold text-[#111111]">Unlimited</span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center text-[#CCCCCC]" aria-label="Not included">
      <Minus size={20} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

export function PricingCompare() {
  return (
    <PricingSection className="pt-[80px] md:pt-[120px] lg:pt-[160px]">
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[40px] font-bold leading-tight tracking-[-0.03em] text-[#111111] md:text-[56px]">
          Compare plans
        </h2>
      </PricingReveal>

      <PricingReveal delay={0.08} className="mt-12 md:mt-16">
        <div className="overflow-x-auto rounded-[24px] border border-black/[0.06] bg-white shadow-[0_16px_50px_rgba(0,0,0,0.04)]">
          <table className="w-full min-w-[720px] border-collapse">
            <thead className="sticky top-0 z-10 bg-[#FAFAFA]">
              <tr className="border-b border-black/[0.06]">
                <th className="px-6 py-5 text-left font-[Inter] text-[14px] font-bold uppercase tracking-[0.1em] text-[#999999]">
                  Feature
                </th>
                <th className="px-6 py-5 text-center font-[Inter] text-[16px] font-semibold text-[#111111]">
                  Starter
                </th>
                <th className="px-6 py-5 text-center font-[Inter] text-[16px] font-semibold text-[#111111]">
                  Professional
                </th>
                <th className="px-6 py-5 text-center font-[Inter] text-[16px] font-semibold text-[#111111]">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-black/[0.04] transition-colors duration-200 last:border-b-0 hover:bg-[#FAFAFA]"
                >
                  <td className="px-6 py-5 font-[Inter] text-[16px] font-medium text-[#2D2D2D]">
                    {row.feature}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <CompareValue value={row.starter} />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <CompareValue value={row.professional} />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <CompareValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PricingReveal>
    </PricingSection>
  );
}
