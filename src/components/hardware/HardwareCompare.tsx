import { useState } from "react";
import { Reveal } from "../Reveal";
import { ProductVisual } from "./HardwareVisuals";
import { COMPARE_DEVICES, COMPARE_ROW_LABELS } from "./data";
import type { CompareDevice } from "./data";

const DEFAULT_SELECTED = ["handheld", "terminal", "register"];

export function HardwareCompare() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const active = COMPARE_DEVICES.filter((d) => selected.includes(d.id)).slice(0, 3);

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-bold tracking-[-0.02em] text-[#111111] md:text-[40px]">
            Select devices to compare
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {COMPARE_DEVICES.map((device) => {
              const on = selected.includes(device.id);
              return (
                <button
                  key={device.id}
                  type="button"
                  onClick={() => toggle(device.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    on
                      ? "border-[#ED3C18] bg-[#ED3C18]/5 text-[#ED3C18]"
                      : "border-black/[0.1] bg-paper text-[#444444] hover:border-black/[0.2]"
                  }`}
                >
                  {device.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {active.map((device) => (
              <CompareColumn key={device.id} device={device} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompareColumn({ device }: { device: CompareDevice }) {
  return (
    <div>
      <div className="flex min-h-[200px] items-center justify-center rounded-[16px] bg-[#F5F5F7] p-8">
        <ProductVisual product={device.visual} size="sm" />
      </div>
      <h3 className="mt-6 font-sf-pro-display text-[20px] font-bold text-[#111111]">
        {device.name}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.5] text-[#666666]">{device.shortDescription}</p>

      <dl className="mt-8 space-y-0">
        {COMPARE_ROW_LABELS.map((label, i) => (
          <div
            key={label}
            className={`py-5 ${i < COMPARE_ROW_LABELS.length - 1 ? "border-b border-black/[0.06]" : ""}`}
          >
            <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#666666]">
              {label}
            </dt>
            <dd className="mt-1.5 text-[14px] leading-[1.5] text-[#111111]">
              {device.rows[label]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
