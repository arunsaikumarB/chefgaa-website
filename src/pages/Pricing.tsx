import { PageHero } from "../components/PageHero";
import { Section } from "../components/Section";
import { CTABand } from "../components/CTABand";
import { FAQ } from "../components/FAQ";
import { Reveal } from "../components/Reveal";
import { PrimaryButton, GhostButton } from "../components/Buttons";
import { CheckIcon } from "../components/Icons";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Silver",
    price: "$79.99",
    cadence: "/mo",
    tagline: "Everything you need to start selling smarter.",
    features: [
      "Smart POS System",
      "Online Ordering",
      "Menu Management",
      "Multi-Payment Support",
      "Email Support",
    ],
  },
  {
    name: "Gold",
    price: "$149.99",
    cadence: "/mo",
    tagline: "The complete toolkit for a growing restaurant.",
    featured: true,
    features: [
      "Everything in Silver",
      "Table Reservations",
      "Marketing & Promotions",
      "Real-Time Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Platinum",
    price: "$249.99",
    cadence: "/mo",
    tagline: "Scale across locations with white-glove service.",
    features: [
      "Everything in Gold",
      "Catering Management",
      "Customized Website",
      "Multi-Location Support",
      "Dedicated Account Manager",
    ],
  },
];

const faqs = [
  {
    question: "Are there any hidden fees?",
    answer:
      "No. Chefgaa pricing is transparent — no setup fees and no commissions on your online orders.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Upgrade or adjust your plan at any time as your restaurant grows.",
  },
  {
    question: "Is support really included on every plan?",
    answer:
      "Yes. Every Chefgaa plan includes 24/7 support — higher tiers add priority and dedicated account management.",
  },
];

export function Pricing() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans that grow with you."
        subtitle="Simple, transparent pricing for restaurants of every size. No hidden fees, ever."
      />

      <Section bg="white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08} className="h-full">
              <div
                className={`flex h-full flex-col rounded-[28px] bg-canvas p-8 md:p-10 ${
                  plan.featured ? "lg:-translate-y-3" : ""
                }`}
              >
                {plan.featured && (
                  <p className="mb-3 text-[14px] font-medium text-ember">
                    Most Popular
                  </p>
                )}
                <h3 className="font-sf-pro-display text-[32px] font-semibold leading-none">
                  {plan.name}
                </h3>
                <p className="mt-4 text-[17px] leading-[1.4] text-mid-gray">
                  {plan.tagline}
                </p>
                <div className="mt-8 flex items-baseline gap-1">
                  <span className="font-sf-pro-display text-[56px] font-bold leading-none tracking-[-0.2px]">
                    {plan.price}
                  </span>
                  <span className="text-[17px] text-mid-gray">{plan.cadence}</span>
                </div>

                <ul className="mt-8 flex flex-col gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric-blue text-paper">
                        <CheckIcon width={14} height={14} />
                      </span>
                      <span className="text-[17px] leading-snug text-primary-ink">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-2">
                  {plan.featured ? (
                    <PrimaryButton to="/contact" className="w-full">
                      Request a Demo
                    </PrimaryButton>
                  ) : (
                    <GhostButton to="/contact" className="w-full">
                      Get Started
                    </GhostButton>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-[17px] text-mid-gray">
          All plans include 24/7 support.
        </p>
      </Section>

      <FAQ items={faqs} bg="gray" />

      <CTABand
        title="Not sure which plan fits?"
        subtitle="Tell us about your restaurant and we'll help you choose."
        primaryLabel="Request a Demo"
        primaryTo="/contact"
        bg="white"
      />
    </>
  );
}
