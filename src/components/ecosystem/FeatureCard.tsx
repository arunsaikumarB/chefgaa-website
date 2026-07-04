import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemModule, IconAnimation } from "./features";
import type { LayoutPoint } from "./layout";

type EcosystemFeatureCardProps = {
  module: EcosystemModule;
  visible: boolean;
  dimmed: boolean;
  highlighted: boolean;
  related?: boolean;
  emergeFrom?: LayoutPoint;
  onHover: (id: string | null) => void;
  className?: string;
  layout?: "fixed" | "stack";
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
      animate: active ? { y: [0, -2, 0] } : {},
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
      emergeFrom,
      onHover,
      className = "",
      layout = "fixed",
    },
    ref
  ) {
    const Icon = module.icon;
    const isPrimary = module.tier === "primary";

    const sizeStyle =
      layout === "stack"
        ? { width: "100%", maxWidth: 220, height: "auto", minHeight: 110 }
        : isPrimary
          ? { width: 220, height: 110, maxWidth: 220, maxHeight: 110 }
          : { width: 180, height: 95, maxWidth: 180, maxHeight: 95 };

    const emergeX = emergeFrom ? emergeFrom.x - module.position.x : 0;
    const emergeY = emergeFrom ? emergeFrom.y - module.position.y : 0;

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={module.id}
        role="article"
        aria-label={module.title}
        tabIndex={0}
        className={`flex shrink-0 flex-col justify-center overflow-hidden rounded-[24px] border border-hairline/50 bg-paper/95 px-[18px] py-3 backdrop-blur-md ${className}`}
        style={{
          ...sizeStyle,
          boxShadow: highlighted
            ? "0 16px 40px rgba(255,110,20,0.14), 0 4px 16px rgba(0,0,0,0.05)"
            : "0 2px 16px rgba(0,0,0,0.04)",
          willChange: "transform, opacity",
        }}
        initial={false}
        animate={{
          opacity: visible ? (dimmed ? 0.5 : related ? 0.9 : isPrimary ? 1 : 0.92) : 0,
          scale: visible ? (highlighted ? 1.03 : 1) : isPrimary ? 0.92 : 0.85,
          x: visible ? 0 : emergeX,
          y: visible ? 0 : emergeY + 12,
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { type: "spring", stiffness: 280, damping: 24 },
          x: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        }}
        onMouseEnter={() => onHover(module.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(module.id)}
        onBlur={() => onHover(null)}
      >
        <IconMicroAnimation animation={module.iconAnimation} active={highlighted}>
          <div
            className={`mb-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] ${
              highlighted ? "bg-ember/10 text-ember" : "bg-canvas text-primary-ink"
            }`}
          >
            <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
          </div>
        </IconMicroAnimation>
        <h3 className="truncate font-sf-pro-display text-[16px] font-semibold leading-tight text-primary-ink">
          {module.title}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-[1.3] text-mid-gray">
          {module.description}
        </p>
      </motion.article>
    );
  }
);
