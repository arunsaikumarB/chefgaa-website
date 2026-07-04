import { forwardRef } from "react";
import { motion } from "framer-motion";
import { POS_IMAGE } from "./features";

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
            src={POS_IMAGE}
            alt="Chefgaa POS hardware — terminal, receipt printer, and barcode scanner"
            width={620}
            height={620}
            className="h-full w-full object-contain"
            style={{ background: "transparent" }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    );
  }
);
