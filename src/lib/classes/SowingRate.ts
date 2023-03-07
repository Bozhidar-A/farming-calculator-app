import type SowingRateFetchedInterface from "../interfaces/SowingRateFetchedInterface";
import type SowingRateInterface from "../interfaces/SowingRateInterface";

export class SowingRate implements SowingRateInterface {
  // input data
  culture: string;
  coefficientSecurity: number;
  wantedPlantsPerMeterSquared: number;
  massPer1000g: number;
  purity: number;
  germination: number;
  rowSpacingCm: number;

  // output data
  sowingRateSafeSeedsPerMeterSquared: number = 0;
  sowingRatePlantsPerDecare: number = 0;
  usedSeedsKgPerDecare: number = 0;
  internalRowHeightCm: number = 0;

  // constructors
  constructor(
    culture: string,
    coefficientSecurity: number,
    wantedPlantsPerMeterSquared: number,
    massPer1000g: number,
    purity: number,
    germination: number,
    rowSpacing: number
  ) {
    this.culture = culture;
    this.coefficientSecurity = coefficientSecurity;
    this.wantedPlantsPerMeterSquared = wantedPlantsPerMeterSquared;
    this.massPer1000g = massPer1000g;
    this.purity = purity;
    this.germination = germination;
    this.rowSpacingCm = rowSpacing;
  }

  // empty constructor
  // i love js
  static EmptyConstructor() {
    return new SowingRate("", 0, 0, 0, 0, 0, 0);
  }

  // getters and setters
  get GetCulture() {
    return this.culture;
  }

  set SetCulture(culture: string) {
    this.culture = culture;
  }

  get GetCoefficientSecurity() {
    return this.coefficientSecurity;
  }

  set SetCoefficientSecurity(coefficientSecurity: number) {
    this.coefficientSecurity = coefficientSecurity;
  }

  get GetWantedPlantsPerMeterSquared() {
    return this.wantedPlantsPerMeterSquared;
  }

  set SetWantedPlantsPerMeterSquared(wantedPlantsPerMeterSquared: number) {
    this.wantedPlantsPerMeterSquared = wantedPlantsPerMeterSquared;
  }

  get GetMassPer1000g() {
    return this.massPer1000g;
  }

  set SetMassPer1000g(massPer1000g: number) {
    this.massPer1000g = massPer1000g;
  }

  get GetPurity() {
    return this.purity;
  }

  set SetPurity(purity: number) {
    this.purity = purity;
  }

  get GetGermination() {
    return this.germination;
  }

  set SetGermination(germination: number) {
    this.germination = germination;
  }

  get GetRowSpacing() {
    return this.rowSpacingCm;
  }

  set SetRowSpacing(rowSpacing: number) {
    this.rowSpacingCm = rowSpacing;
  }

  //outputs
  get GetSowingRateSafeSeedsPerMeterSquared() {
    return this.sowingRateSafeSeedsPerMeterSquared;
  }

  set SetSowingRateSafeSeedsPerMeterSquared(
    sowingRateSafeSeedsPerMeterSquared: number
  ) {
    this.sowingRateSafeSeedsPerMeterSquared =
      sowingRateSafeSeedsPerMeterSquared;
  }

  get GetSowingRatePlantsDa() {
    return this.sowingRatePlantsPerDecare;
  }

  set SetSowingRatePlantsDa(sowingRatePlantsDa: number) {
    this.sowingRatePlantsPerDecare = sowingRatePlantsDa;
  }

  get GetUsedSeedsKgPerDa() {
    return this.usedSeedsKgPerDecare;
  }

  set SetUsedSeedsKgPerDa(usedSeedsKgPerDa: number) {
    this.usedSeedsKgPerDecare = usedSeedsKgPerDa;
  }

  get GetInternalRowHeightCm() {
    return this.internalRowHeightCm;
  }

  set SetInternalRowHeightCm(internalRowHeightCm: number) {
    this.internalRowHeightCm = internalRowHeightCm;
  }

  // funcs
  FillWithData(data:SowingRateFetchedInterface): void{
    //this is VERY bad and there is a way to make this more sane, but this works
    Object.keys(data).forEach((key) => {
      if(key === "culture"){
        this.culture = data.culture.id;
      }

      if(data[key].type === "buttons"){
        this[key] = data[key].values[0];
      }

      if(data[key].type === "slider"){
        this[key] = data[key].minSliderVal;
      }

      if(data[key].type === "const"){
        this[key] = data[key].val;
      }
    });
  }

  CalculateSowingRateSafeSeedsPerMeterSquared(): number {
    return (
      (this.wantedPlantsPerMeterSquared * 100) /
      (this.germination * this.coefficientSecurity)
    );
  }

  CalculateSowingRatePlantsDa(): number {
    return this.CalculateSowingRateSafeSeedsPerMeterSquared() * 1000;
  }

  CalculateUsedSeedsKgPerDa(): number {
    return (
      (this.CalculateSowingRateSafeSeedsPerMeterSquared() *
        this.massPer1000g *
        10) /
      (this.purity * this.germination)
    );
  }

  CalculateInternalRowHeightCm(): number {
    return (
      10000 /
      this.rowSpacingCm /
      this.CalculateSowingRateSafeSeedsPerMeterSquared()
    );
  }

  CalculateEndResults(): void {
    this.sowingRateSafeSeedsPerMeterSquared =
      this.CalculateSowingRateSafeSeedsPerMeterSquared();
    this.sowingRatePlantsPerDecare = this.CalculateSowingRatePlantsDa();
    this.usedSeedsKgPerDecare = this.CalculateUsedSeedsKgPerDa();
    this.internalRowHeightCm = this.CalculateInternalRowHeightCm();
  }
}
