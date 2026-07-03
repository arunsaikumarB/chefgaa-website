import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Background band. white and gray alternate to create rhythm. */
  bg?: "white" | "gray";
  className?: string;
  id?: string;
};

/**
 * A full-bleed section band with a centered 1200px content column.
 * Vertical rhythm: 120px desktop, 64px mobile. No dividers — rhythm
 * comes from alternating white / gray backgrounds only.
 */
export function Section({ children, bg = "white", className = "", id }: SectionProps) {
  const bgClass = bg === "gray" ? "bg-canvas" : "bg-paper";
  return (
    <section id={id} className={`${bgClass} py-16 md:py-[120px] ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">{children}</div>
    </section>
  );
}
