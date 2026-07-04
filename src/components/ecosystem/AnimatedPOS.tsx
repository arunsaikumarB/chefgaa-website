import { forwardRef } from "react";
import { motion } from "framer-motion";
import { POS_IMAGE } from "./features";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

/**
 * Center hero — the rendered Chefgaa hardware on a dark showcase tile. The
 * image's black backdrop blends into the tile for a clean, premium anchor.
 */
export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ visible, glowing = false, floating = false }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex items-center justify-center"
        style={{ width: 620, height: 620, willChange: "transform" }}
        animate={floating ? { y: [0, -4, 0] } : { y: 0 }}
        transition={
          floating ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        <motion.div
          className="relative overflow-hidden rounded-[30px] ring-1 ring-white/[0.06]"
          style={{ width: 660, height: 372, backgroundColor: "#050506" }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.82,
            boxShadow: glowing
              ? "0 40px 90px rgba(0,0,0,0.30), 0 0 90px rgba(255,110,20,0.28)"
              : "0 34px 80px rgba(0,0,0,0.26)",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={POS_IMAGE}
            alt="Chefgaa POS terminal with receipt printer, cash drawer, and barcode scanner"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    );
  }
);
