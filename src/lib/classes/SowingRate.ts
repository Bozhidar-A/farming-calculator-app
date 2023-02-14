// VERY BAD
// this appears to be a bug in svelte as attempting to use
// culture: string; leads to an Unexpected token error
// without it ts throws Property does not exist on type
// @ts-nocheck

export class SowingRate implements SowingRateInterface {
  culture: string;
  coefficientSecurity: number;
  wantedPlantsPerMeterSquard: number;
  massPer1000g: number;
  purity: number;
  germination: number;
  rowSpacing: number;

  // constructors
  constructor(
    culture: string,
    coefficientSecurity: number,
    wantedPlantsPerMeterSquard: number,
    massPer1000g: number,
    purity: number,
    germination: number,
    rowSpacing: number
  ) {
    this.culture = culture;
    this.coefficientSecurity = coefficientSecurity;
    this.wantedPlantsPerMeterSquard = wantedPlantsPerMeterSquard;
    this.massPer1000g = massPer1000g;
    this.purity = purity;
    this.germination = germination;
    this.rowSpacing = rowSpacing;
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

  get GetWantedPlantsPerMeterSquard() {
    return this.wantedPlantsPerMeterSquard;
  }

  set SetWantedPlantsPerMeterSquard(wantedPlantsPerMeterSquard: number) {
    this.wantedPlantsPerMeterSquard = wantedPlantsPerMeterSquard;
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
    return this.rowSpacing;
  }

  set SetRowSpacing(rowSpacing: number) {
    this.rowSpacing = rowSpacing;
  }

  // funcs
}

export interface SowingRateInterface {
  culture: string;
  coefficientSecurity: number;
  wantedPlantsPerMeterSquard: number;
  massPer1000g: number;
  purity: number;
  germination: number;
  rowSpacing: number;

  // getters and setters
  GetCulture: string;
  SetCulture: string;
  GetCoefficientSecurity: number;
  SetCoefficientSecurity: number;
  GetWantedPlantsPerMeterSquard: number;
  SetWantedPlantsPerMeterSquard: number;
  GetMassPer1000g: number;
  SetMassPer1000g: number;
  GetPurity: number;
  SetPurity: number;
  GetGermination: number;
  SetGermination: number;
  GetRowSpacing: number;
  SetRowSpacing: number;
}

// working data ^

// fetched data
export interface Value {
  color: string;
  valNum: number;
}

export interface CoefficientSecurity {
  type: string;
  values: Value[];
}

export interface WantedPlantsPerMeterSquard {
  type: string;
  minSliderVal: number;
  maxSliderVal: number;
}

export interface MassPer1000g {
  type: string;
  minSliderVal: number;
  maxSliderVal: number;
}

export interface Purity {
  type: string;
  val: number;
}

export interface Germination {
  type: string;
  minSliderVal: number;
  maxSliderVal: number;
}

export interface RowSpacing {
  type: string;
  minSliderVal: number;
  maxSliderVal: number;
}

export interface SowingRateFetchedInterface {
  culture: string;
  coefficientSecurity: CoefficientSecurity;
  wantedPlantsPerMeterSquard: WantedPlantsPerMeterSquard;
  massPer1000g: MassPer1000g;
  purity: Purity;
  germination: Germination;
  rowSpacing: RowSpacing;
}
