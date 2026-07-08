import { useState } from "react";
import { PricingHero } from "../components/pricing/PricingHero";
import { PricingCards } from "../components/pricing/PricingCards";
import { PricingWhy } from "../components/pricing/PricingWhy";
import { PricingCompare } from "../components/pricing/PricingCompare";
import { PricingHardware } from "../components/pricing/PricingHardware";
import { PricingTrust } from "../components/pricing/PricingTrust";
import { PricingFAQ } from "../components/pricing/PricingFAQ";
import { PricingFinalCTA } from "../components/pricing/PricingFinalCTA";
import type { BillingPeriod } from "../components/pricing/pricingData";

export function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <div className="overflow-x-clip bg-white">
      <PricingHero billing={billing} onBillingChange={setBilling} />
      <PricingCards billing={billing} />
      <PricingWhy />
      <PricingCompare />
      <PricingHardware />
      <PricingTrust />
      <PricingFAQ />
      <PricingFinalCTA />
    </div>
  );
}
