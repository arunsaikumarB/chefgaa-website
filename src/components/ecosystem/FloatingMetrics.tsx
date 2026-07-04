import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { METRICS } from "./features";

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce || target === 0) {
      setVal(target);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const dur = 1400;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduce]);

  return val;
}

export function FloatingMetrics({ active }: { active: boolean }) {
  return (
    <motion.div
      className="relative z-30 mx-auto mt-8 flex w-full max-w-[900px] flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-full border border-black/[0.05] bg-paper/80 px-8 py-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md md:mt-10"
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {METRICS.map((m) => (
        <MetricItem key={m.label} metric={m} active={active} />
      ))}
    </motion.div>
  );
}

function MetricItem({
  metric,
  active,
}: {
  metric: (typeof METRICS)[number];
  active: boolean;
}) {
  const count = useCountUp("value" in metric ? metric.value : 0, active);

  return (
    <div className="text-center">
      <p className="font-sf-pro-display text-[26px] font-bold tracking-tight text-[#111111] md:text-[32px]">
        {"text" in metric && metric.text ? (
          metric.text
        ) : (
          <>
            {count}
            {metric.suffix}
          </>
        )}
      </p>
      <p className="mt-0.5 text-[13px] text-mid-gray md:text-[14px]">{metric.label}</p>
    </div>
  );
}
