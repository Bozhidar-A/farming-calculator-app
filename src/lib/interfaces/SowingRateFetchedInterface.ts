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
  minSliderVal: number;
  maxSliderVal: number;
}

export interface FetchedConstInterface {
  type: string;
  val: number;
}

export default interface SowingRateFetchedInterface {
  culture: CultureInterface;
  coefficientSecurity: FetchedButtonsInterface;
  wantedPlantsPerMeterSquard: FetchedSliderInterface;
  massPer1000g: FetchedSliderInterface;
  purity: FetchedConstInterface;
  germination: FetchedSliderInterface;
  rowSpacingCm: FetchedSliderInterface | FetchedConstInterface;
}
