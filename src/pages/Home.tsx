import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { ModulesCarousel } from "../components/ModulesCarousel";
import { CheckList } from "../components/CheckList";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/Reveal";
import { PrimaryButton, ArrowLink } from "../components/Buttons";

const PosShowcase = lazy(() => import("../components/PosShowcase"));
const EcosystemSection = lazy(() => import("../components/ecosystem/EcosystemSection"));

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
      <section className="hero-section bg-paper">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-sf-pro-display text-[40px] font-bold leading-[1.05] tracking-[-0.5px] text-primary-ink md:text-[64px] md:tracking-[-0.8px] lg:text-[72px] lg:leading-[1.05] lg:tracking-[-1px] xl:text-[88px] xl:leading-[1.04]">
              <span className="block md:whitespace-nowrap">All-in-One POS &amp; Online Ordering</span>
              <span className="block md:whitespace-nowrap">for Restaurants.</span>
            </h1>
            <p className="mt-6 w-full text-[17px] leading-[1.47] text-mid-gray sm:text-[18px] md:whitespace-nowrap md:text-[19px] xl:text-[21px]">
              Streamline operations, boost sales, and enhance customer experience with Chefgaa&apos;s powerful restaurant management solution.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
              <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
              <ArrowLink to="/contact">Get in Touch</ArrowLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Module carousel */}
      <ModulesCarousel />

      {/* Chefgaa Ecosystem — premium interactive */}
      <Suspense fallback={null}>
        <EcosystemSection />
      </Suspense>

      {/* POS band */}
      <Section bg="gray">
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
          className="lg:max-w-none"
          titleClassName="whitespace-normal lg:whitespace-nowrap lg:text-[48px] xl:text-[56px]"
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
          <h2 className="font-sf-pro-display text-[32px] font-semibold leading-[1.07] tracking-[-0.01em] md:text-[40px] lg:text-[56px] lg:tracking-[-0.2px]">
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
          className="lg:max-w-none"
          titleClassName="whitespace-normal lg:whitespace-nowrap lg:text-[48px] xl:text-[56px]"
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
