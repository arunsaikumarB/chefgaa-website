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
      initial={{ scale: 0.6, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="h-[380px] w-[380px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,110,20,0.14) 0%, rgba(255,110,20,0.04) 45%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={
          breathing && !reduce ? { opacity: [0.3, 0.5, 0.3] } : { opacity: 0.35 }
        }
        transition={
          breathing && !reduce
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      />
    </motion.div>
  );
}
