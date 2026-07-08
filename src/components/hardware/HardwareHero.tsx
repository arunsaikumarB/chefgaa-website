import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { GhostButton } from "../Buttons";
import { ProductVisual } from "./HardwareVisuals";

export function HardwareHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-paper pt-28 pb-16 md:pt-36 md:pb-24">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(600px,70vw)] w-[min(600px,70vw)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(250,144,64,0.15) 0%, rgba(237,60,24,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-hairline/80 bg-paper px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-chefgaa-red shadow-sm">
            Chefgaa Hardware
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.5px] text-[#111111] md:text-[56px] lg:text-[72px] lg:tracking-[-1px]">
            Built for every restaurant.
            <br />
            Designed to work together.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[640px] text-[18px] leading-[1.5] text-[#666666] md:text-[21px]">
            Powerful restaurant hardware designed to seamlessly connect with the Chefgaa Restaurant Operating System.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#categories"
              className="inline-flex items-center justify-center rounded-full bg-[#ED3C18] px-7 py-3 text-[17px] font-medium text-white transition-opacity hover:opacity-90"
            >
              Explore Hardware
            </a>
            <GhostButton to="/contact">Request Demo</GhostButton>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-14 md:mt-20">
          <ProductVisual product="hero" floating={!reduce} />
        </Reveal>
      </div>
    </section>
  );
}

export function HardwareCategories() {
  const categories = [
    { id: "pos-terminal" as const, title: "POS Terminal", description: "A fast, intuitive countertop terminal built for high-volume restaurant service.", tint: "from-[#fff4f0] to-[#fffaf7]" },
    { id: "receipt-printer" as const, title: "Receipt Printer", description: "Thermal printing that keeps tickets moving — fast, quiet, and reliable.", tint: "from-[#f8f9fa] to-[#ffffff]" },
    { id: "barcode-scanner" as const, title: "Barcode Scanner", description: "Instant inventory scanning with seamless POS integration.", tint: "from-[#f0f7ff] to-[#ffffff]" },
    { id: "cash-drawer" as const, title: "Cash Drawer", description: "Secure, durable cash management that opens automatically with every sale.", tint: "from-[#f5f0ff] to-[#ffffff]" },
    { id: "kitchen-display" as const, title: "Kitchen Display", description: "Real-time order routing that keeps your back of house in perfect sync.", tint: "from-[#fff8f0] to-[#ffffff]" },
    { id: "customer-display" as const, title: "Customer Display", description: "Face guests with clear totals, tips, and payment prompts at checkout.", tint: "from-[#f0faf5] to-[#ffffff]" },
  ];

  return (
    <section id="categories" className="bg-[#F8F9FA] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <Reveal>
          <h2 className="text-center font-sf-pro-display text-[32px] font-semibold tracking-[-0.01em] text-[#111111] md:text-[48px]">
            Hardware for every station
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[18px] leading-[1.5] text-[#666666]">
            From the counter to the kitchen — every device is designed to work as one system.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.06}>
              <CategoryCard {...cat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  id,
  title,
  description,
  tint,
}: {
  id: "pos-terminal" | "receipt-printer" | "barcode-scanner" | "cash-drawer" | "kitchen-display" | "customer-display";
  title: string;
  description: string;
  tint: string;
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col overflow-hidden rounded-[28px] border border-black/[0.04] bg-gradient-to-br ${tint} p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]`}
      style={{ willChange: "transform" }}
    >
      <div className="flex min-h-[180px] items-center justify-center">
        <ProductVisual product={id} floating />
      </div>
      <h3 className="mt-6 font-sf-pro-display text-[24px] font-semibold text-[#111111]">{title}</h3>
      <p className="mt-2 text-[16px] leading-[1.55] text-[#666666]">{description}</p>
      <Link
        to="/contact"
        className="mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-[#ED3C18] transition-colors group-hover:gap-2"
      >
        Learn More
        <ArrowRight size={16} />
      </Link>
    </motion.article>
  );
}
