import { forwardRef } from "react";
import { motion } from "framer-motion";
import { HardwareGroup } from "./HardwareGroup";

type AnimatedPOSProps = {
  assemble: number;
  glowing?: boolean;
  floating?: boolean;
};

/** Center hub — no image. Hardware only. Drop your POS image here later. */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false, floating = false }, ref) {
    return (
      <div ref={ref} className="relative h-[200px] w-[280px]">
        <HardwareGroup visible={assemble > 0.5} />

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: assemble,
            scale: 0.8 + assemble * 0.2,
            y: floating ? [0, -3, 0] : 0,
          }}
          transition={{
            y: floating ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 },
          }}
          style={{ willChange: "transform" }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-ember/60"
            animate={{
              boxShadow: glowing
                ? "0 0 48px rgba(255,110,20,0.45)"
                : "0 0 16px rgba(255,110,20,0.2)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    );
  }
);
