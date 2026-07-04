import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedPOSProps = {
  assemble: number;
  glowing?: boolean;
  floating?: boolean;
};

function HardwareReceipt({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ x: (1 - progress) * -40, opacity: progress }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-12 w-16 rounded-[8px] bg-deep-gray md:h-14 md:w-[72px]">
        <div className="mx-auto mt-1.5 h-0.5 w-10 rounded-full bg-quiet-dot/40" />
        <div className="mt-2 h-6 w-full rounded-b-[6px] bg-primary-ink/80" />
      </div>
      <div className="mt-0.5 h-4 w-11 rounded-b-[4px] bg-cool-wash" />
    </motion.div>
  );
}

function HardwareScanner({ progress }: { progress: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={{ x: (1 - progress) * 40, opacity: progress }}
      transition={{ duration: 0.01 }}
      aria-hidden="true"
    >
      <div className="h-11 w-9 rounded-[6px] bg-deep-gray md:h-12 md:w-10">
        <div className="mx-auto mt-2 h-1.5 w-5 rounded-sm bg-electric-blue/50" />
      </div>
      <div className="mt-0.5 h-7 w-2 rounded-full bg-hairline" />
    </motion.div>
  );
}

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false, floating = false }, ref) {
    const reduce = useReducedMotion();
    const hw = Math.min(1, Math.max(0, (assemble - 0.3) / 0.7));

    return (
      <div ref={ref} className="relative flex flex-col items-center">
        <div className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 md:-left-16">
          <HardwareReceipt progress={hw} />
        </div>
        <div className="absolute -right-12 top-1/2 z-10 -translate-y-1/2 md:-right-14">
          <HardwareScanner progress={hw} />
        </div>

        <motion.div
          animate={{
            opacity: assemble,
            scale: 0.75 + assemble * 0.25,
          }}
          transition={{ duration: 0.01 }}
          style={{ willChange: "transform" }}
        >
          <motion.div
            animate={floating && !reduce ? { y: [0, -3, 0] } : { y: 0 }}
            transition={
              floating && !reduce
                ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            {/* Optional customer display — subtle, behind */}
            <div
              className="absolute -top-6 left-1/2 h-14 w-28 -translate-x-1/2 rounded-[10px] border border-hairline/60 bg-canvas/70 opacity-60 md:-top-7 md:h-16 md:w-32"
              aria-hidden="true"
            />

            <motion.div
              className="relative z-20 flex h-[200px] w-[200px] items-center justify-center rounded-[20px] border border-hairline bg-canvas md:h-[240px] md:w-[240px] lg:h-[280px] lg:w-[280px]"
              animate={{
                boxShadow: glowing
                  ? "0 0 48px rgba(255,110,20,0.22)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.35 }}
            >
              <div className="px-4 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary-ink text-paper md:h-14 md:w-14">
                  <span className="font-sf-pro-display text-[22px] font-semibold md:text-[26px]">
                    C
                  </span>
                </div>
                <p className="text-[12px] font-medium text-mid-gray md:text-[13px]">
                  POS Placeholder
                </p>
                <p className="mt-0.5 text-[10px] text-quiet-dot">Replace image</p>
              </div>
            </motion.div>

            <div
              className="mx-auto mt-1.5 h-2 w-28 rounded-[4px] bg-deep-gray/70 md:w-32"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
