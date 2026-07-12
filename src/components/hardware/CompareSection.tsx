import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  COMPARE_DEVICES,
  COMPARE_GROUPS,
  type CompareCell,
} from "./data";
import { ProductVisual, HwReveal, hwType } from "./HardwareUI";
import { HW_EASE } from "./viewerShell";

const CARD_W = 260;
const LABEL_W = 200;
const GAP = 16;

function CompareCellView({ cell }: { cell: CompareCell }) {
  if (cell.kind === "check") {
    return (
      <span className="text-[22px] font-semibold leading-none text-[#ED3C18]" aria-label="Yes">
        ✓
      </span>
    );
  }
  if (cell.kind === "dash") {
    return (
      <span className="text-[20px] font-medium leading-none text-[#D1D5DB]" aria-label="No">
        —
      </span>
    );
  }
  if (cell.kind === "infinity") {
    return (
      <span className="text-[22px] font-semibold leading-none text-[#ED3C18]" aria-label="Unlimited">
        ∞
      </span>
    );
  }
  if (cell.kind === "optional") {
    return (
      <span className="inline-flex h-[28px] items-center rounded-full bg-[#FFF0EB] px-[12px] text-[12px] font-semibold leading-none text-[#ED3C18]">
        Optional
      </span>
    );
  }
  return (
    <span className="text-[15px] leading-[1.4] text-[#444444] md:text-[16px]">{cell.value}</span>
  );
}

export function ComparisonSection() {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const colCount = COMPARE_DEVICES.length;
  const tableMinWidth = LABEL_W + colCount * (CARD_W + GAP);

  return (
    <section className="bg-white py-[24px] md:py-[32px] lg:py-[40px]" aria-labelledby="compare-heading">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10 lg:px-20">
        <HwReveal>
          <div className="mx-auto max-w-[720px] text-center">
            <h2
              id="compare-heading"
              className="font-sf-pro-display text-[36px] font-bold leading-[1.15] tracking-[-0.02em] text-[#111111] md:text-[48px]"
            >
              Compare Devices
            </h2>
            <p className="mx-auto mt-[16px] mb-[32px] max-w-[560px] text-[18px] leading-[1.6] text-[#6B7280]">
              Compare every Chefgaa hardware device to find the right setup for your restaurant.
            </p>
          </div>
        </HwReveal>

        <div className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:thin]">
          <div style={{ minWidth: tableMinWidth }} className="w-full">
            {/* Device header cards */}
            <div
              className="sticky top-[11.5rem] z-20 mb-[40px] grid items-stretch gap-4 bg-white/95 py-4 backdrop-blur-md"
              style={{
                gridTemplateColumns: `${LABEL_W}px repeat(${colCount}, ${CARD_W}px)`,
              }}
              onMouseLeave={() => setHoveredCol(null)}
            >
              <div aria-hidden="true" />
              {COMPARE_DEVICES.map((device, i) => {
                const active = hoveredCol === i;
                return (
                  <motion.button
                    key={device.id}
                    type="button"
                    onMouseEnter={() => setHoveredCol(i)}
                    onFocus={() => setHoveredCol(i)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: HW_EASE }}
                    className={`flex h-full w-full flex-col items-center rounded-[24px] border bg-white p-[20px] text-center outline-none transition-[border-color,box-shadow,background-color] duration-200 focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 ${
                      active
                        ? "border-[#ED3C18] bg-[#FFF7F4] shadow-[0_20px_50px_rgba(237,60,24,0.12)]"
                        : "border-black/[0.06] shadow-[0_16px_45px_rgba(0,0,0,0.06)]"
                    }`}
                  >
                    <div className="flex h-[120px] w-full items-center justify-center">
                      <ProductVisual
                        product={device.visual}
                        size="sm"
                        interactive={false}
                      />
                    </div>
                    <p className="mt-[16px] font-sf-pro-display text-[18px] font-bold leading-[1.25] text-[#111111]">
                      {device.name}
                    </p>
                    <p className="mt-[6px] text-[14px] leading-[1.4] text-[#6B7280]">
                      {device.tagline}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Feature groups */}
            <div className="overflow-hidden rounded-[24px] border border-black/[0.05]">
              {COMPARE_GROUPS.map((group, gi) => (
                <div key={group.id}>
                  <div
                    className="grid items-center bg-[#FAFAFA]"
                    style={{
                      gridTemplateColumns: `${LABEL_W}px repeat(${colCount}, ${CARD_W}px)`,
                    }}
                  >
                    <div className="sticky left-0 z-10 bg-[#FAFAFA] px-[24px] py-[18px]">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#ED3C18]">
                        {group.label}
                      </p>
                    </div>
                    {COMPARE_DEVICES.map((d, i) => (
                      <div
                        key={`${group.id}-${d.id}`}
                        className={`h-full transition-colors duration-200 ${
                          hoveredCol === i ? "bg-[#FFF7F4]" : "bg-[#FAFAFA]"
                        }`}
                      />
                    ))}
                  </div>

                  {group.rows.map((row, ri) => {
                    const globalIndex =
                      COMPARE_GROUPS.slice(0, gi).reduce((n, g) => n + g.rows.length, 0) + ri;
                    const alt = globalIndex % 2 === 1;

                    return (
                      <motion.div
                        key={`${group.id}-${row.label}`}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{
                          duration: 0.45,
                          delay: Math.min(globalIndex * 0.03, 0.4),
                          ease: HW_EASE,
                        }}
                        className="group/row grid min-h-[72px] items-center"
                        style={{
                          gridTemplateColumns: `${LABEL_W}px repeat(${colCount}, ${CARD_W}px)`,
                        }}
                      >
                        <div
                          className={`sticky left-0 z-10 flex h-full items-center border-t border-black/[0.04] px-[24px] transition-colors duration-200 group-hover/row:bg-[#F3F4F6] ${
                            alt ? "bg-[#FAFAFA]" : "bg-white"
                          }`}
                        >
                          <p className="text-[15px] font-bold leading-[1.35] text-[#111111] md:text-[16px]">
                            {row.label}
                          </p>
                        </div>
                        {row.values.map((cell, ci) => (
                          <div
                            key={`${row.label}-${ci}`}
                            onMouseEnter={() => setHoveredCol(ci)}
                            className={`flex h-full min-h-[72px] items-center justify-center border-t border-black/[0.04] px-[12px] text-center transition-colors duration-200 group-hover/row:bg-[#F3F4F6] ${
                              hoveredCol === ci
                                ? "bg-[#FFF7F4]"
                                : alt
                                  ? "bg-[#FAFAFA]"
                                  : "bg-white"
                            }`}
                          >
                            <CompareCellView cell={cell} />
                          </div>
                        ))}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <HwReveal>
          <div className="mx-auto mt-[32px] max-w-[880px] rounded-[24px] bg-[#F8F8F8] px-[24px] py-[32px] text-center md:px-[32px]">
            <h3 className="font-sf-pro-display text-[28px] font-bold leading-[1.25] tracking-[-0.02em] text-[#111111] md:text-[32px]">
              Still not sure which device is right for you?
            </h3>
            <p className={`mx-auto mt-[12px] max-w-[520px] ${hwType.body}`}>
              Our experts can help you choose the perfect setup.
            </p>
            <div className="mt-[24px] flex flex-wrap items-center justify-center gap-[16px]">
              <Link
                to="/contact"
                className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#ED3C18] px-[28px] text-[16px] font-semibold leading-none !text-white outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(255,92,53,0.25)] focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
              >
                Request Demo
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#111111] px-[28px] text-[16px] font-semibold leading-none text-[#111111] outline-none transition-all duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-[#111111] hover:!text-white focus-visible:ring-2 focus-visible:ring-[#ED3C18]/40 active:scale-[0.97]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </HwReveal>
      </div>
    </section>
  );
}
