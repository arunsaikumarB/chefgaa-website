import { motion } from "framer-motion";
import type { BillingPeriod } from "./pricingData";
import { PRICING_EASE } from "./PricingShell";

type BillingToggleProps = {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
};

export function BillingToggle({ value, onChange }: BillingToggleProps) {
  const yearly = value === "yearly";

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className="relative flex items-center rounded-full border border-black/[0.08] bg-[#F7F7F7] p-1.5">
        <motion.span
          layout
          transition={{ duration: 0.3, ease: PRICING_EASE }}
          className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          style={{ left: yearly ? "calc(50% + 3px)" : "6px" }}
        />
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={`relative z-10 w-[120px] rounded-full py-2.5 font-[Inter] text-[15px] font-semibold transition-colors duration-300 ${
            !yearly ? "text-[#111111]" : "text-[#888888]"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onChange("yearly")}
          className={`relative z-10 w-[120px] rounded-full py-2.5 font-[Inter] text-[15px] font-semibold transition-colors duration-300 ${
            yearly ? "text-[#111111]" : "text-[#888888]"
          }`}
        >
          Yearly
        </button>
      </div>
      <motion.span
        initial={false}
        animate={{ opacity: yearly ? 1 : 0.5 }}
        className="font-[Inter] text-[13px] font-bold uppercase tracking-[0.1em] text-brand"
      >
        Save 20%
      </motion.span>
    </div>
  );
}
