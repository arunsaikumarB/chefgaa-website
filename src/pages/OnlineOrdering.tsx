import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { CheckList } from "../components/CheckList";
import { FAQ } from "../components/FAQ";
import { CTABand } from "../components/CTABand";
import { PrimaryButton, ArrowLink } from "../components/Buttons";
import { OrderIcon, ShieldIcon, ClockIcon, GlobeIcon, PaymentIcon } from "../components/Icons";

const features = [
  {
    title: "Convenience at Your Fingertips",
    body: "Guests order in a few taps — from anywhere, at any time.",
    icon: <OrderIcon />,
    tint: "sky" as const,
  },
  {
    title: "Safe & Secure Payments",
    body: "PCI-compliant checkout keeps every transaction protected.",
    icon: <ShieldIcon />,
    tint: "citrus" as const,
  },
  {
    title: "Real-Time Updates",
    body: "Live order status keeps guests informed from kitchen to door.",
    icon: <ClockIcon />,
    tint: "starlight" as const,
  },
  {
    title: "Web + Mobile Responsive",
    body: "A seamless ordering flow on desktop, tablet, and phone.",
    icon: <GlobeIcon />,
    tint: "silver" as const,
  },
  {
    title: "Native App",
    body: "Give loyal guests a branded app they can keep on their home screen.",
    icon: <PaymentIcon />,
    tint: "blush" as const,
  },
];

const benefits = [
  { title: "Boost Revenue", body: "Capture more orders without paying aggregator commissions." },
  { title: "Minimize Errors", body: "Digital tickets remove the guesswork from every order." },
  { title: "Data-Driven Insights", body: "Learn what sells and when, then act on it." },
  { title: "Aggregator Order Management", body: "Bring third-party orders into one unified view." },
];

const faqs = [
  {
    question: "Do I pay commission on online orders?",
    answer:
      "No. Orders placed through your Chefgaa site are commission-free — you keep the full value of every sale.",
  },
  {
    question: "Can guests order for both pickup and delivery?",
    answer:
      "Yes. You control which fulfillment options are available, and guests choose what works for them at checkout.",
  },
  {
    question: "Does online ordering sync with my POS?",
    answer:
      "Absolutely. Online orders flow directly into your Chefgaa POS so your kitchen sees everything in one place.",
  },
  {
    question: "Can I manage orders from delivery aggregators too?",
    answer:
      "Yes. Chefgaa consolidates aggregator orders alongside your direct orders so nothing slips through the cracks.",
  },
];

export function OnlineOrdering() {
  return (
    <>
      <PageHero
        eyebrow="Online Ordering"
        title="Take your restaurant online."
        subtitle="A commission-free ordering experience that guests love and your kitchen can rely on."
      >
        <PrimaryButton to="/contact">Request a Demo</PrimaryButton>
        <ArrowLink to="/pricing">Explore Pricing</ArrowLink>
      </PageHero>

      <Section bg="gray">
        <SectionHeading
          title="Convenience at your fingertips."
          intro="Everything guests need to order with confidence — and everything you need to fulfill with ease."
          className="mb-14"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={(i % 3) * 0.08} />
          ))}
        </div>
      </Section>

      <Section bg="white">
        <SectionHeading
          title="Built to grow your business."
          intro="Online ordering isn't just convenient — it's a measurable lift for your bottom line."
          className="mb-14"
        />
        <CheckList items={benefits} columns={2} />
      </Section>

      <FAQ items={faqs} bg="gray" />

      <CTABand
        title="Bring your menu online."
        subtitle="Launch commission-free ordering in days, not months."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="white"
      />
    </>
  );
}
