import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { HwArrowLink } from "./HardwareButtons";
import { ACCESSORIES, PEACE_OF_MIND, USE_CASES, RESOURCE_CARDS } from "./data";

export function HardwareMobileFeature() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="font-sf-pro-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#111111] md:text-[40px]">
              Take contactless payments with just your phone
            </h2>
            <div className="mt-6">
              <HwArrowLink>Discover Tap to Pay on iPhone</HwArrowLink>
            </div>
            <div className="mt-3">
              <HwArrowLink>Discover Tap to Pay on Android</HwArrowLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[20px] bg-[#F5F5F7]">
              <div className="flex min-h-[320px] items-center justify-center p-12">
                <ProductVisual product="mobile-ordering" floating size="lg" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function HardwareAccessories() {
  return (
    <section id="kits" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <h2 className="font-sf-pro-display text-[32px] font-bold tracking-[-0.02em] text-[#111111] md:text-[40px]">
            Customize your hardware setup
          </h2>
          <div className="mt-4 flex flex-wrap gap-6">
            <HwArrowLink>Get started with a kit</HwArrowLink>
            <HwArrowLink>Shop all kits</HwArrowLink>
          </div>
          <p className="mt-2">
            <HwArrowLink>Choose specific accessories</HwArrowLink>
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {ACCESSORIES.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <article className="grid items-center gap-8 rounded-[20px] bg-[#F5F5F7] p-8 md:grid-cols-2 md:p-10">
                <div className="flex min-h-[180px] items-center justify-center">
                  <ProductVisual product={item.visual} floating />
                </div>
                <div>
                  <h3 className="font-sf-pro-display text-[24px] font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.5] text-[#666666]">{item.description}</p>
                  <p className="mt-4 text-[15px] font-semibold text-[#111111]">{item.price}</p>
                  <div className="mt-4">
                    <HwArrowLink>Shop now</HwArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HardwarePeaceOfMind() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-bold tracking-[-0.02em] text-[#111111] md:text-[40px]">
            A little peace of mind
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {PEACE_OF_MIND.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center">
                    <Icon size={28} strokeWidth={1.5} className="text-[#111111]" />
                  </div>
                  <h3 className="mt-4 font-sf-pro-display text-[17px] font-bold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#666666]">{item.description}</p>
                  <div className="mt-3">
                    <HwArrowLink>Learn more</HwArrowLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function HardwareUseCases() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-bold tracking-[-0.02em] text-[#111111] md:text-[40px]">
            Made to power your business
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {USE_CASES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="overflow-hidden rounded-[20px] bg-[#F5F5F7]">
                <div
                  className={`flex h-48 items-end justify-center bg-gradient-to-br ${item.gradient} p-6`}
                  aria-hidden="true"
                >
                  <div className="h-24 w-32 rounded-t-[12px] bg-white/60 shadow-lg backdrop-blur-sm" />
                </div>
                <div className="p-6">
                  <h3 className="font-sf-pro-display text-[18px] font-bold leading-[1.3] text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#666666]">{item.description}</p>
                  <div className="mt-4">
                    <HwArrowLink>{item.link}</HwArrowLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HardwareResources() {
  return (
    <section className="bg-paper pb-8 pt-8 md:pb-12">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {RESOURCE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.06}>
              <article className="rounded-[20px] bg-[#F5F5F7] p-10 md:p-12">
                <h3 className="font-sf-pro-display text-[24px] font-bold text-[#111111] md:text-[28px]">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-[360px] text-[15px] leading-[1.5] text-[#666666]">
                  {card.description}
                </p>
                <div className="mt-6">
                  <HwArrowLink to={card.to}>{card.link}</HwArrowLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 rounded-[20px] bg-[#F5F5F7] p-8 md:p-10">
            <p className="text-[12px] leading-[1.6] text-[#666666]">
              All payment plans are subject to credit approval. Purchase amounts must be from $49 to
              $10,000. Sales tax, where applicable, will be due at checkout. Financing available in
              select regions. Hardware warranties vary by product — see individual product pages for
              details. Chefgaa hardware requires an active Chefgaa software subscription.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
