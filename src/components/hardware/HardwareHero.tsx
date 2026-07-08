import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { HwPrimaryButton, HwTextLink } from "./HardwareButtons";
import { PRODUCT_SHOWCASES } from "./data";
import { HardwareSubNav } from "./HardwareSubNav";

export function HardwareHero() {
  const featured = PRODUCT_SHOWCASES.find((p) => p.featured)!;
  const rest = PRODUCT_SHOWCASES.filter((p) => !p.featured);

  return (
    <>
      <div className="bg-paper pt-14">
        <HardwareSubNav />
      </div>

      <section className="bg-paper pb-8 pt-8 md:pb-12 md:pt-10">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <Reveal>
            <ProductShowcaseCard product={featured} large />
          </Reveal>

          <div className="mt-6 flex flex-col gap-6">
            {rest.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.04}>
                <ProductShowcaseCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProductShowcaseCard({
  product,
  large = false,
}: {
  product: (typeof PRODUCT_SHOWCASES)[number];
  large?: boolean;
}) {
  return (
    <article
      id={product.anchor}
      className="overflow-hidden rounded-[20px] bg-[#F5F5F7]"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-4">
        <div className={`flex flex-col justify-center ${large ? "p-10 md:p-14 lg:p-16" : "p-8 md:p-10 lg:p-12"}`}>
          {product.badge && (
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#ED3C18]">
              {product.badge}
            </p>
          )}
          <h2
            className={`mt-2 font-sf-pro-display font-bold tracking-[-0.02em] text-[#111111] ${
              large
                ? "text-[32px] leading-[1.08] md:text-[40px] lg:text-[48px]"
                : "text-[28px] leading-[1.1] md:text-[36px]"
            }`}
          >
            {product.title}
          </h2>
          <p className="mt-4 max-w-[400px] text-[16px] leading-[1.5] text-[#444444] md:text-[17px]">
            {product.description}
          </p>
          {product.price && (
            <p className="mt-5 text-[15px] text-[#111111]">
              <span className="font-semibold">{product.price}</span>
              {product.priceNote && (
                <span className="text-[#666666]"> {product.priceNote}</span>
              )}
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <HwTextLink>Learn more</HwTextLink>
            <HwPrimaryButton>Buy now</HwPrimaryButton>
          </div>
        </div>

        <div
          className={`flex items-center justify-center ${
            large ? "min-h-[320px] p-8 md:min-h-[400px] md:p-12" : "min-h-[240px] p-6 md:min-h-[280px] md:p-10"
          }`}
        >
          <ProductVisual
            product={product.visual}
            floating
            size={large ? "lg" : "md"}
          />
        </div>
      </div>
    </article>
  );
}
