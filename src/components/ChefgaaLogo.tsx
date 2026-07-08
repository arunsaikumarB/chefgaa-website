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
};

export function ChefgaaLogo({
  className = "",
  showWordmark = true,
  animateIn = false,
  size = "nav",
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

  const heightClass = size === "hero" ? "h-11 md:h-14" : "h-8 md:h-9";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        ref={markRef}
        src="/chefgaa-logo.png"
        alt="Chefgaa"
        className={`${heightClass} w-auto object-contain object-left`}
        width={size === "hero" ? 180 : 120}
        height={size === "hero" ? 56 : 36}
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
