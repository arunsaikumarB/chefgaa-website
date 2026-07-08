import { motion, useReducedMotion } from "framer-motion";

type GlowPlatformProps = {
  visible: boolean;
  breathing?: boolean;
  hovered?: boolean;
};

export function GlowPlatform({
  visible,
  breathing = false,
  hovered = false,
}: GlowPlatformProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 z-[15] -translate-x-1/2 -translate-y-1/2"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <motion.div
        className="h-[min(520px,55vw)] w-[min(520px,55vw)] rounded-full md:h-[min(480px,48vw)] md:w-[min(480px,48vw)] lg:h-[min(560px,42vw)] lg:w-[min(560px,42vw)]"
        style={{
          background: "radial-gradient(circle, rgba(237,60,24,0.12) 0%, rgba(237,60,24,0.06) 42%, transparent 72%)",
          filter: "blur(100px)",
          opacity: hovered ? 0.34 : 0.25,
          transition: "opacity 300ms ease",
          transform: "translateZ(0)",
        }}
        animate={
          breathing && !reduce
            ? { scale: [1, 1.05, 1] }
            : { scale: 1 }
        }
        transition={
          breathing && !reduce
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
      />
    </motion.div>
  );
}
