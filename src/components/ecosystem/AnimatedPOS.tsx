import { forwardRef } from "react";
import { motion } from "framer-motion";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

/** Placeholder only — replace with final rendered POS image */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ visible, glowing = false, floating = false }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex items-center justify-center"
        style={{ width: 620, height: 620, willChange: "transform" }}
        animate={
          floating
            ? { y: [0, -3, 0] }
            : { y: 0 }
        }
        transition={
          floating
            ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <motion.div
          className="flex h-full w-full items-center justify-center rounded-[32px] border border-hairline/40 bg-canvas"
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.75,
            boxShadow: glowing
              ? "0 0 64px rgba(255,110,20,0.2)"
              : "0 12px 48px rgba(0,0,0,0.06)",
          }}
          transition={{ duration: 0.01 }}
        >
          <div className="text-center px-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-primary-ink/5">
              <span className="font-sf-pro-display text-[36px] font-semibold text-mid-gray/40">
                POS
              </span>
            </div>
            <p className="text-[15px] font-medium text-mid-gray">
              Replace with rendered image
            </p>
            <p className="mt-1 text-[13px] text-quiet-dot">620 × 620 · aspect preserved</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);
