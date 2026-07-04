import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemModule, IconAnimation } from "./features";

type EcosystemFeatureCardProps = {
  module: EcosystemModule;
  visible: boolean;
  dimmed: boolean;
  highlighted: boolean;
  related?: boolean;
  floating?: boolean;
  emergeFrom?: { x: number; y: number };
  onHover: (id: string | null) => void;
  className?: string;
  layout?: "orbit" | "stack";
};

function IconMicroAnimation({
  animation,
  children,
  active,
}: {
  animation: IconAnimation;
  children: ReactNode;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  const map: Record<
    IconAnimation,
    { animate: Record<string, number | number[]>; transition: object }
  > = {
    "megaphone-wiggle": {
      animate: active ? { rotate: [-5, 5, -3, 0] } : {},
      transition: { duration: 0.45 },
    },
    "cube-rotate": {
      animate: active ? { rotateY: [0, 180, 360] } : {},
      transition: { duration: 1.1, repeat: active ? Infinity : 0, repeatDelay: 1 },
    },
    "bars-animate": {
      animate: active ? { y: [0, -2, 0] } : {},
      transition: { duration: 0.5, repeat: active ? 2 : 0 },
    },
    "globe-rotate": {
      animate: active ? { rotate: [0, 12, -12, 0] } : {},
      transition: { duration: 1.4, repeat: active ? Infinity : 0, repeatDelay: 0.5 },
    },
    "calendar-flip": {
      animate: active ? { rotateX: [0, 18, 0] } : {},
      transition: { duration: 0.55 },
    },
    steam: {
      animate: active ? { y: [0, -2, 0], opacity: [1, 0.75, 1] } : {},
      transition: { duration: 1.4, repeat: active ? Infinity : 0 },
    },
    "users-pulse": {
      animate: active ? { scale: [1, 1.1, 1] } : {},
      transition: { duration: 0.7, repeat: active ? 2 : 0 },
    },
    "badge-shine": {
      animate: active ? { scale: [1, 1.08, 1] } : {},
      transition: { duration: 0.6 },
    },
    "phone-float": {
      animate: active ? { y: [0, -3, 0] } : {},
      transition: { duration: 1.2, repeat: active ? Infinity : 0 },
    },
    "card-pulse": {
      animate: active ? { scale: [1, 1.06, 1] } : {},
      transition: { duration: 0.8, repeat: active ? 2 : 0 },
    },
    default: { animate: {}, transition: {} },
  };

  const cfg = map[animation] ?? map.default;
  return (
    <motion.div animate={cfg.animate} transition={cfg.transition} style={{ willChange: "transform" }}>
      {children}
    </motion.div>
  );
}

export const EcosystemFeatureCard = forwardRef<HTMLDivElement, EcosystemFeatureCardProps>(
  function EcosystemFeatureCard(
    {
      module,
      visible,
      dimmed,
      highlighted,
      related = false,
      floating = false,
      emergeFrom,
      onHover,
      className = "",
      layout = "orbit",
    },
    ref
  ) {
    const reduce = useReducedMotion();
    const Icon = module.icon;
    const isPrimary = module.tier === "primary";

    const sizeClass =
      layout === "stack"
        ? "h-auto w-full max-w-[220px]"
        : isPrimary
          ? "h-[110px] w-[220px]"
          : "h-[95px] w-[180px]";

    const emergeX = emergeFrom ? (emergeFrom.x - module.x) * 2.2 : 0;
    const emergeY = emergeFrom ? (emergeFrom.y - module.y) * 2.2 : 0;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={module.id}
        role="article"
        aria-label={module.title}
        tabIndex={0}
        className={`${sizeClass} flex flex-col justify-center rounded-[24px] border border-hairline/50 bg-paper/90 px-[18px] py-3 backdrop-blur-md ${className}`}
        style={{
          boxShadow: highlighted
            ? "0 16px 40px rgba(255,110,20,0.14), 0 4px 16px rgba(0,0,0,0.05)"
            : "0 2px 16px rgba(0,0,0,0.04)",
          willChange: "transform, opacity",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.5 : related ? 0.85 : isPrimary ? 1 : 0.88) : 0,
          scale: visible ? (highlighted ? 1.03 : 1) : isPrimary ? 0.85 : 0.7,
          x: visible ? (floating && !reduce ? [0, 0, 0] : 0) : emergeX,
          y: visible
            ? floating && !reduce
              ? [0, -2, 0]
              : 0
            : emergeY + 16,
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { type: "spring", stiffness: 280, damping: 24 },
          x: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          y: floating && !reduce && visible
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => onHover(module.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(module.id)}
        onBlur={() => onHover(null)}
      >
        <IconMicroAnimation
          animation={module.iconAnimation}
          active={highlighted || (visible && floating)}
        >
          <div
            className={`mb-2 flex h-7 w-7 items-center justify-center rounded-[8px] ${
              highlighted ? "bg-ember/10 text-ember" : "bg-canvas text-primary-ink"
            }`}
          >
            <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
          </div>
        </IconMicroAnimation>
        <h3 className="font-sf-pro-display text-[15px] font-semibold leading-tight text-primary-ink md:text-[18px]">
          {module.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-[1.35] text-mid-gray md:text-[13px]">
          {module.description}
        </p>
      </motion.article>
    );
  }
);
