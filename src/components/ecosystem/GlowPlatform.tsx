import { motion } from "framer-motion";

type GlowPlatformProps = {
  visible: boolean;
  breathing?: boolean;
};

export function GlowPlatform({ visible, breathing: _breathing = false }: GlowPlatformProps) {

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 22, duration: 0.9 }}
      aria-hidden="true"
    >
      <div
        className="h-[min(480px,34vw)] w-[min(480px,34vw)] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,110,20,0.18) 0%, rgba(0,113,227,0.07) 38%, transparent 70%)",
          filter: "blur(36px)",
          opacity: 0.3,
        }}
      />
      <div
        className="absolute inset-[18%] rounded-full border border-ember/[0.07] bg-paper/25 backdrop-blur-sm"
        style={{ boxShadow: "0 16px 56px rgba(255,110,20,0.12)" }}
      />
    </motion.div>
  );
}
