import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Section heading (40–56px, weight 600) + optional 21px intro paragraph. */
export function SectionHeading({
  title,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const introAlign = align === "center" ? "mx-auto" : "";
  return (
    <div className={`${alignClass} mb-8 max-w-[720px] md:mb-12 ${className}`}>
      <h2 className="font-sf-pro-display text-[32px] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[40px] lg:text-[56px] lg:leading-[1.07] lg:tracking-[-0.28px]">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-[600px] text-[19px] leading-[1.4] text-mid-gray md:text-[21px] ${introAlign}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
