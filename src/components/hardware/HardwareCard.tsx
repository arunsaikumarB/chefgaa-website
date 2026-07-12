import { Link } from "react-router-dom";
import type { VisualId } from "./data";
import { ProductVisual } from "./HardwareUI";
import { HW_CARD_H, HW_CARD_W, HW_IMAGE_H } from "./spacing";
import { hwCardShadow } from "./viewerShell";

export type HardwareCardProduct = {
  id: string;
  name: string;
  description: string;
  specs: string[];
  visual: VisualId;
};

/**
 * Hardware catalogue card — 540×480 fixed frame.
 *
 * Image 210 → 24 → Title → 8 → Description 48 → 24 → Chips 36
 * → 32 → Divider → 20 → CTA (bottom-pinned)
 */
export function HardwareCard({ product }: { product: HardwareCardProduct }) {
  const chips = product.specs.slice(0, 3);

  return (
    <article
      className="box-border flex flex-col overflow-hidden rounded-[24px] border border-[rgba(0,0,0,0.05)] bg-[#FFFFFF]"
      style={{
        width: `min(100%, ${HW_CARD_W}px)`,
        height: HW_CARD_H,
        padding: 32,
        boxShadow: hwCardShadow,
      }}
    >
      {/* Image */}
      <div
        className="flex w-full shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#F8F8F8]"
        style={{ height: HW_IMAGE_H }}
      >
        <div className="flex h-[80%] w-[80%] items-center justify-center">
          <ProductVisual product={product.visual} size="md" embedded />
        </div>
      </div>

      {/* Title — max 2 lines; reserved one-line slot keeps cards identical */}
      <h3
        className="mt-[24px] line-clamp-2 shrink-0 overflow-hidden font-sf-pro-display text-[32px] font-semibold tracking-[-0.02em] text-[#111111]"
        style={{ height: 36, lineHeight: "36px" }}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p
        className="mt-[8px] line-clamp-2 shrink-0 overflow-hidden text-[16px] text-[#666666]"
        style={{ height: 48, lineHeight: "24px" }}
      >
        {product.description}
      </p>

      {/* Chips */}
      <ul className="mt-[24px] flex h-[36px] shrink-0 flex-wrap gap-[12px] overflow-hidden">
        {chips.map((s) => (
          <li
            key={s}
            className="inline-flex h-[36px] items-center rounded-full bg-[#F3F4F6] px-[16px] py-[8px] text-[14px] leading-none text-[#444444]"
          >
            {s}
          </li>
        ))}
      </ul>

      {/* 32px → Divider → 20px → CTA */}
      <div className="mt-auto flex min-h-[32px] shrink-0 flex-col justify-end">
        <div className="h-px w-full bg-black/[0.08]" />
        <div className="mt-[20px] flex items-center justify-between">
          <Link
            to="/contact"
            className="text-[16px] font-semibold leading-none text-[#ED3C18] transition-opacity hover:opacity-80"
          >
            Learn More →
          </Link>
          <Link
            to="/contact"
            className="text-[16px] font-semibold leading-none text-[#ED3C18] transition-opacity hover:opacity-80"
          >
            Request Demo →
          </Link>
        </div>
      </div>
    </article>
  );
}
