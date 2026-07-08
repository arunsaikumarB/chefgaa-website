import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { FEATURED_PRODUCTS } from "./data";
import type { HardwareCategoryId } from "./data";

const productMap: Record<string, HardwareCategoryId | "mobile-ordering"> = {
  "pos-terminal": "pos-terminal",
  "kitchen-display": "kitchen-display",
  "mobile-ordering": "mobile-ordering",
  "barcode-scanner": "barcode-scanner",
  "receipt-printer": "receipt-printer",
};

export function FeaturedHardware() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Featured hardware
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {FEATURED_PRODUCTS.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05}>
              <article
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  product.reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ED3C18]">
                    {product.eyebrow}
                  </p>
                  <h3 className="mt-4 font-sf-pro-display text-[32px] font-bold leading-[1.08] tracking-[-0.02em] text-[#111111] md:text-[44px] lg:text-[52px]">
                    {product.headline.map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 text-[17px] leading-[1.55] text-[#666666] md:text-[19px]">
                    {product.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-[16px] text-[#444444]">
                        <Check size={18} className="mt-0.5 shrink-0 text-[#ED3C18]" strokeWidth={2.5} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ED3C18] px-6 py-3 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Request Demo
                  </Link>
                </div>
                <div className="flex items-center justify-center rounded-[32px] bg-gradient-to-br from-[#f8f9fa] to-[#ffffff] p-10 md:p-14">
                  <ProductVisual
                    product={productMap[product.id] ?? "pos-terminal"}
                    floating
                    className="scale-110 md:scale-125"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
