import { forwardRef } from "react";
import { motion } from "framer-motion";
import { HardwareGroup } from "./HardwareGroup";

type AnimatedPOSProps = {
  assemble: number;
  glowing?: boolean;
  floating?: boolean;
};

/** Empty placeholder — replace with final rendered POS image */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ assemble, glowing = false, floating = false }, ref) {
    return (
      <div ref={ref} className="relative h-[min(620px,42vw)] w-[min(620px,42vw)] min-h-[320px] min-w-[320px]">
        <HardwareGroup visible={assemble > 0.5} />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: assemble,
            scale: 0.75 + assemble * 0.25,
            y: floating ? [0, -3, 0] : 0,
          }}
          transition={{
            opacity: { duration: 0.01 },
            scale: { duration: 0.01 },
            y: floating ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined,
          }}
          style={{ willChange: "transform" }}
        >
          <motion.div
            className="flex h-full w-full items-center justify-center rounded-[24px] border-2 border-dashed border-hairline/70 bg-canvas/30"
            animate={{
              boxShadow: glowing
                ? "0 0 64px rgba(255,110,20,0.22)"
                : "0 8px 32px rgba(0,0,0,0.04)",
            }}
            aria-label="POS device placeholder"
          >
            <div className="text-center px-6">
              <p className="text-[15px] font-medium text-mid-gray">POS Image Placeholder</p>
              <p className="mt-1 text-[13px] text-quiet-dot">Replace with your rendered asset</p>
              <p className="mt-3 text-[11px] text-quiet-dot">620 × 620</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
);
