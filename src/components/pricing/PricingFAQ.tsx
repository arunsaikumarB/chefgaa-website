import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PRICING_FAQS } from "./pricingData";
import { PricingReveal, PricingSection } from "./PricingLayout";

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PricingSection className="pt-[80px] md:pt-[120px] lg:pt-[160px]">
      <PricingReveal>
        <h2 className="text-center font-[Inter] text-[40px] font-bold leading-tight tracking-[-0.03em] text-[#111111] md:text-[56px]">
          Frequently asked questions
        </h2>
      </PricingReveal>

      <div className="mx-auto mt-12 max-w-[880px] space-y-4 md:mt-16">
        {PRICING_FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <PricingReveal key={item.question} delay={index * 0.05}>
              <div className="overflow-hidden rounded-[20px] border border-black/[0.06] bg-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-200 hover:bg-[#FAFAFA] md:px-8 md:py-6"
                >
                  <span className="font-[Inter] text-[18px] font-semibold leading-snug text-[#111111] md:text-[20px]">
                    {item.question}
                  </span>
                  <Plus
                    size={20}
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
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-[Inter] text-[18px] leading-[1.7] text-[#666666] md:px-8 md:pb-8">
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
