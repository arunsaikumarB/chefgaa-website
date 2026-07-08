import { Reveal } from "../Reveal";
import { COMPARISON_PRODUCTS, COMPARISON_ROWS } from "./data";

export function ProductComparison() {
  return (
    <section className="bg-[#F8F9FA] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Compare products
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            Find the right hardware for every station in your restaurant.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-x-auto rounded-[28px] border border-black/[0.04] bg-paper shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/[0.06]">
                  <th className="p-5 text-[13px] font-medium uppercase tracking-[0.08em] text-[#666666]" />
                  {COMPARISON_PRODUCTS.map((p) => (
                    <th
                      key={p}
                      className="p-5 font-sf-pro-display text-[16px] font-semibold text-[#111111] md:text-[18px]"
                    >
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i < COMPARISON_ROWS.length - 1 ? "border-b border-black/[0.04]" : ""}
                  >
                    <td className="p-5 text-[14px] font-medium text-[#444444]">{row.label}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="p-5 text-[14px] leading-[1.5] text-[#666666]">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
