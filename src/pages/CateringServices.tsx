import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { FAQ } from "../components/FAQ";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/Reveal";
import { PrimaryButton, ArrowLink } from "../components/Buttons";
import { OrderIcon, TruckIcon, CalendarIcon, AnalyticsIcon } from "../components/Icons";

const features = [
  {
    title: "Easy Event Ordering",
    body: "Large-format orders made simple, from quote to confirmation.",
    icon: <OrderIcon />,
    tint: "citrus" as const,
  },
  {
    title: "On-Time Delivery",
    body: "Coordinate logistics so every event is served right on schedule.",
    icon: <TruckIcon />,
    tint: "sky" as const,
  },
  {
    title: "Order Tracking & Scheduling",
    body: "Plan ahead with clear timelines and live status for every order.",
    icon: <CalendarIcon />,
    tint: "starlight" as const,
  },
  {
    title: "Grow Event Revenue",
    body: "Turn catering into a dependable, high-margin revenue stream.",
    icon: <AnalyticsIcon />,
    tint: "blush" as const,
  },
];

const faqs = [
  {
    question: "Can I take catering orders online?",
    answer:
      "Yes. Guests can request catering directly through your site with all the details you need to prepare.",
  },
  {
    question: "How far in advance can events be scheduled?",
    answer:
      "You set your own lead times, so you always have enough runway to prep large orders confidently.",
  },
  {
    question: "Can I track multiple events at once?",
    answer:
      "Absolutely. Every catering order has its own timeline and status so nothing gets missed on a busy week.",
  },
];

export function CateringServices() {
  return (
    <>
      <PageHero
        eyebrow="Catering Services"
        title="Catering, Simplified."
        subtitle="Handle big orders with the same ease as everyday service — and grow a whole new revenue stream."
      >
        <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
        <ArrowLink to="/pricing">Explore Pricing</ArrowLink>
      </PageHero>

      <Section bg="gray">
        <SectionHeading
          title="From inquiry to event, in one flow."
          intro="Everything you need to quote, schedule, and deliver catering that keeps clients coming back."
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </Section>

      <Section bg="white">
        <Reveal className="mx-auto max-w-[820px] text-center">
          <p className="font-sf-pro-display text-[28px] font-semibold leading-[1.25] text-primary-ink md:text-[40px] md:leading-[1.2]">
            &ldquo;Chefgaa turned catering from our most stressful service into our
            most profitable one. Orders are organized, on time, and effortless.&rdquo;
          </p>
          <p className="mt-8 text-[17px] text-mid-gray">
            Priya Nair — Owner, Spice Route Kitchen
          </p>
        </Reveal>
      </Section>

      <FAQ items={faqs} bg="gray" />

      <CTABand
        title="Make catering your next growth engine."
        subtitle="Simplify big orders and delight every event client."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="white"
      />
    </>
  );
}
