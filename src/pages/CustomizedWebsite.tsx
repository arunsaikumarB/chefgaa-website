import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { FAQ } from "../components/FAQ";
import { CTABand } from "../components/CTABand";
import { PrimaryButton, ArrowLink } from "../components/Buttons";
import { SparkleIcon, AnalyticsIcon, GlobeIcon, OrderIcon } from "../components/Icons";

const features = [
  {
    title: "Fully Branded Design",
    body: "A website that looks unmistakably yours — colors, type, and voice.",
    icon: <SparkleIcon />,
    tint: "blush" as const,
  },
  {
    title: "SEO Optimized",
    body: "Built to be found, so new guests discover you on search.",
    icon: <AnalyticsIcon />,
    tint: "citrus" as const,
  },
  {
    title: "Mobile First",
    body: "Designed for the phone in every guest's hand, first.",
    icon: <GlobeIcon />,
    tint: "sky" as const,
  },
  {
    title: "Integrated Ordering",
    body: "Online ordering baked right in — no clunky third-party redirects.",
    icon: <OrderIcon />,
    tint: "starlight" as const,
  },
];

const faqs = [
  {
    question: "Do I own my website?",
    answer:
      "Yes. Your Chefgaa website is built around your brand and your domain — it's yours.",
  },
  {
    question: "Can I update content myself?",
    answer:
      "Menus, hours, and promotions are easy to update, and our team is always available to help with bigger changes.",
  },
  {
    question: "Is online ordering included?",
    answer:
      "Yes. Ordering is integrated directly into your site so guests never leave your brand experience.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Most restaurants go live within a couple of weeks, depending on how much custom content you need.",
  },
];

export function CustomizedWebsite() {
  return (
    <>
      <PageHero
        eyebrow="Customized Website"
        title="Your Restaurant. Your Brand. Your Website."
        subtitle="A beautiful, high-performing website designed around your restaurant — with ordering built in."
      >
        <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
        <ArrowLink to="/pricing">Explore Pricing</ArrowLink>
      </PageHero>

      <Section bg="gray">
        <SectionHeading
          title="Everything a modern restaurant site should be."
          intro="Fast, findable, and unmistakably yours — on every device."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </Section>

      <FAQ items={faqs} bg="white" />

      <CTABand
        title="Let's build your website."
        subtitle="A branded site with ordering, ready to bring in more guests."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="gray"
      />
    </>
  );
}
