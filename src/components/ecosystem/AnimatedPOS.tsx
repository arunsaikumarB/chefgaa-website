import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

function HardwareReceipt() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className="h-16 w-20 rounded-[10px] bg-deep-gray shadow-sm md:h-20 md:w-24">
        <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-quiet-dot/40" />
        <div className="mt-3 h-8 w-full rounded-b-[8px] bg-primary-ink/80" />
      </div>
      <div className="mt-1 h-6 w-14 rounded-b-[6px] bg-cool-wash" />
    </div>
  );
}

function HardwareScanner() {
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      <div className="h-14 w-10 rounded-[8px] bg-deep-gray md:h-16 md:w-12">
        <div className="mx-auto mt-3 h-2 w-6 rounded-sm bg-electric-blue/60" />
      </div>
      <div className="mt-1 h-10 w-3 rounded-full bg-hairline" />
    </div>
  );
}

function HardwareDrawer() {
  return (
    <div
      className="mx-auto mt-2 h-3 w-32 rounded-[6px] bg-deep-gray/80 md:w-40"
      aria-hidden="true"
    />
  );
}

function HardwareDisplay() {
  return (
    <div
      className="absolute -top-8 left-1/2 h-20 w-36 -translate-x-1/2 rounded-[12px] border border-hairline bg-canvas/80 backdrop-blur-sm md:-top-10 md:h-24 md:w-44"
      aria-hidden="true"
    >
      <div className="flex h-full items-center justify-center text-[10px] font-medium text-mid-gray md:text-[11px]">
        Customer Display
      </div>
    </div>
  );
}

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ visible, glowing = false, floating = false }, ref) {
    const reduce = useReducedMotion();

    return (
      <div ref={ref} className="relative flex flex-col items-center">
        {/* Hardware — left printer */}
        <motion.div
          className="absolute -left-[72px] top-1/2 z-10 -translate-y-1/2 md:-left-[96px]"
          initial={{ opacity: 0, scale: 0.8, x: -10 }}
          animate={
            visible
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 0.8, x: -10 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.05 }}
        >
          <HardwareReceipt />
        </motion.div>

        {/* Hardware — right scanner */}
        <motion.div
          className="absolute -right-[56px] top-1/2 z-10 -translate-y-1/2 md:-right-[72px]"
          initial={{ opacity: 0, scale: 0.8, x: 10 }}
          animate={
            visible
              ? { opacity: 1, scale: 1, x: 0 }
              : { opacity: 0, scale: 0.8, x: 10 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
        >
          <HardwareScanner />
        </motion.div>

        {/* Customer display behind */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.75, rotateX: 10 }}
          animate={
            visible
              ? { opacity: 1, scale: 1, rotateX: 0 }
              : { opacity: 0, scale: 0.75, rotateX: 10 }
          }
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
          style={{ perspective: 800, transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <motion.div
            animate={
              floating && !reduce
                ? { y: [0, -3, 0] }
                : { y: 0 }
            }
            transition={
              floating && !reduce
                ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <HardwareDisplay />

            {/* POS placeholder — 620×620 desktop, scales down */}
            <motion.div
              className="relative z-20 flex h-[280px] w-[280px] items-center justify-center rounded-[28px] border border-hairline bg-canvas md:h-[420px] md:w-[420px] lg:h-[520px] lg:w-[520px] xl:h-[620px] xl:w-[620px]"
              animate={
                glowing
                  ? { boxShadow: "0 0 60px rgba(255,110,20,0.25)" }
                  : { boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }
              }
              transition={{ duration: 0.4 }}
            >
              <div className="text-center px-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[16px] bg-primary-ink text-paper md:h-20 md:w-20">
                  <span className="font-sf-pro-display text-[28px] font-semibold md:text-[36px]">
                    C
                  </span>
                </div>
                <p className="text-[14px] font-medium text-mid-gray md:text-[17px]">
                  POS Image Placeholder
                </p>
                <p className="mt-1 text-[12px] text-quiet-dot">
                  620 × 620 — replace manually
                </p>
              </div>
            </motion.div>

            <HardwareDrawer />
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
