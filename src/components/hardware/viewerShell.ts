/** Shared catalogue viewer well — every hardware card product uses this shell. */
export const hwViewerWellClass =
  "relative flex h-[220px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-black/[0.05] bg-[#F7F7F7] p-[16px] shadow-[0_16px_45px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] hover:border-black/[0.09] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:h-[240px] md:p-[18px] lg:h-[280px] lg:p-[20px]";

export const hwCardShadow = "0 16px 45px rgba(0,0,0,0.06)";
export const hwCardShadowHover = "0 22px 55px rgba(0,0,0,0.09)";

export const hwStageShadow = "0 30px 80px rgba(0,0,0,0.08)";
export const hwStageShadowHover = "0 34px 90px rgba(0,0,0,0.1)";

/** Shared premium motion curve */
export const HW_EASE = [0.22, 1, 0.36, 1] as const;
export const HW_EASE_CSS = "cubic-bezier(0.22,1,0.36,1)";
