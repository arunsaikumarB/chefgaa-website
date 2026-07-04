import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { EcosystemFeature, IconAnimation } from "./features";

type EcosystemFeatureCardProps = {
  feature: EcosystemFeature;
  visible: boolean;
  dimmed: boolean;
  highlighted: boolean;
  floating?: boolean;
  onHover: (id: string | null) => void;
  style?: React.CSSProperties;
  className?: string;
  layout?: "orbit" | "stack";
};

function IconMicroAnimation({
  animation,
  children,
  hovered,
}: {
  animation: IconAnimation;
  children: React.ReactNode;
  hovered: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  const animMap: Record<
    IconAnimation,
    { animate: Record<string, number | number[]>; transition: object }
  > = {
    "brain-pulse": {
      animate: hovered ? { scale: [1, 1.12, 1] } : { scale: [1, 1.05, 1] },
      transition: { duration: 1.2, repeat: Infinity },
    },
    "megaphone-wiggle": {
      animate: hovered ? { rotate: [-6, 6, -4, 0] } : { rotate: 0 },
      transition: { duration: 0.5 },
    },
    "cube-rotate": {
      animate: hovered ? { rotateY: [0, 180, 360] } : { rotateY: 0 },
      transition: { duration: 1.2, repeat: hovered ? Infinity : 0 },
    },
    "bars-animate": {
      animate: hovered ? { y: [0, -2, 0] } : { y: 0 },
      transition: { duration: 0.6, repeat: hovered ? 2 : 0 },
    },
    "globe-rotate": {
      animate: hovered ? { rotate: [0, 15, -15, 0] } : { rotate: 0 },
      transition: { duration: 1.5, repeat: hovered ? Infinity : 0 },
    },
    "calendar-flip": {
      animate: hovered ? { rotateX: [0, 20, 0] } : { rotateX: 0 },
      transition: { duration: 0.6 },
    },
    steam: {
      animate: hovered ? { y: [0, -3, 0], opacity: [1, 0.7, 1] } : { y: 0 },
      transition: { duration: 1.5, repeat: hovered ? Infinity : 0 },
    },
    "users-pulse": {
      animate: hovered ? { scale: [1, 1.08, 1] } : { scale: 1 },
      transition: { duration: 0.8, repeat: hovered ? 2 : 0 },
    },
    "badge-shine": {
      animate: hovered ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : { scale: 1 },
      transition: { duration: 0.7 },
    },
    "cart-slide": {
      animate: hovered ? { x: [0, 4, 0] } : { x: 0 },
      transition: { duration: 0.5, repeat: hovered ? 2 : 0 },
    },
    "phone-float": {
      animate: hovered ? { y: [0, -4, 0] } : { y: 0 },
      transition: { duration: 1, repeat: hovered ? Infinity : 0 },
    },
    "coin-flip": {
      animate: hovered ? { rotateY: [0, 360] } : { rotateY: 0 },
      transition: { duration: 0.8 },
    },
    default: { animate: {}, transition: {} },
  };

  const cfg = animMap[animation] ?? animMap.default;

  return (
    <motion.div
      animate={cfg.animate}
      transition={cfg.transition}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export const EcosystemFeatureCard = forwardRef<HTMLDivElement, EcosystemFeatureCardProps>(
  function EcosystemFeatureCard(
    {
      feature,
      visible,
      dimmed,
      highlighted,
      floating = false,
      onHover,
      style,
      className = "",
      layout = "orbit",
    },
    ref
  ) {
    const reduce = useReducedMotion();
    const Icon = feature.icon;

    const widthClass =
      layout === "stack"
        ? "w-full max-w-[320px]"
        : "w-[280px] lg:w-[320px]";

    return (
      <motion.article
        ref={ref}
        data-ecosystem-card={feature.id}
        role="article"
        aria-label={feature.title}
        tabIndex={0}
        className={`${widthClass} rounded-[28px] border border-hairline/60 bg-paper/80 p-6 backdrop-blur-md ${className}`}
        style={{
          ...style,
          boxShadow: highlighted
            ? "0 20px 50px rgba(255,110,20,0.15), 0 8px 24px rgba(0,0,0,0.06)"
            : "0 4px 24px rgba(0,0,0,0.05)",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{
          opacity: visible ? (dimmed ? 0.65 : 1) : 0,
          scale: visible ? (highlighted ? 1.03 : 1) : 0.85,
          y: visible ? (floating && !reduce ? [0, -2, 0] : 0) : 20,
        }}
        transition={{
          opacity: { duration: 0.35 },
          scale: { type: "spring", stiffness: 260, damping: 22 },
          y: floating && !reduce ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 },
        }}
        onMouseEnter={() => onHover(feature.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(feature.id)}
        onBlur={() => onHover(null)}
      >
        <IconMicroAnimation animation={feature.iconAnimation} hovered={highlighted}>
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-[14px] transition-colors ${
              highlighted ? "bg-ember/10 text-ember" : "bg-canvas text-primary-ink"
            }`}
          >
            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
          </div>
        </IconMicroAnimation>
        <h3 className="font-sf-pro-display text-[19px] font-semibold leading-snug text-primary-ink md:text-[21px]">
          {feature.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-[1.47] text-mid-gray md:text-[17px]">
          {feature.description}
        </p>
      </motion.article>
    );
  }
);
