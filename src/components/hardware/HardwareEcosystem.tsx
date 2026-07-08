import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { ECOSYSTEM_DEVICES } from "./data";

const CENTER = { x: 50, y: 50 };

function polarToPercent(angle: number, distance: number) {
  const rad = (angle * Math.PI) / 180;
  const radius = 38 * distance;
  return {
    left: CENTER.x + radius * Math.cos(rad),
    top: CENTER.y + radius * Math.sin(rad),
  };
}

function buildCurve(sx: number, sy: number, ex: number, ey: number): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * 0.15} ${my + dx * 0.15}, ${mx + dy * 0.08} ${my - dx * 0.08}, ${ex} ${ey}`;
}

export function HardwareEcosystem() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [linesVisible, setLinesVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setLinesVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLinesVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce]);

  useEffect(() => {
    setPulseId(hoveredId);
  }, [hoveredId]);

  const endpoints = ECOSYSTEM_DEVICES.map((d) => {
    const pos = polarToPercent(d.angle, d.distance);
    return { ...d, ...pos, svg: { x: pos.left, y: pos.top } };
  });

  return (
    <section ref={sectionRef} className="bg-[#F8F9FA] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            One connected workstation
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            Every device talks to every other — designed as a single restaurant ecosystem.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 h-[min(640px,80vh)] w-full max-w-[1000px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <filter id="hw-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {endpoints.map((device) => {
              const pathD = buildCurve(CENTER.x, CENTER.y, device.svg.x, device.svg.y);
              const lit = hoveredId === device.id || pulseId === device.id;
              return (
                <g key={device.id}>
                  <path d={pathD} fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="0.4" strokeLinecap="round" />
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={lit ? "#ED3C18" : "#FA9040"}
                    strokeWidth={lit ? 0.6 : 0.35}
                    strokeOpacity={lit ? 0.7 : linesVisible ? 0.35 : 0}
                    strokeLinecap="round"
                    pathLength={1}
                    initial={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    animate={{ strokeDashoffset: linesVisible ? 0 : 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    filter={lit ? "url(#hw-glow)" : undefined}
                  />
                  {lit && !reduce && (
                    <PulseParticle pathD={pathD} />
                  )}
                </g>
              );
            })}
          </svg>

          <div
            className="absolute z-20"
            style={{
              left: `${CENTER.x}%`,
              top: `${CENTER.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              animate={
                hoveredId
                  ? { boxShadow: "0 0 48px rgba(237,60,24,0.35)" }
                  : { boxShadow: "0 0 24px rgba(250,144,64,0.2)" }
              }
              className="rounded-full"
            >
              <ProductVisual product="workstation" className="scale-75 md:scale-90" />
            </motion.div>
          </div>

          {endpoints.map((device, i) => (
            <motion.button
              key={device.id}
              type="button"
              className="absolute z-30 rounded-2xl border border-black/[0.05] bg-paper px-3 py-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)]"
              style={{
                left: `${device.left}%`,
                top: `${device.top}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHoveredId(device.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(device.id)}
              onBlur={() => setHoveredId(null)}
            >
              <span className="block text-[12px] font-semibold text-[#111111] md:text-[13px]">
                {device.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function PulseParticle({ pathD }: { pathD: string }) {
  const circleRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const circle = circleRef.current;
    if (!path || !circle) return;
    let start: number | null = null;
    const duration = 900;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const pt = path.getPointAtLength(t * path.getTotalLength());
      circle.setAttribute("cx", String(pt.x));
      circle.setAttribute("cy", String(pt.y));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [pathD]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle ref={circleRef} r="0.8" fill="#ED3C18" opacity="0.9" />
    </g>
  );
}
