import type SowingRateFetchedInterface from "./SowingRateFetchedInterface";

export default interface SowingRateInterface {
  // input data
  culture: string;
  coefficientSecurity: number;
  wantedPlantsPerMeterSquared: number;
  massPer1000g: number;
  purity: number;
  germination: number;
  rowSpacingCm: number;

  // output data
  sowingRateSafeSeedsPerMeterSquared: number;
  sowingRatePlantsPerDecare: number;
  usedSeedsKgPerDecare: number;
  internalRowHeightCm: number;

  // funcs
  CmToMeters(cm: number): number;
  MetersToCm(meters: number): number;
  MetersSquaredToDecare(metersSquared: number): number;
  CalculateSowingRateSafeSeedsPerMeterSquared(): number;
  CalculateSowingRatePlantsDa(): number;
  CalculateUsedSeedsKgPerDa(): number;
  CalculateInternalRowHeightCm(): number;
  CalculateEndResults(): void;
  FillWithData(data:SowingRateFetchedInterface): void
}
