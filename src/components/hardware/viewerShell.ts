/**
 * Catalogue image well — fills the HardwareCard image slot (210×100%).
 * Product content should occupy ~80% of this frame.
 */
export const hwViewerWellClass =
  "relative flex h-full w-full items-center justify-center overflow-hidden bg-transparent";

/** Standalone well (non-card contexts) */
export const hwViewerWellStandalone =
  "relative flex h-[210px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-black/[0.05] bg-[#F8F8F8]";

export const hwCardShadow = "0 8px 30px rgba(0,0,0,0.06)";
export const hwCardShadowHover = "0 12px 36px rgba(0,0,0,0.1)";

export const hwStageShadow = "0 30px 80px rgba(0,0,0,0.08)";
export const hwStageShadowHover = "0 34px 90px rgba(0,0,0,0.1)";

export const HW_EASE = [0.22, 1, 0.36, 1] as const;
export const HW_EASE_CSS = "cubic-bezier(0.22,1,0.36,1)";
