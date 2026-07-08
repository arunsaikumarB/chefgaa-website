import { PricingHero } from "../components/pricing/PricingHero";
import { PricingPlans } from "../components/pricing/PricingPlans";
import { PricingEnterprise } from "../components/pricing/PricingEnterprise";
import { PricingCompare } from "../components/pricing/PricingCompare";
import { PricingFAQ } from "../components/pricing/PricingFAQ";
import { PricingCTA } from "../components/pricing/PricingCTA";

export function Pricing() {
  return (
    <div className="bg-white">
      <PricingHero />
      <PricingPlans />
      <PricingEnterprise />
      <PricingCompare />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
}
