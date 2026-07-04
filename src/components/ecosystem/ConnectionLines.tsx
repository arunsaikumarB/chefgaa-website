import { useReducedMotion } from "framer-motion";
import { CANVAS, POS, PRIMARY_ORDER, SECONDARY_ORDER, buildCurvePath, getModule } from "./features";

type ConnectionLinesProps = {
  primaryProgress: Record<string, number>;
  secondaryProgress: Record<string, number>;
  visible: boolean;
};

export function ConnectionLines({
  primaryProgress,
  secondaryProgress,
  visible,
}: ConnectionLinesProps) {
  const reduce = useReducedMotion();
  if (!visible || reduce) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={CANVAS.width}
      height={CANVAS.height}
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      aria-hidden="true"
    >
      {PRIMARY_ORDER.map((id) => {
        const mod = getModule(id);
        if (!mod) return null;
        const pathD = buildCurvePath(POS.x, POS.y, mod.x, mod.y);
        const progress = primaryProgress[id] ?? 0;
        return (
          <WiringPath key={`p-${id}`} pathD={pathD} progress={progress} />
        );
      })}

      {SECONDARY_ORDER.map((id) => {
        const mod = getModule(id);
        if (!mod?.parentId) return null;
        const parent = getModule(mod.parentId);
        if (!parent) return null;
        const pathD = buildCurvePath(parent.x, parent.y, mod.x, mod.y, 0.1);
        const progress = secondaryProgress[id] ?? 0;
        return (
          <WiringPath key={`s-${id}`} pathD={pathD} progress={progress} subtle />
        );
      })}
    </svg>
  );
}

function WiringPath({
  pathD,
  progress,
  subtle = false,
}: {
  pathD: string;
  progress: number;
  subtle?: boolean;
}) {
  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke={subtle ? "rgba(200,200,210,0.35)" : "rgba(200,200,210,0.45)"}
        strokeWidth={1}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,110,20,0.22)"
        strokeWidth={subtle ? 0.75 : 1}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        style={{ willChange: "stroke-dashoffset" }}
      />
    </g>
  );
}
