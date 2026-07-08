import { HardwareHero } from "../components/hardware/HardwareHero";
import { HardwareCompare } from "../components/hardware/HardwareCompare";
import {
  HardwareMobileFeature,
  HardwareAccessories,
  HardwarePeaceOfMind,
  HardwareUseCases,
  HardwareResources,
} from "../components/hardware/HardwareSquareSections";

export function Hardware() {
  return (
    <>
      <HardwareHero />
      <HardwareCompare />
      <HardwareMobileFeature />
      <HardwareAccessories />
      <HardwarePeaceOfMind />
      <HardwareUseCases />
      <HardwareResources />
    </>
  );
}
