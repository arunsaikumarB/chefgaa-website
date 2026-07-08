import { Reveal } from "../Reveal";
import { WHY_HARDWARE } from "./data";

export function WhyHardware() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Why Chefgaa hardware
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            Restaurant-grade reliability with the simplicity of consumer technology.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_HARDWARE.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <article
                  className={`rounded-[28px] border border-black/[0.04] bg-gradient-to-br ${item.tint} p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]`}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
                    <Icon size={28} className="text-[#ED3C18]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 font-sf-pro-display text-[22px] font-semibold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.55] text-[#666666]">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
