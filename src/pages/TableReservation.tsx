import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { FAQ } from "../components/FAQ";
import { CTABand } from "../components/CTABand";
import { PrimaryButton, ArrowLink } from "../components/Buttons";
import { CalendarIcon, UsersIcon, ClockIcon, ShieldIcon } from "../components/Icons";

const features = [
  {
    title: "Real-Time Availability",
    body: "Guests see open tables instantly and book in seconds.",
    icon: <CalendarIcon />,
    tint: "sky" as const,
  },
  {
    title: "Guest Management",
    body: "Track preferences and history to make every visit personal.",
    icon: <UsersIcon />,
    tint: "starlight" as const,
  },
  {
    title: "Automated Reminders",
    body: "Confirmation and reminder messages that reduce no-shows.",
    icon: <ClockIcon />,
    tint: "citrus" as const,
  },
  {
    title: "No-Show Protection",
    body: "Optional holds and deposits protect your busiest seatings.",
    icon: <ShieldIcon />,
    tint: "silver" as const,
  },
];

const faqs = [
  {
    question: "Can guests book directly from my website?",
    answer:
      "Yes. Reservations live right on your site, so guests book without ever leaving your brand.",
  },
  {
    question: "Will this help reduce no-shows?",
    answer:
      "Automated reminders and optional deposits meaningfully cut down on missed reservations.",
  },
  {
    question: "Can I manage walk-ins too?",
    answer:
      "Yes. Combine reservations and walk-ins in one view to keep your floor running smoothly.",
  },
  {
    question: "Does it remember returning guests?",
    answer:
      "Guest profiles capture preferences and visit history so your team can deliver a personal welcome every time.",
  },
];

export function TableReservation() {
  return (
    <>
      <PageHero
        eyebrow="Table Reservation"
        title="Fill every seat, effortlessly."
        subtitle="A reservation system that keeps your floor full and your guests looked after."
      >
        <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
        <ArrowLink to="/pricing">Explore Pricing</ArrowLink>
      </PageHero>

      <Section bg="gray">
        <SectionHeading
          title="Reservations, handled."
          intro="From the first booking to the final check, keep your tables working for you."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </Section>

      <FAQ items={faqs} bg="white" />

      <CTABand
        title="Turn tables into revenue."
        subtitle="Smart reservations that protect your busiest nights."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="gray"
      />
    </>
  );
}
