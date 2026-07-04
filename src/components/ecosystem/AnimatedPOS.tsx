import { forwardRef } from "react";
import { motion } from "framer-motion";

type CenterHubProps = {
  active: boolean;
  glowing?: boolean;
};

/** Central hub only — no image, no hardware placeholders */
export const CenterHub = forwardRef<HTMLDivElement, CenterHubProps>(
  function CenterHub({ active, glowing = false }, ref) {
    return (
      <div ref={ref} className="relative h-6 w-6" aria-hidden="true">
        <motion.div
          className="absolute inset-0 rounded-full bg-ember/70"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0,
            boxShadow: glowing
              ? "0 0 48px rgba(255,110,20,0.55), 0 0 80px rgba(255,110,20,0.2)"
              : "0 0 20px rgba(255,110,20,0.35)",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, box-shadow" }}
        />
      </div>
    );
  }
);

/** @deprecated Use CenterHub — kept for import compatibility */
export const AnimatedPOS = CenterHub;
