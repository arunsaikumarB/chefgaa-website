import type { SlideVisual } from "./carouselSlides";
import { POS_HERO_IMAGE } from "./carouselSlides";

function PosVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <img
        src={POS_HERO_IMAGE}
        alt="Chefgaa POS terminal"
        className="max-h-full max-w-full rounded-[20px] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
        draggable={false}
      />
    </div>
  );
}

function PhoneMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full items-center justify-center gap-6 p-8">
      <div className="h-[88%] w-[38%] max-w-[200px] rounded-[28px] border-[6px] border-[#1d1d1f] bg-paper p-3 shadow-xl">
        <div className="mb-2 h-1.5 w-10 rounded-full bg-hairline mx-auto" />
        <div className="flex flex-col gap-2">
          {["Biryani Bowl", "Butter Chicken", "Garlic Naan"].map((item, i) => (
            <div key={item} className="rounded-xl bg-canvas p-2.5">
              <div className="h-10 rounded-lg" style={{ backgroundColor: `${accent}22` }} />
              <p className="mt-1.5 text-[10px] font-medium text-primary-ink">{item}</p>
              <p className="text-[9px] text-mid-gray">${(12.99 + i * 2).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div
          className="mt-3 rounded-full py-2 text-center text-[10px] font-semibold text-white"
          style={{ backgroundColor: accent }}
        >
          Order Now
        </div>
      </div>
      <div className="hidden h-[70%] w-[45%] flex-col justify-center gap-3 sm:flex">
        <div className="rounded-2xl bg-paper/80 p-4 shadow-lg backdrop-blur">
          <p className="text-[11px] font-semibold text-primary-ink">Order #1847</p>
          <p className="mt-1 text-[10px] text-mid-gray">Preparing · 12 min</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-hairline">
            <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accent }} />
          </div>
        </div>
        <div className="rounded-2xl bg-paper/60 p-3 text-[10px] text-mid-gray">
          Delivery en route
        </div>
      </div>
    </div>
  );
}

function KitchenVisual({ accent }: { accent: string }) {
  const tickets = [
    { table: "T-12", items: "2× Biryani", time: "4m", urgent: true },
    { table: "T-08", items: "1× Curry", time: "8m", urgent: false },
    { table: "T-03", items: "3× Naan", time: "2m", urgent: true },
  ];
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="w-full max-w-[520px] rounded-[24px] bg-[#1d1d1f] p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-white/90">Kitchen Display</span>
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white" style={{ backgroundColor: accent }}>
            3 Active
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {tickets.map((t) => (
            <div
              key={t.table}
              className={`rounded-xl p-3 ${t.urgent ? "ring-2 ring-[#ff6e14]" : ""}`}
              style={{
                backgroundColor: t.urgent ? `${accent}33` : "rgba(255,255,255,0.08)",
              }}
            >
              <p className="text-[11px] font-bold text-white">{t.table}</p>
              <p className="mt-1 text-[10px] text-white/70">{t.items}</p>
              <p className="mt-2 text-[10px] font-medium" style={{ color: accent }}>{t.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartVisual({ accent }: { accent: string }) {
  const bars = [40, 65, 45, 80, 55, 90, 70];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="flex h-[55%] w-full max-w-[480px] items-end justify-center gap-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-10 rounded-t-lg transition-all"
            style={{ height: `${h}%`, backgroundColor: i === bars.length - 2 ? accent : `${accent}44` }}
          />
        ))}
      </div>
      <div className="flex gap-8 text-center">
        {[["$12.4k", "Today"], ["+18%", "vs Last Week"], ["94%", "Uptime"]].map(([v, l]) => (
          <div key={l}>
            <p className="text-[22px] font-semibold text-primary-ink">{v}</p>
            <p className="text-[11px] text-mid-gray">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericDashboard({ accent, label }: { accent: string; label: string }) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="grid w-full max-w-[480px] grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-2xl bg-paper/90 p-4 shadow-lg">
            <div className="h-16 rounded-xl" style={{ backgroundColor: `${accent}${n === 1 ? "33" : "18"}` }} />
            <p className="mt-2 text-[11px] font-medium text-primary-ink">{label} {n}</p>
            <p className="text-[10px] text-mid-gray">Live sync</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type CardVisualProps = {
  type: SlideVisual;
  accent: string;
};

export function CardVisual({ type, accent }: CardVisualProps) {
  switch (type) {
    case "pos":
      return <PosVisual />;
    case "ordering":
      return <PhoneMock accent={accent} />;
    case "kitchen":
      return <KitchenVisual accent={accent} />;
    case "analytics":
      return <ChartVisual accent={accent} />;
    case "inventory":
      return <GenericDashboard accent="#22c55e" label="Stock" />;
    case "reservations":
      return <GenericDashboard accent="#ef4444" label="Table" />;
    case "payments":
      return (
        <div className="flex h-full items-center justify-center p-8">
          <div className="rounded-[24px] bg-[#1d1d1f] p-8 shadow-2xl">
            <div className="mb-4 h-24 w-40 rounded-xl bg-gradient-to-br from-[#333] to-[#111]" />
            <p className="text-center text-[28px] font-bold text-white">$64.37</p>
            <p className="mt-1 text-center text-[11px] text-white/50">Tap to pay</p>
          </div>
        </div>
      );
    case "crm":
      return <GenericDashboard accent={accent} label="Guest" />;
    case "marketing":
      return <GenericDashboard accent={accent} label="Campaign" />;
    case "website":
      return (
        <div className="flex h-full items-center justify-center p-8">
          <div className="w-full max-w-[480px] overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-hairline">
            <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="p-6">
              <div className="h-32 rounded-xl" style={{ backgroundColor: `${accent}22` }} />
              <p className="mt-4 text-[14px] font-semibold text-primary-ink">Your Restaurant</p>
              <p className="text-[11px] text-mid-gray">Order online · View menu</p>
            </div>
          </div>
        </div>
      );
    case "ai":
      return (
        <div className="flex h-full items-center justify-center p-8">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-purple-100 shadow-xl">
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-violet-300/60" />
            <div className="text-center">
              <p className="text-[32px]">✦</p>
              <p className="text-[11px] font-medium text-violet-700">AI Engine</p>
            </div>
          </div>
        </div>
      );
    case "loyalty":
      return (
        <div className="flex h-full items-center justify-center gap-4 p-8">
          {["Gold", "Silver", "Bronze"].map((tier, i) => (
            <div
              key={tier}
              className="rounded-2xl bg-paper p-5 shadow-lg"
              style={{ transform: `translateY(${i === 1 ? -12 : 0}px)` }}
            >
              <div className="mx-auto h-12 w-12 rounded-full" style={{ backgroundColor: `${accent}${40 + i * 20}` }} />
              <p className="mt-2 text-center text-[12px] font-semibold text-primary-ink">{tier}</p>
              <p className="text-center text-[10px] text-mid-gray">{(3 - i) * 250} pts</p>
            </div>
          ))}
        </div>
      );
    default:
      return <GenericDashboard accent={accent} label="Module" />;
  }
}
