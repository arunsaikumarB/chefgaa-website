import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { BRAND } from "../lib/brand";

type ChefgaaLogoProps = {
  className?: string;
  /** Show wordmark beside the logo mark */
  showWordmark?: boolean;
  /** Subtle entrance animation — use in home hero only */
  animateIn?: boolean;
  /** Logo height in pixels at md breakpoint */
  size?: "nav" | "hero";
  /** Slightly smaller mark when the header is compact (e.g. on scroll) */
  compact?: boolean;
};

export function ChefgaaLogo({
  className = "",
  showWordmark = true,
  animateIn = false,
  size = "nav",
  compact = false,
}: ChefgaaLogoProps) {
  const markRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!animateIn || !markRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    animate(markRef.current, {
      opacity: [0, 1],
      scale: [0.94, 1],
      translateY: [8, 0],
      duration: 900,
      ease: "outExpo",
    });
  }, [animateIn]);

  const heightClass =
    size === "hero"
      ? "h-11 md:h-14"
      : compact
        ? "h-9 sm:h-10 md:h-12"
        : "h-10 sm:h-12 md:h-14";

  const intrinsicHeight = size === "hero" ? 56 : compact ? 48 : 56;
  const intrinsicWidth = Math.round(intrinsicHeight * (1024 / 260));

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        ref={markRef}
        src="/chefgaa-logo.png"
        alt="Chefgaa"
        className={`${heightClass} w-auto max-w-none object-contain object-left transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        width={size === "hero" ? 220 : intrinsicWidth}
        height={intrinsicHeight}
        decoding="async"
      />
      {showWordmark && (
        <span className="font-sf-pro-display text-[22px] font-semibold tracking-[-0.02em] text-primary-ink">
          Chefgaa
        </span>
      )}
    </span>
  );
}

export { BRAND };
