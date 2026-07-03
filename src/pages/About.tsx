import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { CTABand } from "../components/CTABand";
import { Reveal } from "../components/Reveal";

const values = [
  {
    title: "Hospitality First",
    body: "Every feature we build starts with a simple question: does this help you take better care of your guests?",
    tint: "starlight" as const,
  },
  {
    title: "Honest by Design",
    body: "No hidden fees, no surprise commissions. Straightforward pricing you can plan around.",
    tint: "sky" as const,
  },
  {
    title: "Built to Last",
    body: "Reliable tools that scale from a single counter to a growing group of locations.",
    tint: "citrus" as const,
  },
  {
    title: "Always in Your Corner",
    body: "Real, dedicated support around the clock — because restaurants never really close.",
    tint: "blush" as const,
  },
];

export function About() {
  return (
    <>
      <PageHero
        eyebrow="About Chefgaa"
        title="At the intersection of hospitality and innovation."
        subtitle="We build the technology that lets restaurants do what they do best — take great care of their guests."
      />

      <Section bg="gray">
        <Reveal className="mx-auto max-w-[760px]">
          <p className="text-[21px] leading-[1.5] text-primary-ink md:text-[24px] md:leading-[1.5]">
            Chefgaa began with a belief that restaurant technology should feel as
            considered as the food it serves. Too many operators were stitching
            together clunky point-of-sale systems, commission-hungry delivery
            apps, and websites that didn&apos;t reflect their brand.
          </p>
          <p className="mt-6 text-[17px] leading-[1.6] text-mid-gray">
            So we built one platform to bring it all together — POS, online
            ordering, reservations, catering, and a website that&apos;s truly
            yours. The result is a system that streamlines operations, boosts
            sales, and puts the guest experience back at the center of the table.
            Today, Chefgaa helps restaurants of every size run smarter, calmer,
            more profitable service.
          </p>
        </Reveal>
      </Section>

      <Section bg="white">
        <SectionHeading
          title="What we stand for."
          intro="The values that shape every decision we make."
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <FeatureCard key={v.title} {...v} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </Section>

      <CTABand
        title="Let's build something great together."
        subtitle="See how Chefgaa can transform the way you run service."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        secondaryLabel="Explore Pricing"
        secondaryTo="/pricing"
        bg="gray"
      />
    </>
  );
}
