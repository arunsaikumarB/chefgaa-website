import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PRICING_FAQS } from "./pricingData";
import { PRICING_EASE, PricingReveal, PricingSection, sectionSpacing } from "./PricingShell";

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PricingSection className={sectionSpacing}>
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[48px] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#111111] md:text-[64px]">
          Frequently Asked Questions
        </h2>
      </PricingReveal>

      <div className="mx-auto mt-16 max-w-[900px] space-y-4">
        {PRICING_FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <PricingReveal key={item.question} delay={index * 0.05}>
              <div className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 p-[32px] text-left transition-colors duration-200 hover:bg-[#FAFAFA]"
                >
                  <span className="font-[Inter] text-[20px] font-semibold leading-snug text-[#111111] md:text-[22px]">
                    {item.question}
                  </span>
                  <Plus
                    size={22}
                    strokeWidth={2}
                    className={`shrink-0 text-[#888888] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: PRICING_EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-[32px] pb-[32px] font-[Inter] text-[18px] leading-[1.7] text-[#666666]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </PricingReveal>
          );
        })}
      </div>
    </PricingSection>
  );
}
