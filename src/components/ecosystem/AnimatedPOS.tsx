import { forwardRef } from "react";
import { motion } from "framer-motion";

const POS_HERO_SRC = "/ecosystem/pos-hero.png";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ visible, glowing = false, floating = false }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex items-center justify-center"
        style={{ width: 620, height: 620, willChange: "transform" }}
        animate={floating ? { y: [0, -3, 0] } : { y: 0 }}
        transition={
          floating ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined
        }
      >
        <motion.div
          className="relative h-full w-full"
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.75,
            filter: glowing
              ? "drop-shadow(0 0 48px rgba(255,110,20,0.35))"
              : "drop-shadow(0 16px 40px rgba(0,0,0,0.12))",
          }}
          transition={{ duration: 0.01 }}
        >
          <img
            src={POS_HERO_SRC}
            alt="Chefgaa POS terminal with receipt printer and barcode scanner"
            width={620}
            height={620}
            className="h-full w-full object-contain"
            draggable={false}
            style={{ willChange: "transform" }}
          />
        </motion.div>
      </motion.div>
    );
  }
);
