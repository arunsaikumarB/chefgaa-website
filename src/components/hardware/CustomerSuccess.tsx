import { Reveal } from "../Reveal";
import { TESTIMONIALS } from "./data";

export function CustomerSuccess() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Trusted by restaurants
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            Real operators. Real kitchens. Real results with Chefgaa hardware.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.04] bg-[#F8F9FA]">
                <div
                  className="h-48 bg-gradient-to-br from-[#fff4f0] via-[#f8f9fa] to-[#f0f7ff]"
                  aria-hidden="true"
                >
                  <div className="flex h-full items-end justify-center pb-6">
                    <div className="h-20 w-32 rounded-t-[16px] bg-gradient-to-b from-[#e8e8e8] to-[#d0d0d0] shadow-lg" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <blockquote className="flex-1 text-[16px] leading-[1.6] text-[#444444]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-6 border-t border-black/[0.06] pt-6">
                    <p className="font-sf-pro-display text-[16px] font-semibold text-[#111111]">{t.name}</p>
                    <p className="mt-1 text-[14px] text-[#666666]">
                      {t.role} · {t.location}
                    </p>
                  </footer>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
