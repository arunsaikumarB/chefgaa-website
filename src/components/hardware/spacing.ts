/**
 * Hardware spacing scale — the ONLY spacing values allowed on this page.
 * Do not invent ad-hoc gaps, paddings, or min-heights outside this set.
 */
export const HW = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  section: 72,
} as const;

/** Tailwind-ready pixel strings from the scale */
export const hwS = {
  xs: "[8px]",
  sm: "[12px]",
  md: "[16px]",
  lg: "[24px]",
  xl: "[32px]",
  section: "[72px]",
} as const;
