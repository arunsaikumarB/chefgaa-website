import { motion, useReducedMotion } from "framer-motion";

type GlowPlatformProps = {
  visible: boolean;
  breathing?: boolean;
};

export function GlowPlatform({ visible, breathing = false }: GlowPlatformProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.8 }}
      aria-hidden="true"
    >
      <motion.div
        className="h-[min(520px,36vw)] w-[min(520px,36vw)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,110,20,0.16) 0%, rgba(0,113,227,0.06) 35%, transparent 68%)",
          filter: "blur(32px)",
        }}
        animate={
          breathing && !reduce
            ? { opacity: [0.22, 0.36, 0.22] }
            : { opacity: 0.28 }
        }
        transition={
          breathing && !reduce
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
      <div
        className="absolute inset-[20%] rounded-full border border-ember/[0.08] bg-paper/30"
        style={{ boxShadow: "0 12px 48px rgba(255,110,20,0.1)" }}
      />
    </motion.div>
  );
}
