import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./Section";
import { SectionHeading } from "./SectionHeading";

export type FaqItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FaqItem[];
  bg?: "white" | "gray";
  heading?: string;
};

/** Accordion FAQ. Rows separated by hairlines only (permitted for list rows). */
export function FAQ({ items, bg = "white", heading = "Frequently asked questions" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section bg={bg}>
      <SectionHeading title={heading} />
      <div className="border-t border-hairline">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question} className="border-b border-hairline">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-sf-pro-display text-[19px] font-semibold leading-snug md:text-[21px]">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 text-[24px] leading-none text-mid-gray transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
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
                    <p className="max-w-[760px] pb-6 text-[17px] leading-[1.47] text-mid-gray">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
