import { Link } from "react-router-dom";
import type { HardwareChip, VisualId } from "./data";
import { ProductVisual } from "./HardwareUI";

export type HardwareCardProduct = {
  id: string;
  name: string;
  description: string;
  chips: HardwareChip[];
  visual: VisualId;
};

/**
 * Hardware catalogue card — matches the reference design:
 * white card, product on white (no grey well), icon chips, black + blue CTAs.
 */
export function HardwareCard({ product }: { product: HardwareCardProduct }) {
  const chips = product.chips.slice(0, 3);

  return (
    <article
      className="box-border flex h-full w-full flex-col rounded-[32px] border border-black/[0.04] bg-white p-[32px]"
      style={{
        boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
      }}
    >
      {/* Product — no grey container; soft contact shadow */}
      <div className="relative flex h-[200px] w-full shrink-0 items-center justify-center">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[8px] left-1/2 h-[18px] w-[55%] -translate-x-1/2 rounded-[100%] bg-black/[0.08] blur-[12px]"
        />
        <div className="relative z-[1] flex h-[90%] w-[90%] items-center justify-center">
          <ProductVisual product={product.visual} size="md" embedded />
        </div>
      </div>

      <h3 className="mt-[28px] font-sf-pro-display text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#111111]">
        {product.name}
      </h3>

      <p className="mt-[10px] line-clamp-2 min-h-[48px] text-[16px] leading-[24px] text-[#6B7280]">
        {product.description}
      </p>

      <ul className="mt-[20px] flex min-h-[36px] flex-wrap gap-[10px]">
        {chips.map((chip) => {
          const Icon = chip.icon;
          return (
            <li
              key={chip.label}
              className="inline-flex h-[36px] items-center gap-[8px] rounded-full bg-[#F3F4F6] px-[14px] text-[13px] font-medium leading-none text-[#374151]"
            >
              <Icon size={14} strokeWidth={2} className="shrink-0 text-[#111111]" aria-hidden />
              {chip.label}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-[28px]">
        <div className="h-px w-full bg-[#E5E7EB]" />
        <div className="mt-[20px] flex items-center justify-between">
          <Link
            to="/contact"
            className="text-[15px] font-semibold leading-none text-[#111111] transition-opacity hover:opacity-70"
          >
            Learn More &gt;
          </Link>
          <Link
            to="/contact"
            className="text-[15px] font-semibold leading-none text-[#0071E3] transition-opacity hover:opacity-80"
          >
            Request Demo &gt;
          </Link>
        </div>
      </div>
    </article>
  );
}
