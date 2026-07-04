import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Infinity, Layers, RefreshCw, Shield } from "lucide-react";
import { METRICS } from "./features";

const ICONS = {
  modules: Layers,
  unified: Check,
  sync: RefreshCw,
  infinity: Infinity,
  enterprise: Shield,
} as const;

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce || target === 0) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

function MetricItem({
  metric,
  active,
}: {
  metric: (typeof METRICS)[number];
  active: boolean;
}) {
  const count = useCountUp(metric.value, active && metric.value > 0);
  const Icon = ICONS[metric.icon];

  return (
    <div className="flex min-w-[140px] flex-col items-center gap-1.5 px-4 text-center">
      <Icon size={16} className="text-ember/70" strokeWidth={1.8} aria-hidden="true" />
      <p className="font-sf-pro-display text-[22px] font-bold tracking-tight text-[#111111]">
        {"text" in metric && metric.text ? metric.text : `${count}${metric.suffix}`}
      </p>
      <p className="text-[13px] leading-snug text-mid-gray">{metric.label}</p>
    </div>
  );
}

export function FloatingMetrics({ active }: { active: boolean }) {
  return (
    <motion.div
      className="mx-auto mt-8 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-2 gap-y-4 rounded-[28px] border border-black/[0.04] bg-paper/70 px-6 py-5 backdrop-blur-md md:mt-10 md:gap-x-4 md:px-10"
      style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.05)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Platform metrics"
    >
      {METRICS.map((m) => (
        <MetricItem key={m.label} metric={m} active={active} />
      ))}
    </motion.div>
  );
}
