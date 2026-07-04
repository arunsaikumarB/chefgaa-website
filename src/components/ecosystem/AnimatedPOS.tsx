import { forwardRef } from "react";
import { motion } from "framer-motion";

type AnimatedPOSProps = {
  visible: boolean;
  glowing?: boolean;
  floating?: boolean;
};

/**
 * Center hero placeholder. The final rendered POS image will be dropped in
 * later — for now this is a clean, transparent anchor so the wiring and
 * layout stay centered without a visible box.
 */
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
          className="flex h-[360px] w-[360px] items-center justify-center rounded-full border border-dashed border-hairline/60"
          animate={{
            opacity: visible ? 1 : 0,
            scale: visible ? 1 : 0.75,
            boxShadow: glowing
              ? "0 0 64px rgba(255,110,20,0.18)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-[13px] font-medium text-quiet-dot">
            POS image goes here
          </span>
        </motion.div>
      </motion.div>
    );
  }
);
