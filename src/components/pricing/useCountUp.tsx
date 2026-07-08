import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  decimals?: number;
  enabled?: boolean;
};

export function useCountUp({ end, duration = 1.8, decimals = 0, enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, enabled]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString("en-IN");

  return formatted;
}

export function CountUpStat({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const display = useCountUp({ end: value, decimals, enabled: inView });

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
