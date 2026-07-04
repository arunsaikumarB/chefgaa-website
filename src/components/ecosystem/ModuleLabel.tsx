import { motion } from "framer-motion";
import type { StoryModule } from "./features";

type ModuleLabelProps = {
  module: StoryModule;
  visible: boolean;
  highlighted?: boolean;
  dimmed?: boolean;
  onHover?: (id: string | null) => void;
};

export function ModuleLabel({
  module,
  visible,
  highlighted = false,
  dimmed = false,
  onHover,
}: ModuleLabelProps) {
  const Icon = module.icon;

  return (
    <motion.div
      data-ecosystem-module={module.id}
      className="pointer-events-auto max-w-[170px] select-none text-center"
      style={{ willChange: "transform, opacity" }}
      initial={false}
      animate={{
        opacity: visible ? (dimmed ? 0.35 : 1) : 0,
        scale: visible ? (highlighted ? 1.06 : 1) : 0.88,
        y: visible ? 0 : 10,
      }}
      transition={{
        opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        scale: { type: "spring", stiffness: 320, damping: 28 },
        y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      onMouseEnter={() => onHover?.(module.id)}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.(module.id)}
      onBlur={() => onHover?.(null)}
      tabIndex={0}
      role="article"
      aria-label={module.title}
    >
      <motion.div
        className={`mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-full ${
          highlighted ? "bg-ember/12 text-ember" : "bg-canvas/80 text-primary-ink"
        }`}
        animate={{
          boxShadow: highlighted
            ? "0 0 20px rgba(255,110,20,0.25)"
            : "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
      </motion.div>
      <h3 className="font-sf-pro-display text-[15px] font-semibold leading-tight text-primary-ink">
        {module.title}
      </h3>
      <p className="mt-1 text-[13px] leading-[1.45] text-mid-gray">{module.line}</p>
    </motion.div>
  );
}
