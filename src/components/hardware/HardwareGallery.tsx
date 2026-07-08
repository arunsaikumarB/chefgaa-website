import { motion } from "framer-motion";
import { Reveal } from "../Reveal";
import { GalleryVisual } from "./HardwareVisuals";
import { GALLERY_ITEMS } from "./data";

export function HardwareGallery() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Hardware gallery
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            Every angle, every detail — built for the demands of restaurant service.
          </p>
        </Reveal>

        <div className="scrollbar-none mt-12 flex gap-6 overflow-x-auto pb-4 md:gap-8">
          {GALLERY_ITEMS.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05} className="shrink-0">
              <motion.figure
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-[min(360px,80vw)] overflow-hidden rounded-[28px] border border-black/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
              >
                <GalleryVisual angle={item.angle} className="min-h-[300px]" />
                <figcaption className="border-t border-black/[0.04] bg-paper px-5 py-4 text-[14px] font-medium text-[#444444]">
                  {item.label}
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
