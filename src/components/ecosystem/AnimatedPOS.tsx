import { forwardRef } from "react";
import { motion } from "framer-motion";
import { HardwareGroup } from "./HardwareGroup";

type AnimatedPOSProps = {
  assemble: number;
  glowing?: boolean;
  floating?: boolean;
};

/** No image — hardware hub only. Slot your POS render here later. */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false, floating = false }, ref) {
    return (
      <div ref={ref} className="relative h-[180px] w-[260px]">
        <HardwareGroup visible={assemble > 0.5} />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: assemble,
            y: floating ? [0, -3, 0] : 0,
          }}
          transition={{
            y: floating ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined,
          }}
          aria-hidden="true"
        >
          <motion.div
            className="h-3 w-3 rounded-full bg-ember/50"
            animate={{
              boxShadow: glowing
                ? "0 0 40px rgba(255,110,20,0.5)"
                : "0 0 12px rgba(255,110,20,0.25)",
            }}
          />
        </motion.div>
      </div>
    );
  }
);
