import { motion, useReducedMotion } from "framer-motion";

type GlowPlatformProps = {
  visible: boolean;
  breathing?: boolean;
};

export function GlowPlatform({ visible, breathing = false }: GlowPlatformProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={
        visible
          ? { scale: 1, opacity: 1 }
          : { scale: 0, opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.8 }}
      aria-hidden="true"
    >
      <motion.div
        className="h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,110,20,0.18) 0%, rgba(255,110,20,0.06) 40%, transparent 70%)",
          filter: "blur(24px)",
          willChange: "opacity, transform",
        }}
        animate={
          breathing && !reduce
            ? { opacity: [0.25, 0.4, 0.25] }
            : { opacity: 0.3 }
        }
        transition={
          breathing && !reduce
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
      <div
        className="absolute inset-[18%] rounded-full border border-ember/10 bg-paper/40 backdrop-blur-sm"
        style={{ boxShadow: "0 8px 40px rgba(255,110,20,0.12)" }}
      />
    </motion.div>
  );
}
