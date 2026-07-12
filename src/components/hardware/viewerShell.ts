import { hwS } from "./spacing";

/**
 * Shared catalogue viewer well.
 * Height reduced ~35% from prior; product fills ~75–80% of the frame.
 */
export const hwViewerWellClass =
  "relative flex h-[144px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-black/[0.05] bg-[#F7F7F7] p-[8px] shadow-[0_16px_45px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] hover:border-black/[0.09] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] md:h-[156px] lg:h-[180px]";

export const hwCardShadow = "0 16px 45px rgba(0,0,0,0.06)";
export const hwCardShadowHover = "0 22px 55px rgba(0,0,0,0.09)";

export const hwStageShadow = "0 30px 80px rgba(0,0,0,0.08)";
export const hwStageShadowHover = "0 34px 90px rgba(0,0,0,0.1)";

/** Shared premium motion curve */
export const HW_EASE = [0.22, 1, 0.36, 1] as const;
export const HW_EASE_CSS = "cubic-bezier(0.22,1,0.36,1)";

/** Card internal rhythm from the Hardware scale */
export const HW_CARD = {
  pad: hwS.lg, // 24px
  afterViewer: hwS.md, // 16px
  afterTitle: hwS.sm, // 12px
  afterDesc: hwS.md, // 16px
  afterChips: "20px",
} as const;
