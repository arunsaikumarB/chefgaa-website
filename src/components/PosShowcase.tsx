import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { CheckIcon } from "./Icons";

/* ============================================================
 * Screen mock UIs — clean, minimal, token-driven.
 * Blue (#0071e3) appears only here, as the in-screen UI accent.
 * ============================================================ */

function MenuScreen() {
  const items = [
    { name: "Chicken Biryani", price: "$12.99" },
    { name: "Veg Biryani", price: "$10.99" },
    { name: "Mutton Biryani", price: "$15.49" },
    { name: "Butter Chicken", price: "$13.49" },
    { name: "Paneer Tikka", price: "$11.99" },
    { name: "Garlic Naan", price: "$3.49" },
  ];
  return (
    <div className="flex h-full w-full gap-2.5">
      <div className="flex flex-1 flex-col">
        <div className="flex gap-3 text-[10px] md:text-[12px]">
          <span className="font-semibold text-primary-ink">Biryani</span>
          <span className="text-mid-gray">Curries</span>
          <span className="text-mid-gray">Breads</span>
          <span className="text-mid-gray">Drinks</span>
        </div>
        <div className="mt-2.5 grid grid-cols-3 gap-2">
          {items.map((it) => (
            <div key={it.name} className="rounded-[10px] bg-canvas p-1.5 md:p-2">
              <div className="h-7 rounded-[6px] bg-cool-wash md:h-9" />
              <p className="mt-1 truncate text-[9px] font-medium text-primary-ink md:text-[11px]">
                {it.name}
              </p>
              <p className="text-[9px] text-mid-gray md:text-[10px]">{it.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-[34%] flex-col rounded-[10px] bg-canvas p-2 md:p-2.5">
        <p className="text-[10px] font-semibold text-primary-ink md:text-[11px]">
          Order #24
        </p>
        <div className="mt-2 flex flex-col gap-1.5">
          {[
            ["2× Chicken Biryani", "$25.98"],
            ["1× Butter Chicken", "$13.49"],
            ["1× Garlic Naan", "$3.49"],
          ].map(([n, p]) => (
            <div key={n} className="flex justify-between text-[8px] md:text-[10px]">
              <span className="truncate pr-1 text-primary-ink">{n}</span>
              <span className="shrink-0 text-mid-gray">{p}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex justify-between border-t border-hairline pt-1.5 text-[10px] font-semibold text-primary-ink md:text-[12px]">
          <span>Total</span>
          <span>$42.96</span>
        </div>
      </div>
    </div>
  );
}

function CheckoutScreen() {
  const methods = ["Card", "Cash", "UPI / QR", "Split"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
      <p className="text-[9px] uppercase tracking-wide text-mid-gray md:text-[11px]">
        Amount due
      </p>
      <p className="font-sf-pro-display text-[26px] font-bold tracking-tight text-primary-ink md:text-[36px]">
        $64.37
      </p>
      <div className="grid w-full max-w-[260px] grid-cols-2 gap-2">
        {methods.map((m, i) => (
          <div
            key={m}
            className={`rounded-[10px] px-2 py-1.5 text-center text-[10px] font-medium md:text-[12px] ${
              i === 0
                ? "bg-electric-blue text-paper"
                : "bg-canvas text-primary-ink"
            }`}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-electric-blue md:text-[12px]">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-electric-blue text-paper">
          <CheckIcon width={11} height={11} />
        </span>
        Payment Approved
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  const stats = [
    { label: "Today's Sales", value: "$2,847" },
    { label: "Orders", value: "128" },
    { label: "Avg Ticket", value: "$22.24" },
  ];
  const bars = [42, 66, 52, 80, 58, 72, 48];
  return (
    <div className="flex h-full w-full flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[10px] bg-canvas p-2 md:p-2.5">
            <p className="text-[7px] uppercase tracking-wide text-mid-gray md:text-[9px]">
              {s.label}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold text-primary-ink md:text-[18px]">
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-[10px] bg-canvas p-2.5 md:gap-2 md:p-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-[3px] ${
              i % 2 === 0 ? "bg-electric-blue" : "bg-cool-wash"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function OrdersScreen() {
  const orders = [
    { source: "Chefgaa Online", title: "Order #128", status: "New", color: "text-electric-blue" },
    { source: "UberEats", title: "Order #127", status: "Preparing", color: "text-ember" },
    { source: "DoorDash", title: "Order #126", status: "Ready", color: "text-primary-ink" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2">
      {orders.map((o) => (
        <div
          key={o.title}
          className="flex items-center justify-between rounded-[10px] bg-canvas p-2 md:p-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-[7px] uppercase tracking-wide text-mid-gray md:text-[9px]">
              {o.source}
            </p>
            <p className="text-[10px] font-semibold text-primary-ink md:text-[12px]">
              {o.title}
            </p>
          </div>
          <span className={`shrink-0 text-[9px] font-medium md:text-[11px] ${o.color}`}>
            {o.status}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
 * Device frame — dark countertop POS terminal, pure CSS.
 * ============================================================ */

function PosDeviceFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-full rounded-[28px] bg-primary-ink p-2.5 md:p-3">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[16px] bg-paper">
          {children}
        </div>
      </div>
      {/* stand neck + base — reads as a countertop terminal */}
      <div className="h-3 w-16 rounded-b-[6px] bg-deep-gray md:w-20" />
      <div className="h-2 w-36 rounded-full bg-deep-gray md:w-52" />
    </div>
  );
}

/* ============================================================
 * Step content
 * ============================================================ */

type Step = {
  label: string;
  heading: string;
  body: string;
  Screen: () => ReactNode;
};

const STEPS: Step[] = [
  {
    label: "01 — Ordering",
    heading: "Take orders in seconds",
    body: "A fast, tappable menu and a live order summary keep every ticket moving.",
    Screen: MenuScreen,
  },
  {
    label: "02 — Payments",
    heading: "Payments, every way guests pay",
    body: "Card, cash, UPI, or split — approved in a tap, every single time.",
    Screen: CheckoutScreen,
  },
  {
    label: "03 — Insights",
    heading: "Know your business in real time",
    body: "Sales, orders, and average ticket, updating live as you serve.",
    Screen: AnalyticsScreen,
  },
  {
    label: "04 — Online",
    heading: "Online orders flow straight in",
    body: "Chefgaa, UberEats, and DoorDash orders all land in one clean queue.",
    Screen: OrdersScreen,
  },
];

function Caption({ step }: { step: Step }) {
  return (
    <div className="max-w-[320px]">
      <p className="text-[14px] font-medium text-ember">{step.label}</p>
      <h3 className="mt-2 font-sf-pro-display text-[28px] font-semibold leading-tight tracking-[-0.01em] text-primary-ink md:text-[32px] lg:text-[40px]">
        {step.heading}
      </h3>
      <p className="mt-3 text-[17px] leading-[1.47] text-mid-gray">{step.body}</p>
    </div>
  );
}

/* ============================================================
 * Main component
 * ============================================================ */

export default function PosShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Opacity + subtle y for each step, synced to scroll thresholds.
  const o0 = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);

  const y0 = useTransform(scrollYProgress, [0, 0.2, 0.25], [0, 0, -20]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [20, 0, 0, -20]);
  const y2 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [20, 0, 0, -20]);
  const y3 = useTransform(scrollYProgress, [0.75, 0.8, 1], [20, 0, 0]);

  const ops: MotionValue<number>[] = [o0, o1, o2, o3];
  const ys: MotionValue<number>[] = [y0, y1, y2, y3];

  return (
    <section className="bg-canvas">
      {/* Intro — normal flow, standard section padding */}
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-16 md:px-10 md:pt-[120px]">
        <SectionHeading
          title="Meet the Chefgaa POS."
          intro="One terminal for orders, payments, and insights — watch it work."
          align="center"
        />
      </div>

      {/* ---------- Desktop: pinned scroll-driven ---------- */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: "400vh" }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center gap-8 px-10">
            {/* Left captions — steps 01 & 03 */}
            <div className="relative h-[360px]">
              {[0, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{ opacity: ops[i], y: ys[i] }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <Caption step={STEPS[i]} />
                </motion.div>
              ))}
            </div>

            {/* Device — screens crossfade */}
            <div className="relative">
              <PosDeviceFrame className="w-[500px]">
                {STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    style={{ opacity: ops[i], y: ys[i] }}
                    className="absolute inset-0 p-3 md:p-4"
                  >
                    <step.Screen />
                  </motion.div>
                ))}
              </PosDeviceFrame>
            </div>

            {/* Right captions — steps 02 & 04 */}
            <div className="relative h-[360px]">
              {[1, 3].map((i) => (
                <motion.div
                  key={i}
                  style={{ opacity: ops[i], y: ys[i] }}
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <Caption step={STEPS[i]} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile: simple stacked steps ---------- */}
      <div className="flex flex-col gap-16 px-6 pb-16 pt-12 md:hidden">
        {STEPS.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <PosDeviceFrame className="w-full max-w-[340px]">
              <div className="absolute inset-0 p-3">
                <step.Screen />
              </div>
            </PosDeviceFrame>
            <div className="mt-8 text-center">
              <p className="text-[14px] font-medium text-ember">{step.label}</p>
              <h3 className="mt-2 font-sf-pro-display text-[28px] font-semibold leading-tight tracking-[-0.01em] text-primary-ink">
                {step.heading}
              </h3>
              <p className="mx-auto mt-3 max-w-[320px] text-[17px] leading-[1.47] text-mid-gray">
                {step.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
