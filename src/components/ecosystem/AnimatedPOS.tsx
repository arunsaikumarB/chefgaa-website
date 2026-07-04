import { forwardRef } from "react";
import { motion } from "framer-motion";

type CenterHubProps = {
  active: boolean;
  glowing?: boolean;
};

/** Glow platform + hub origin only — no placeholder image */
export const CenterHub = forwardRef<HTMLDivElement, CenterHubProps>(
  function CenterHub({ active, glowing = false }, ref) {
    return (
      <div ref={ref} className="relative h-8 w-8" aria-hidden="true">
        <motion.div
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/70"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0,
            boxShadow: glowing
              ? "0 0 48px rgba(255,110,20,0.55), 0 0 80px rgba(255,110,20,0.2)"
              : "0 0 20px rgba(255,110,20,0.35)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, box-shadow" }}
        />
      </div>
    );
  }
);
