import { motion, useReducedMotion } from "framer-motion";

export function SectionBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Soft radial glow behind POS */}
      <div
        className="absolute left-1/2 top-[52%] h-[min(720px,80vw)] w-[min(720px,80vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,110,20,0.08), transparent 45%)",
        }}
      />

      {/* Subtle floating blur blobs */}
      {!reduce && (
        <>
          <motion.div
            className="absolute left-[18%] top-[22%] h-48 w-48 rounded-full bg-ember/5 blur-3xl"
            animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[14%] top-[38%] h-56 w-56 rounded-full bg-electric-blue/5 blur-3xl"
            animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[18%] left-[42%] h-40 w-40 rounded-full bg-citrus/10 blur-3xl"
            animate={{ x: [0, 8, 0], y: [0, 6, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}
