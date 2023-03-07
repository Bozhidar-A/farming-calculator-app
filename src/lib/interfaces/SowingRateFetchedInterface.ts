export interface CultureInterface {
  id: string;
  latin: string;
}

export interface FetchedButtonsInterface {
  type: string;
  values: number[];
}

export interface FetchedSliderInterface {
  type: string;
  step: number;
  unit: string;
  minSliderVal: number;
  maxSliderVal: number;
}

export interface FetchedConstInterface {
  type: string;
  unit: string;
  val: number;
}

export default interface SowingRateFetchedInterface {
  culture: CultureInterface;
  coefficientSecurity: FetchedButtonsInterface;
  wantedPlantsPerMeterSquared: FetchedSliderInterface | FetchedConstInterface;
  massPer1000g: FetchedSliderInterface | FetchedConstInterface;
  purity: FetchedConstInterface;
  germination: FetchedSliderInterface;
  rowSpacingCm: FetchedSliderInterface | FetchedConstInterface;
}
