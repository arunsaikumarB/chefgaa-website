import { forwardRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const WORKSTATION_IMAGE = "/ecosystem/chefgaa-workstation.png";
const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

type AnimatedPOSProps = {
  visible: boolean;
  idle?: boolean;
  onHoverChange?: (hovered: boolean) => void;
};

export const AnimatedPOS = forwardRef<HTMLDivElement, AnimatedPOSProps>(
  function AnimatedPOS({ visible, idle = false, onHoverChange }, ref) {
    const reduce = useReducedMotion();
    const [hovered, setHovered] = useState(false);

    const handleHover = (next: boolean) => {
      setHovered(next);
      onHoverChange?.(next);
    };

    const dropShadow = hovered
      ? "drop-shadow(0 40px 50px rgba(0,0,0,0.22))"
      : "drop-shadow(0 35px 45px rgba(0,0,0,0.18))";

    return (
      <motion.div
        ref={ref}
        className="relative z-[30] bg-transparent"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={
          visible
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.95, y: 30 }
        }
        transition={{ duration: 0.7, ease: ENTRANCE_EASE }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onFocus={() => handleHover(true)}
        onBlur={() => handleHover(false)}
      >
        <motion.img
          src={WORKSTATION_IMAGE}
          alt="Chefgaa POS workstation with receipt printer and barcode scanner"
          width={1560}
          height={1040}
          decoding="async"
          draggable={false}
          className="block h-auto w-[90vw] max-w-none bg-transparent object-contain md:w-[600px] lg:w-[720px] xl:w-[780px]"
          animate={idle && !reduce ? { y: [0, -4, 0] } : { y: 0 }}
          transition={
            idle && !reduce
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
          style={{
            background: "transparent",
            filter: dropShadow,
            transition: "filter 300ms ease",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    );
  }
);
