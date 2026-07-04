import { motion, useReducedMotion } from "framer-motion";

export function SectionBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      <div
        className="absolute left-1/2 top-[48%] h-[min(800px,90vw)] w-[min(800px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,110,20,0.08), transparent 45%)",
        }}
      />

      {!reduce && (
        <>
          <motion.div
            className="absolute left-[14%] top-[18%] h-56 w-56 rounded-full bg-ember/[0.04] blur-3xl"
            animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[12%] top-[32%] h-64 w-64 rounded-full bg-electric-blue/[0.04] blur-3xl"
            animate={{ x: [0, -12, 0], y: [0, 12, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[16%] left-[40%] h-48 w-48 rounded-full bg-citrus/[0.05] blur-3xl"
            animate={{ x: [0, 10, 0], y: [0, 8, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}
