import { forwardRef } from "react";
import { motion } from "framer-motion";
import { POS_IMAGE } from "./features";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

/**
 * Center hero — the rendered Chefgaa hardware, background removed, floating
 * directly on the section with a soft shadow and hover glow.
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
        <motion.img
          src={POS_IMAGE}
          alt="Chefgaa POS terminal with receipt printer, cash drawer, and barcode scanner"
          draggable={false}
          style={{ width: 660, height: "auto" }}
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.82,
            filter: glowing
              ? "drop-shadow(0 26px 40px rgba(0,0,0,0.28)) drop-shadow(0 0 46px rgba(255,110,20,0.35))"
              : "drop-shadow(0 22px 34px rgba(0,0,0,0.20))",
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    );
  }
);
