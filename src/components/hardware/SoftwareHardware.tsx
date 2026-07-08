import { useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { SOFTWARE_MODULES } from "./data";

const MODULE_POSITIONS = [
  { id: "pos", label: "POS", x: 78, y: 18 },
  { id: "inventory", label: "Inventory", x: 88, y: 38 },
  { id: "online", label: "Online Ordering", x: 85, y: 58 },
  { id: "kitchen", label: "Kitchen Display", x: 72, y: 78 },
  { id: "crm", label: "CRM", x: 50, y: 88 },
  { id: "loyalty", label: "Loyalty", x: 28, y: 78 },
  { id: "analytics", label: "Analytics", x: 15, y: 58 },
];

const CENTER = { x: 50, y: 48 };

function buildCurve(sx: number, sy: number, ex: number, ey: number): string {
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  const dx = ex - sx;
  const dy = ey - sy;
  return `M ${sx} ${sy} C ${mx - dy * 0.12} ${my + dx * 0.12}, ${mx + dy * 0.06} ${my - dx * 0.06}, ${ex} ${ey}`;
}

export function SoftwareHardware() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="bg-[#F8F9FA] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative flex items-center justify-center rounded-[32px] bg-gradient-to-br from-[#fff4f0] to-[#ffffff] p-10 md:p-14">
              <div className="relative h-[min(400px,50vw)] w-full">
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  {MODULE_POSITIONS.map((mod) => {
                    const lit = hovered === mod.id;
                    const pathD = buildCurve(CENTER.x, CENTER.y, mod.x, mod.y);
                    return (
                      <path
                        key={mod.id}
                        d={pathD}
                        fill="none"
                        stroke={lit ? "#ED3C18" : "#FA9040"}
                        strokeWidth={lit ? 0.5 : 0.3}
                        strokeOpacity={lit ? 0.6 : 0.25}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
                <div
                  className="absolute z-10"
                  style={{
                    left: `${CENTER.x}%`,
                    top: `${CENTER.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <ProductVisual product="workstation" className="scale-75 md:scale-90" floating={!reduce} />
                </div>
                {MODULE_POSITIONS.map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    className="absolute z-20 rounded-full border border-black/[0.06] bg-paper px-2.5 py-1 text-[10px] font-medium text-[#444444] shadow-sm transition-colors hover:border-[#ED3C18]/30 hover:text-[#ED3C18] md:px-3 md:text-[11px]"
                    style={{
                      left: `${mod.x}%`,
                      top: `${mod.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHovered(mod.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ED3C18]">
              Software + Hardware
            </p>
            <h2 className="mt-4 font-sf-pro-display text-[32px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[44px] lg:text-[52px]">
              One connected ecosystem.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#666666] md:text-[19px]">
              Every Chefgaa hardware device works together with{" "}
              {SOFTWARE_MODULES.join(", ")} — all powered by one intelligent platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {SOFTWARE_MODULES.map((mod) => (
                <span
                  key={mod}
                  className="rounded-full border border-black/[0.06] bg-paper px-4 py-2 text-[13px] font-medium text-[#444444]"
                >
                  {mod}
                </span>
              ))}
            </div>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#ED3C18] px-6 py-3 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Explore the Ecosystem
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
