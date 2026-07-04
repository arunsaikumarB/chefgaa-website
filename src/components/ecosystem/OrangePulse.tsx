import { motion, useReducedMotion } from "framer-motion";

type OrangePulseProps = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  active: boolean;
};

export function OrangePulse({ from, to, active }: OrangePulseProps) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;

  return (
    <motion.div
      className="pointer-events-none absolute z-[45] h-3 w-3 rounded-full bg-ember"
      style={{
        left: from.x,
        top: from.y,
        marginLeft: -6,
        marginTop: -6,
        boxShadow: "0 0 12px rgba(255,110,20,0.9)",
      }}
      initial={{ left: from.x, top: from.y, opacity: 1, scale: 1 }}
      animate={{
        left: to.x,
        top: to.y,
        opacity: [1, 1, 0],
        scale: [1, 1.2, 0.4],
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}

type PosPulseProps = {
  active: boolean;
  x: number;
  y: number;
};

export function PosPulse({ active, x, y }: PosPulseProps) {
  const reduce = useReducedMotion();
  if (!active || reduce) return null;

  return (
    <motion.div
      className="pointer-events-none absolute z-[45] rounded-full border border-ember/40 bg-ember/20"
      style={{ left: x, top: y, x: "-50%", y: "-50%" }}
      initial={{ width: 12, height: 12, opacity: 0.8 }}
      animate={{ width: 80, height: 80, opacity: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      aria-hidden="true"
    />
  );
}
