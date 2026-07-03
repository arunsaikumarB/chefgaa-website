import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export type PastelTint =
  | "sky"
  | "citrus"
  | "starlight"
  | "silver"
  | "blush"
  | "indigo"
  | "midnight"
  | "plain";

const tintBg: Record<PastelTint, string> = {
  sky: "bg-sky",
  citrus: "bg-citrus",
  starlight: "bg-starlight",
  silver: "bg-silver",
  blush: "bg-blush",
  indigo: "bg-indigo",
  midnight: "bg-midnight",
  plain: "bg-canvas",
};

// Dark tints get light text for legibility on the pastel card fills.
const darkTints: PastelTint[] = ["indigo", "midnight"];

type FeatureCardProps = {
  title: string;
  body: string;
  icon?: ReactNode;
  tint?: PastelTint;
  delay?: number;
  /** Applied to the outer wrapper — used for width control in flex layouts. */
  className?: string;
};

/** Borderless, shadowless card at 28px radius on a pastel tint. */
export function FeatureCard({
  title,
  body,
  icon,
  tint = "plain",
  delay = 0,
  className = "",
}: FeatureCardProps) {
  const isDark = darkTints.includes(tint);
  return (
    <Reveal delay={delay} className={`h-full ${className}`}>
      <div
        className={`flex h-full flex-col rounded-[28px] p-8 ${tintBg[tint]} ${
          isDark ? "text-paper" : "text-primary-ink"
        }`}
      >
        {icon && (
          <div className={isDark ? "text-paper" : "text-primary-ink"}>{icon}</div>
        )}
        <h3
          className={`mt-4 font-sf-pro-display text-[24px] font-semibold leading-tight md:text-[28px]`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 text-[17px] leading-[1.47] ${
            isDark ? "text-paper/80" : "text-mid-gray"
          }`}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}
