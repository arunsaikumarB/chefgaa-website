import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import type { PastelTint } from "../components/FeatureCard";
import { CheckList } from "../components/CheckList";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/Reveal";
import { PrimaryButton, ArrowLink } from "../components/Buttons";
import {
  PosIcon,
  OrderIcon,
  MenuIcon,
  MegaphoneIcon,
  AnalyticsIcon,
  PaymentIcon,
} from "../components/Icons";

const PosShowcase = lazy(() => import("../components/PosShowcase"));

const features: {
  title: string;
  body: string;
  icon: React.ReactNode;
  tint: PastelTint;
}[] = [
  {
    title: "Smart POS System",
    body: "A fast, intuitive point-of-sale built for the pace of a busy restaurant floor.",
    icon: <PosIcon />,
    tint: "sky",
  },
  {
    title: "Online Ordering",
    body: "Take orders directly from your own site for pickup and delivery — commission-free.",
    icon: <OrderIcon />,
    tint: "citrus",
  },
  {
    title: "Menu Management",
    body: "Update items, prices, and availability in real time across every channel.",
    icon: <MenuIcon />,
    tint: "starlight",
  },
  {
    title: "Marketing & Promotions",
    body: "Launch offers, loyalty rewards, and campaigns that bring guests back.",
    icon: <MegaphoneIcon />,
    tint: "blush",
  },
  {
    title: "Real-Time Analytics",
    body: "See sales, trends, and performance the moment they happen.",
    icon: <AnalyticsIcon />,
    tint: "silver",
  },
  {
    title: "Multi-Payment Support",
    body: "Accept cards, wallets, and contactless payments with a single flow.",
    icon: <PaymentIcon />,
    tint: "indigo",
  },
];

const posBullets = [
  { title: "Easy-to-Use Interface", body: "Onboard staff in minutes, not weeks." },
  { title: "Fast Order Processing", body: "Keep tickets moving during the rush." },
  { title: "Inventory & Stock Management", body: "Track stock levels automatically." },
  { title: "Multiple Payment Options", body: "Card, wallet, and contactless at the tap." },
  { title: "Customer Data & Insights", body: "Understand your regulars and their habits." },
  { title: "Optimized Table Turnover", body: "Serve more covers without the chaos." },
];

const orderingBullets = [
  { title: "Seamless Menu Integration", body: "Your live menu, always in sync." },
  { title: "Real-Time Order Tracking", body: "Guests follow every step to their door." },
  { title: "Pickup & Delivery", body: "Flexible fulfillment for every order." },
  { title: "Secure Checkout", body: "Protected payments guests can trust." },
  { title: "Google Maps Integration", body: "Accurate addresses and delivery routing." },
  { title: "Mobile-Friendly", body: "A flawless experience on any device." },
];

const whyChefgaa = [
  { title: "No Hidden Fees", body: "Transparent pricing with no surprise commissions." },
  { title: "100% Customizable", body: "Shape Chefgaa around the way you run service." },
  { title: "24/7 Dedicated Support", body: "Real people, ready whenever you need them." },
  { title: "Scalable & Future-Proof", body: "From one location to many — Chefgaa grows with you." },
];

const integrations = ["Clover", "Stripe", "Zeeko", "UberEats", "DoorDash", "NMI"];

export function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper pt-[108px] pb-16 md:pt-[164px] md:pb-[120px]">
        <div className="mx-auto w-full max-w-[1000px] px-6 md:px-10">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.5px] text-primary-ink md:text-[72px] md:tracking-[-1.2px] lg:text-[96px] lg:leading-[1.04] lg:tracking-[-1.44px]">
              All-in-One POS &amp; Online Ordering for Restaurants.
            </h1>
            <p className="mt-6 max-w-[620px] text-[19px] leading-[1.4] text-mid-gray md:text-[21px]">
              Streamline operations, boost sales, and enhance customer experience
              with Chefgaa&apos;s powerful restaurant management solution.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
              <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
              <ArrowLink to="/contact">Get in Touch</ArrowLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature grid */}
      <Section bg="gray">
        <SectionHeading
          title="Everything your restaurant needs, in one place."
          intro="Six powerful tools working together — so you can spend less time managing software and more time serving guests."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard
              key={f.title}
              title={f.title}
              body={f.body}
              icon={f.icon}
              tint={f.tint}
              delay={(i % 3) * 0.08}
            />
          ))}
        </div>
      </Section>

      {/* POS band */}
      <Section bg="white">
        <SectionHeading
          title="Built for Speed & Efficiency"
          intro="The Chefgaa POS keeps your front and back of house in perfect sync."
        />
        <CheckList items={posBullets} columns={3} />
      </Section>

      {/* Scroll-driven POS showcase */}
      <Suspense fallback={null}>
        <PosShowcase />
      </Suspense>

      {/* Online ordering band */}
      <Section bg="white">
        <SectionHeading
          title="Take Your Restaurant Online"
          intro="Own your online ordering experience — from browsing the menu to the moment it arrives."
        />
        <CheckList items={orderingBullets} columns={3} />
      </Section>

      {/* Why Chefgaa */}
      <Section bg="gray">
        <SectionHeading title="Why Chefgaa" />
        <CheckList items={whyChefgaa} columns={2} />
      </Section>

      {/* Pricing teaser */}
      <Section bg="white">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="font-sf-pro-display text-[32px] font-semibold leading-[1.07] tracking-[-0.01em] md:text-[40px] lg:text-[56px] lg:tracking-[-0.28px]">
            Plans that grow with you.
          </h2>
          <p className="mt-5 max-w-[520px] text-[19px] leading-[1.4] text-mid-gray md:text-[21px]">
            Simple, transparent pricing for restaurants of every size.
          </p>
          <div className="mt-8">
            <ArrowLink to="/pricing">Explore Pricing</ArrowLink>
          </div>
        </Reveal>
      </Section>

      {/* Integrations */}
      <Section bg="gray">
        <SectionHeading
          title="Works with the tools you already use."
          align="center"
        />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((name, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="flex h-20 items-center justify-center rounded-[28px] bg-paper">
                <span className="font-sf-pro-display text-[17px] font-semibold text-quiet-dot">
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <CTABand
        title="Ready to get started?"
        subtitle="Join the restaurants running smarter service with Chefgaa."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="white"
      />
    </>
  );
}
