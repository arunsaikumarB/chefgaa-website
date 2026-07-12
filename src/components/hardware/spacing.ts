/**
 * Hardware page vertical rhythm.
 * Nav → Hero: 48px
 * Between major sections: 48 (mobile) / 64 (tablet) / 80 (desktop)
 *
 * HwShell uses half of the section gap on each side so adjacent
 * sections total the full rhythm between content blocks.
 */
export const HW_NAV_TO_HERO = "pt-[48px]";

/** Half-gap per section edge → adjacent sections = 48 / 64 / 80 */
export const HW_SECTION_Y =
  "py-[24px] md:py-[32px] lg:py-[40px]";

/** Full gap after hero before next section content */
export const HW_HERO_BOTTOM =
  "pb-[24px] md:pb-[32px] lg:pb-[40px]";
